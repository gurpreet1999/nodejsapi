const addFlyingSpotLike=async(req,res)=>{
    try {
        const { spot_id, user_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the flying spot like into the database
        const [result] = await connection.execute(
          'INSERT INTO FlyingSpotLikes (spot_id, user_id) VALUES (?, ?)',
          [spot_id, user_id]
        );
        const createTriggerQuery = `
        CREATE TRIGGER update_counters_after_like
        AFTER INSERT ON Likes
        FOR EACH ROW
        BEGIN
            UPDATE FlyingSpots
            SET total_likes = total_likes + 1
            WHERE spot_id = NEW.spot_id;
        END;
        `;
        await connection.query(createTriggerQuery);
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const like_id = result.insertId;
    
        res.json({ like_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteFlyingSpotLike=async(req,res)=>{
    try {
        const likeId = req.params.like_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the flying spot like from the database
        await connection.execute('DELETE FROM FlyingSpotLikes WHERE like_id = ?', [likeId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot like deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


module.exports={addFlyingSpotLike,deleteFlyingSpotLike}