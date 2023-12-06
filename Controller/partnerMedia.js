const addPartnerMedia=async(req,res)=>{
    try {
        const { user_id, media_type, media_url } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert partner media into the database
        const [result] = await connection.execute(
          'INSERT INTO PartnerMedia (user_id, media_type, media_url) VALUES (?, ?, ?)',
          [user_id, media_type, media_url]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const media_id = result.insertId;
    
        res.json({ media_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deletePartnerMedia=async(req,res)=>{
    try {
        const mediaId = req.params.media_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete partner media from the database
        await connection.execute('DELETE FROM PartnerMedia WHERE media_id = ?', [mediaId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner media deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


const updatePartnerMedia=async(req,res)=>{
    try {
        const mediaId = req.params.media_id;
        const { user_id, media_type, media_url } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update partner media in the database
        await connection.execute(
          'UPDATE PartnerMedia SET user_id = ?, media_type = ?, media_url = ? WHERE media_id = ?',
          [user_id, media_type, media_url, mediaId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner media updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getPartnerMedia=async(req,res)=>{

}