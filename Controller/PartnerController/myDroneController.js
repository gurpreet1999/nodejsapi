const addDrone = async (req, res) => {
  try {
      const { user_id, drone_name, drone_model, droneMediaUrl } = req.body;

      // Create a single connection
      const connection = await mysql.createConnection(dbConfig);

      try {
          // Insert drone information if provided
          const [droneMediaResult] = await connection.execute(
              "INSERT INTO PartnerMedia (user_id, media_type, media_url) VALUES (?, ?, ?)",
              [user_id, "Image", droneMediaUrl]
          );

          const droneMediaId = droneMediaResult.insertId;

          // Insert drone information
          const [result] = await connection.execute(
              "INSERT INTO MyDrones (user_id, drone_name, drone_model, media_id) VALUES (?, ?, ?, ?)",
              [user_id, drone_name, drone_model, droneMediaId]
          );

          const drone_id = result.insertId;

          res.json({ drone_id });
      } catch (error) {
          console.error("Error executing queries:", error);
          res.status(500).json({ error: "Internal Server Error" });
      } finally {
          // Close the connection when done
          await connection.end();
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDrone = async (req, res) => {
  try {
      const droneId = req.params.drone_id;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          // Use a single DELETE query with LEFT JOIN to delete MyDrones and associated PartnerMedia
          await connection.execute(
              "DELETE MyDrones, PartnerMedia FROM MyDrones LEFT JOIN PartnerMedia ON MyDrones.media_id = PartnerMedia.media_id WHERE MyDrones.drone_id = ?",
              [droneId]
          );

          // Commit the transaction
          await connection.commit();

          res.json({ message: "Drone deleted successfully" });
      } catch (error) {
          await connection.rollback();
          throw error;
      } finally {
          // Close the database connection
          connection.end();
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};

// Define the route for deleteDrone API



const updateDrone = async (req, res) => {
  try {
      const droneId = req.params.drone_id;
      const { drone_name, drone_model, drone_media_url } = req.body;

      const connection = await mysql.createConnection(dbConfig);

      try {
          await connection.beginTransaction();

          if (drone_media_url) {
              await connection.execute(
                  "UPDATE PartnerMedia SET media_url = ? WHERE media_id IN (SELECT media_id FROM MyDrones WHERE drone_id = ?)",
                  [drone_media_url, droneId]
              );
          }

          await connection.execute(
              "UPDATE MyDrones SET drone_name = ?, drone_model = ? WHERE drone_id = ?",
              [drone_name, drone_model, droneId]
          );

          await connection.commit();

          res.json({ message: "Drone updated successfully" });
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

// Define the route for updateDrone API



const getAllDronesWithMedia = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [results] = await connection.execute(
      `SELECT
          md.drone_id,
          md.user_id,
          md.drone_name,
          md.drone_model,
          pm.media_id,
          pm.media_type,
          pm.media_url
      FROM
          MyDrones md
      JOIN
          PartnerMedia pm ON md.media_id = pm.media_id
      WHERE
          md.user_id = ?;`,
      [userId]
    );

    // Close the database connection
    connection.end();

    res.json({ drones: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
