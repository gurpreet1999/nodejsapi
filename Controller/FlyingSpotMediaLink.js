const addFlyingSpotMediaLink=async(req,res)=>{
    try {
        const { spot_id, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the flying spot media link into the database
        const [result] = await connection.execute(
          'INSERT INTO FlyingSpotMediaLink (spot_id, media_id) VALUES (?, ?)',
          [spot_id, media_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const link_id = result.insertId;
    
        res.json({ link_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteFlyingSpotMediaLink=async(req,res)=>{
    try {
        const linkId = req.params.link_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the flying spot media link from the database
        await connection.execute('DELETE FROM FlyingSpotMediaLink WHERE link_id = ?', [linkId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot media link deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateFlyingSpotMediaLink=async(req,res)=>{
    try {
        const linkId = req.params.link_id;
        const { spot_id, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the flying spot media link in the database
        await connection.execute(
          'UPDATE FlyingSpotMediaLink SET spot_id = ?, media_id = ? WHERE link_id = ?',
          [spot_id, media_id, linkId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Flying spot media link updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getFlyingSpotMediaLink=async(req,res)=>{

}

module.exports={addFlyingSpotMediaLink,deleteFlyingSpotMediaLink,updateFlyingSpotMediaLink,getFlyingSpotMediaLink}