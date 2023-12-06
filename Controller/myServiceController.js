const addMyService=async(req,res)=>{
    try {
        const { user_id, service_name, service_description, service_price, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the service into the database
        const [result] = await connection.execute(
          'INSERT INTO MyServices (user_id, service_name, service_description, service_price, media_id) VALUES (?, ?, ?, ?, ?)',
          [user_id, service_name, service_description, service_price, media_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const service_id = result.insertId;
    
        res.json({ service_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const deleteMyService=async(req,res)=>{
    try {
        const serviceId = req.params.service_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the service from the database
        await connection.execute('DELETE FROM MyServices WHERE service_id = ?', [serviceId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Service deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const updateMyService=async(req,res)=>{
    try {
        const serviceId = req.params.service_id;
        const { user_id, service_name, service_description, service_price, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the service in the database
        await connection.execute(
          'UPDATE MyServices SET user_id = ?, service_name = ?, service_description = ?, service_price = ?, media_id = ? WHERE service_id = ?',
          [user_id, service_name, service_description, service_price, media_id, serviceId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Service updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 
}
const getAllMyService=async(req,res)=>{
    
}

module.exports={addMyService,deleteMyService,updateMyService,getAllMyService}