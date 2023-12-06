const addDrone=async(req,res)=>{
    try {
        const { user_id, drone_name, drone_model, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the drone into the database
        const [result] = await connection.execute(
          'INSERT INTO MyDrones (user_id, drone_name, drone_model, media_id) VALUES (?, ?, ?, ?)',
          [user_id, drone_name, drone_model, media_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const drone_id = result.insertId;
    
        res.json({ drone_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteDrone=async(req,res)=>{
    try {
        const droneId = req.params.drone_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the drone from the database
        await connection.execute('DELETE FROM MyDrones WHERE drone_id = ?', [droneId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Drone deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateDrone=async(req,res)=>{
    try {
        const droneId = req.params.drone_id;
        const { user_id, drone_name, drone_model, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the drone in the database
        await connection.execute(
          'UPDATE MyDrones SET user_id = ?, drone_name = ?, drone_model = ?, media_id = ? WHERE drone_id = ?',
          [user_id, drone_name, drone_model, media_id, droneId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Drone updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getAllDrone=async(req,res)=>{

}