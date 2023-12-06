const AddEquipment=async(req,res)=>{
    try {
        const { user_id, equipment_name, equipment_description, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the equipment into the database
        const [result] = await connection.execute(
          'INSERT INTO MyEquipments (user_id, equipment_name, equipment_description, media_id) VALUES (?, ?, ?, ?)',
          [user_id, equipment_name, equipment_description, media_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const equipment_id = result.insertId;
    
        res.json({ equipment_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const DeleteEquipment=async(req,res)=>{
    try {
        const equipmentId = req.params.equipment_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the equipment from the database
        await connection.execute('DELETE FROM MyEquipments WHERE equipment_id = ?', [equipmentId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Equipment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateEquipment=async(req,res)=>{
    try {
        const equipmentId = req.params.equipment_id;
        const { user_id, equipment_name, equipment_description, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the equipment in the database
        await connection.execute(
          'UPDATE MyEquipments SET user_id = ?, equipment_name = ?, equipment_description = ?, media_id = ? WHERE equipment_id = ?',
          [user_id, equipment_name, equipment_description, media_id, equipmentId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Equipment updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getAllEquipment=async(req,res)=>{

}

module.exports={AddEquipment,DeleteEquipment,updateEquipment,getAllEquipment}