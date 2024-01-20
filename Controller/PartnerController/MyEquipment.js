const addEquipment = async (req, res) => {
  try {
      const { user_id, equipment_name, equipment_description, media_url } = req.body;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          // Insert equipment information
          const [mediaResult] = await connection.execute(
              "INSERT INTO PartnerMedia (user_id, media_type, media_url) VALUES (?, ?, ?)",
              [user_id, "Image", media_url]
          );

          const mediaId = mediaResult.insertId;

          await connection.execute(
              "INSERT INTO MyEquipments (user_id, equipment_name, equipment_description, media_id) VALUES (?, ?, ?, ?)",
              [user_id, equipment_name, equipment_description, mediaId]
          );

          await connection.commit();

          res.json({ message: "Equipment added successfully" });
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




const deleteEquipment = async (req, res) => {
  try {
      const equipmentId = req.params.equipment_id;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          // Use a single DELETE query with LEFT JOIN to delete MyEquipments and associated PartnerMedia
          await connection.execute(
              "DELETE MyEquipments, PartnerMedia FROM MyEquipments LEFT JOIN PartnerMedia ON MyEquipments.media_id = PartnerMedia.media_id WHERE MyEquipments.equipment_id = ?",
              [equipmentId]
          );

          await connection.commit();

          res.json({ message: "Equipment deleted successfully" });
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





const updateEquipment = async (req, res) => {
  try {
      const equipmentId = req.params.equipment_id;
      const { equipment_name, equipment_description, media_url } = req.body;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          if (media_url) {
              await connection.execute(
                  "UPDATE PartnerMedia SET media_url = ? WHERE media_id IN (SELECT media_id FROM MyEquipments WHERE equipment_id = ?)",
                  [media_url, equipmentId]
              );
          }

          await connection.execute(
              "UPDATE MyEquipments SET equipment_name = ?, equipment_description = ? WHERE equipment_id = ?",
              [equipment_name, equipment_description, equipmentId]
          );

          await connection.commit();

          res.json({ message: "Equipment updated successfully" });
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



const getAllEquipmentsWithMedia = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [results] = await connection.execute(
      `SELECT
          me.equipment_id,
          me.user_id,
          me.equipment_name,
          me.equipment_description,
          pm.media_id,
          pm.media_type,
          pm.media_url
      FROM
          MyEquipments me
      JOIN
          PartnerMedia pm ON me.media_id = pm.media_id
      WHERE
          me.user_id = ?;`,
      [userId]
    );

    // Close the database connection
    connection.end();

    res.json({ equipments: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={AddEquipment,DeleteEquipment,updateEquipment,getAllEquipment}