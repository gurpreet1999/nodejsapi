const addFlyingSpotComment=async(req,res)=>{
    try {
        const { spot_id, user_id, comment_text } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the flying spot comment into the database
        const [result] = await connection.execute(
          'INSERT INTO FlyingSpotComments (spot_id, user_id, comment_text) VALUES (?, ?, ?)',
          [spot_id, user_id, comment_text]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const comment_id = result.insertId;
    
        res.json({ comment_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteFlyingSpotComment=async(req,res)=>{
    try {
        const commentId = req.params.comment_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the flying spot comment from the database
        await connection.execute('DELETE FROM FlyingSpotComments WHERE comment_id = ?', [commentId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot comment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateFlyingSpotComment=async(req,res)=>{

}

const getAllFlyingSpotComment=async(req,res)=>{

}








