const addMyShowReel=async(req,res)=>{
    try {
        const { user_id, showreel_description, showreel_price, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the showreel into the database
        const [result] = await connection.execute(
          'INSERT INTO MyShowreel (user_id, showreel_description, showreel_price, media_id) VALUES (?, ?, ?, ?)',
          [user_id, showreel_description, showreel_price, media_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const showreel_id = result.insertId;
    
        res.json({ showreel_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const deleteMyShowReel=async(req,res)=>{
    try {
        const userId = req.params.user_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the showreel from the database
        await connection.execute('DELETE FROM MyShowreel WHERE user_id = ?', [userId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Showreel deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateMyShowReel=async(req,res)=>{
    try {
        const userId = req.params.user_id;
        const { showreel_description, showreel_price, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the showreel in the database
        await connection.execute(
          'UPDATE MyShowreel SET showreel_description = ?, showreel_price = ?, media_id = ? WHERE user_id = ?',
          [showreel_description, showreel_price, media_id, userId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Showreel updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const getAllMyShowReel=async(req,res)=>{
    
}

module.exports={addMyShowReel,deleteMyShowReel,updateMyShowReel,getAllMyShowReel}