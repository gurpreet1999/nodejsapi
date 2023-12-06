const addFlyingSpot=async(req,res)=>{
    try {
        const { user_id, spot_name, spot_latitude, spot_longitude, spot_description } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the flying spot into the database
        const [result] = await connection.execute(
          'INSERT INTO FlyingSpots (user_id, spot_name, spot_latitude, spot_longitude, spot_description) VALUES (?, ?, ?, ?, ?)',
          [user_id, spot_name, spot_latitude, spot_longitude, spot_description]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const spot_id = result.insertId;
    
        res.json({ spot_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const deleteFlyingSpota=async(req,res)=>{
    try {
        const spotId = req.params.spot_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the flying spot from the database
        await connection.execute('DELETE FROM FlyingSpots WHERE spot_id = ?', [spotId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 
}

const updateFlyingSpot=async(req,res)=>{
    try {
        const spotId = req.params.spot_id;
        const { user_id, spot_name, spot_latitude, spot_longitude, spot_description } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the flying spot in the database
        await connection.execute(
          'UPDATE FlyingSpots SET user_id = ?, spot_name = ?, spot_latitude = ?, spot_longitude = ?, spot_description = ? WHERE spot_id = ?',
          [user_id, spot_name, spot_latitude, spot_longitude, spot_description, spotId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const getAllFlyingSpot=async(req,res)=>{
    
}