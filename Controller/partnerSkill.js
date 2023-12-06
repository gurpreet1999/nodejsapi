const addPartnerSkill=async(req,res)=>{
    try {
        const { user_id, skill_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the partner skill into the database
        const [result] = await connection.execute(
          'INSERT INTO PartnerSkills (user_id, skill_id) VALUES (?, ?)',
          [user_id, skill_id]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner skill added successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deletePartnerSkill=async(req,res)=>{
    try {
        const { user_id, skill_id } = req.params;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the partner skill from the database
        await connection.execute('DELETE FROM PartnerSkills WHERE user_id = ? AND skill_id = ?', [user_id, skill_id]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner skill deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


const updatePartnerSkill=async(req,res)=>{
    try {
        const { user_id, skill_id } = req.params;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the partner skill in the database
        await connection.execute('UPDATE PartnerSkills SET skill_id = ? WHERE user_id = ? AND skill_id = ?', [
          req.body.skill_id,
          user_id,
          skill_id,
        ]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner skill updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const getPartnerSkill=async(req,res)=>{

}


module.exports={addPartnerSkill,deletePartnerSkill,updatePartnerSkill}