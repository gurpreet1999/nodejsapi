const addFlyingSpotRating=async(req,res)=>{
    try {
        const { spot_id, user_id, rating_value } = req.body;
    
     
        const connection = await mysql.createConnection(dbConfig);
    
       
        const [result] = await connection.execute(
          'INSERT INTO FlyingSpotRatings (spot_id, user_id, rating_value) VALUES (?, ?, ?)',
          [spot_id, user_id, rating_value]
        );
    
       
        connection.end();
    
       
        const rating_id = result.insertId;
    
        res.json({ rating_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteFlyingSpotRating=async(req,res)=>{
    try {
        const ratingId = req.params.rating_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the flying spot rating from the database
        await connection.execute('DELETE FROM FlyingSpotRatings WHERE rating_id = ?', [ratingId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot rating deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateFlyingSpotRating=async(req,res)=>{
    try {
        const ratingId = req.params.rating_id;
        const { spot_id, user_id, rating_value } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the flying spot rating in the database
        await connection.execute(
          'UPDATE FlyingSpotRatings SET spot_id = ?, user_id = ?, rating_value = ? WHERE rating_id = ?',
          [spot_id, user_id, rating_value, ratingId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot rating updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 
}

const getAllFlyingSpotRating=async(req,res)=>{
    
}


module.exports={addFlyingSpotRating,deleteFlyingSpotRating,updateFlyingSpotRating,getAllFlyingSpotRating}
