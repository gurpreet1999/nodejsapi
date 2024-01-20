const addFylingSpotfollow=async(req,res)=>{
    try {
        const { spot_id, user_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the flying spot follow into the database
        const [result] = await connection.execute(
          'INSERT INTO FlyingSpotFollows (spot_id, user_id) VALUES (?, ?)',
          [spot_id, user_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const follow_id = result.insertId;
    
        res.json({ follow_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteFylingSpotfollow=async(req,res)=>{
    try {
        const followId = req.params.follow_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the flying spot follow from the database
        await connection.execute('DELETE FROM FlyingSpotFollows WHERE follow_id = ?', [followId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot follow deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}





const getFylingSpotfollow=async(req,res)=>{
    
}

module.exports={addFylingSpotfollow,deleteFylingSpotfollow,updateFylingSpotfollow}