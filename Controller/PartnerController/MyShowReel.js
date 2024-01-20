const addShowreel = async (req, res) => {
  try {
    const { user_id, showreel_description, showreel_price, media_url } =
      req.body;

    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.beginTransaction();

      // Insert showreel information
      const [mediaResult] = await connection.execute(
        "INSERT INTO PartnerMedia (user_id, media_type, media_url) VALUES (?, ?, ?)",
        [user_id, "Video", media_url]
      );

      const mediaId = mediaResult.insertId;

      await connection.execute(
        "INSERT INTO MyShowreel (user_id, showreel_description, showreel_price, media_id) VALUES (?, ?, ?, ?)",
        [user_id, showreel_description, showreel_price, mediaId]
      );

      await connection.commit();

      res.json({ message: "Showreel added successfully" });
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



const deleteShowreel = async (req, res) => {
  try {
    const userId = req.params.user_id;

    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.beginTransaction();

      // Use a single DELETE query with LEFT JOIN to delete MyShowreel and associated PartnerMedia
      await connection.execute(
        "DELETE MyShowreel, PartnerMedia FROM MyShowreel LEFT JOIN PartnerMedia ON MyShowreel.media_id = PartnerMedia.media_id WHERE MyShowreel.user_id = ?",
        [userId]
      );

      await connection.commit();

      res.json({ message: "Showreel deleted successfully" });
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




const updateShowreel = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { showreel_description, showreel_price, media_url } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.beginTransaction();

      if (media_url) {
        await connection.execute(
          "UPDATE PartnerMedia SET media_url = ? WHERE media_id IN (SELECT media_id FROM MyShowreel WHERE user_id = ?)",
          [media_url, userId]
        );
      }

      await connection.execute(
        "UPDATE MyShowreel SET showreel_description = ?, showreel_price = ? WHERE user_id = ?",
        [showreel_description, showreel_price, userId]
      );

      await connection.commit();

      res.json({ message: "Showreel updated successfully" });
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




const getAllShowreelsWithMedia = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [results] = await connection.execute(
      `SELECT
          ms.user_id,
          ms.showreel_description,
          ms.showreel_price,
          pm.media_id,
          pm.media_type,
          pm.media_url
      FROM
          MyShowreel ms
      JOIN
          PartnerMedia pm ON ms.media_id = pm.media_id
      WHERE
          ms.user_id = ?;`,
      [userId]
    );

    // Close the database connection
    connection.end();

    res.json({ showreels: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  addMyShowReel,
  deleteMyShowReel,
  updateMyShowReel,
  getAllMyShowReel,
};
