const addService = async (req, res) => {
  try {
      const { user_id, service_name, service_description, service_price, media_url } = req.body;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          // Insert service information
          const [mediaResult] = await connection.execute(
              "INSERT INTO PartnerMedia (user_id, media_type, media_url) VALUES (?, ?, ?)",
              [user_id, "Image", media_url]
          );

          const mediaId = mediaResult.insertId;

          await connection.execute(
              "INSERT INTO MyServices (user_id, service_name, service_description, service_price, media_id) VALUES (?, ?, ?, ?, ?)",
              [user_id, service_name, service_description, service_price, mediaId]
          );

          await connection.commit();

          res.json({ message: "Service added successfully" });
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

// Define the route for addService API


const deleteService = async (req, res) => {
  try {
      const serviceId = req.params.service_id;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          // Use a single DELETE query with LEFT JOIN to delete MyServices and associated PartnerMedia
          await connection.execute(
              "DELETE MyServices, PartnerMedia FROM MyServices LEFT JOIN PartnerMedia ON MyServices.media_id = PartnerMedia.media_id WHERE MyServices.service_id = ?",
              [serviceId]
          );

          await connection.commit();

          res.json({ message: "Service deleted successfully" });
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

// Define the route for deleteService API
app.delete('/api/deleteService/:service_id', deleteService);

const updateService = async (req, res) => {
  try {
      const serviceId = req.params.service_id;
      const { service_name, service_description, service_price, media_url } = req.body;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          if (media_url) {
              await connection.execute(
                  "UPDATE PartnerMedia SET media_url = ? WHERE media_id IN (SELECT media_id FROM MyServices WHERE service_id = ?)",
                  [media_url, serviceId]
              );
          }

          await connection.execute(
              "UPDATE MyServices SET service_name = ?, service_description = ?, service_price = ? WHERE service_id = ?",
              [service_name, service_description, service_price, serviceId]
          );

          await connection.commit();

          res.json({ message: "Service updated successfully" });
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

// Define the route for updateService API
app.put('/api/updateService/:service_id', updateService);

const getAllServicesWithMedia = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [results] = await connection.execute(
      `SELECT
          ms.service_id,
          ms.user_id,
          ms.service_name,
          ms.service_description,
          ms.service_price,
          pm.media_id,
          pm.media_type,
          pm.media_url
      FROM
          MyServices ms
      JOIN
          PartnerMedia pm ON ms.media_id = pm.media_id
      WHERE
          ms.user_id = ?;`,
      [userId]
    );

    // Close the database connection
    connection.end();

    res.json({ services: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports={addMyService,deleteMyService,updateMyService,getAllMyService}