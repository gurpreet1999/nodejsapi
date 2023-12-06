
const addCertificate=async(req,res)=>{
    try {
        const { user_id, certificate_name, certificateissuedby, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the certificate into the database
        const [result] = await connection.execute(
          'INSERT INTO MyCertificates (user_id, certificate_name, certificateissuedby, media_id) VALUES (?, ?, ?, ?)',
          [user_id, certificate_name, certificateissuedby, media_id]
        );
    
        // Close the database connection
        connection.end();
    
        // Extract the inserted ID from the result
        const certificate_id = result.insertId;
    
        res.json({ certificate_id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteCertificate=async(req,res)=>{

    try {
        const certificateId = req.params.certificate_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the certificate from the database
        await connection.execute('DELETE FROM MyCertificates WHERE certificate_id = ?', [certificateId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Certificate deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }

}


const updateCertificate=async(req,res)=>{

    try {
        const certificateId = req.params.certificate_id;
        const { user_id, certificate_name, certificateissuedby, media_id } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the certificate in the database
        await connection.execute(
          'UPDATE MyCertificates SET user_id = ?, certificate_name = ?, certificateissuedby = ?, media_id = ? WHERE certificate_id = ?',
          [user_id, certificate_name, certificateissuedby, media_id, certificateId]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Certificate updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }


}


const getAllCertificate=async(req,res)=>{
    try {
        const userId = req.params.user_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Retrieve all certificates for the specified user
        const [certificates] = await connection.execute('SELECT * FROM MyCertificates WHERE user_id = ?', [userId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ certificates });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}



module.exports={addCertificate,deleteCertificate,updateCertificate,getAllCertificate}