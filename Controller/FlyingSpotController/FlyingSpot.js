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
const deleteFlyingSpot = async (req, res) => {
  try {
    const spotId = req.params.spot_id;

   
    const connection = await mysql.createConnection(dbConfig);

  
    await connection.beginTransaction();

    try {
  
      await connection.execute('DELETE FROM FlyingSpotMedia WHERE spot_id = ?', [spotId]);

      
      await connection.execute('DELETE FROM FlyingSpotComments WHERE spot_id = ?', [spotId]);

   
      await connection.execute('DELETE FROM FlyingSpotLikes WHERE spot_id = ?', [spotId]);

    
      await connection.execute('DELETE FROM FlyingSpotRatings WHERE spot_id = ?', [spotId]);


      await connection.execute('DELETE FROM FlyingSpotFollows WHERE spot_id = ?', [spotId]);

     
      await connection.execute('DELETE FROM FlyingSpots WHERE spot_id = ?', [spotId]);


      await connection.commit();

      res.json({ message: 'Flying spot and related resources deleted successfully' });
    } catch (error) {
  
      await connection.rollback();
      throw error;
    } finally {
 
      connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


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




async function fetchParticularSpotData(spotId) {
  const connection = await mysql.createConnection({
    host: 'your-database-host',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database-name',
  });

  try {
    // Fetch likes for the spot
    const [likeRows] = await connection.query(`
      SELECT like_id, user_id AS like_user_id
      FROM FlyingSpotLikes
      WHERE spot_id = ?
    `, [spotId]);

    // Fetch comments for the spot
    const [commentRows] = await connection.query(`
      SELECT comment_id, user_id AS comment_user_id, comment_text
      FROM FlyingSpotComments
      WHERE spot_id = ?
    `, [spotId]);

    // Fetch ratings for the spot (assuming there is a FlyingSpotRatings table)
    const [ratingRows] = await connection.query(`
      SELECT rating_id, user_id AS rating_user_id, rating_value
      FROM FlyingSpotRatings
      WHERE spot_id = ?
    `, [spotId]);

    // Organize the data
    const spotData = {
      spot_id: spotId,
      likes: likeRows.map(row => ({
        like_id: row.like_id,
        like_user_id: row.like_user_id,
      })),
      comments: commentRows.map(row => ({
        comment_id: row.comment_id,
        comment_user_id: row.comment_user_id,
        comment_text: row.comment_text,
      })),
      ratings: ratingRows.map(row => ({
        rating_id: row.rating_id,
        rating_user_id: row.rating_user_id,
        rating_value: row.rating_value,
      })),
    };

    return spotData;
  } catch (error) {
    console.error('Error fetching spot data:', error.message);
  } finally {
    await connection.end();
  }
}
