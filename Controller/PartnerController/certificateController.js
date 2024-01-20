const mysql = require("mysql2/promise");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "wscube",
};




const addCertificate = async (req, res) => {
  try {
    const { user_id, certificate_name, certificateissuedby, mediaUrl } =
      req.body;

    
    const connection = await mysql.createConnection(dbConfig);

    try {
      const [mediaResult] = await connection.execute(
        "INSERT INTO PartnerMedia (user_id, media_type, media_url) VALUES (?, ?, ?)",
        [user_id, "Image", mediaUrl]
      );

      

      const mediaId = mediaResult.insertId;

      const [result] = await connection.execute(
        "INSERT INTO MyCertificates (user_id, certificate_name, certificateissuedby, media_id) VALUES (?, ?, ?, ?)",
        [user_id, certificate_name, certificateissuedby, mediaId]
      );

      const certificate_id = result.insertId;

      res.json({ certificate_id });
    } catch (error) {
      console.error("Error executing queries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
     
      await connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificate_id;

    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.beginTransaction();

      
      await connection.execute(
        "DELETE MyCertificates, PartnerMedia FROM MyCertificates LEFT JOIN PartnerMedia ON MyCertificates.media_id = PartnerMedia.media_id WHERE MyCertificates.certificate_id = ?",
        [certificateId]
      );

     
      await connection.commit();

      res.json({ message: "Certificate deleted successfully" });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
    
      connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificate_id;
    const { certificate_name, certificateissuedby, media_url } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.beginTransaction();

      if (media_url) {
        await connection.execute(
          "UPDATE PartnerMedia SET media_url = ? WHERE media_id IN (SELECT media_id FROM MyCertificates WHERE certificate_id = ?)",
          [media_url, certificateId]
        );
      }

      await connection.execute(
        "UPDATE MyCertificates SET certificate_name = ?, certificateissuedby = ? WHERE certificate_id = ?",
        [certificate_name, certificateissuedby, certificateId]
      );

      await connection.commit();

      res.json({ message: "Certificate updated successfully" });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCertificatesWithMedia = async (req, res) => {
  try {
    const userId = req.params.user_id;

  
    const connection = await mysql.createConnection(dbConfig);

    
    const [results] = await connection.execute(
      `SELECT
          mc.certificate_id,
          mc.user_id,
          mc.certificate_name,
          mc.certificateissuedby,
          pm.media_id,
          pm.media_type,
          pm.media_url
      FROM
          MyCertificates mc
      JOIN
          PartnerMedia pm ON mc.media_id = pm.media_id
      WHERE
          mc.user_id = ?;`,
      [userId]
    );

  
    connection.end();

    res.json({ certificates: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addCertificate,
  deleteCertificate,
  updateCertificate,
  getAllCertificatesWithMedia
}
