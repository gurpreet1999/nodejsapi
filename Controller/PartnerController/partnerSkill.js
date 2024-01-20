const addPartnerSkill = async (req, res) => {
  try {
    const { user_id, skill_id } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    // Insert the partner skill into the database
    // const [result] = await connection.execute(
    //   'INSERT INTO PartnerSkills (user_id, skill_id) VALUES (?, ?)',
    //   [user_id, skill_id]
    // );
    for (const skill_id of skills) {
      await connection.execute(
        "INSERT INTO PartnerSkills (user_id, skill_id) VALUES (?, ?)",
        [user_id, skill_id]
      );
    }

    connection.end();

    res.json({ message: "Partner skill added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePartnerSkill = async (req, res) => {
  try {
    const { user_id, skill_id } = req.params;

    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      "DELETE FROM PartnerSkills WHERE user_id = ? AND skill_id = ?",
      [user_id, skill_id]
    );

    connection.end();

    res.json({ message: "Partner skill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllSkillsForUser = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [results] = await connection.execute(
      `SELECT
          ps.user_id,
          s.skill_id,
          s.skill_name
      FROM
          PartnerSkills ps
      JOIN
          Skills s ON ps.skill_id = s.skill_id
      WHERE
          ps.user_id = ?;`,
      [userId]
    );

    // Close the database connection
    connection.end();

    res.json({ skills: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addPartnerSkill, deletePartnerSkill, getAllSkillsForUser};
