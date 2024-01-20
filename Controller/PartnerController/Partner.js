const Addpartner=async(req,res)=>{
    try {
        const {
          user_id,
          username,
          contact_number,
          address,
          email,
          country_id,
          state_id,
          city_id,
          is_business,
          business_name,
          team_size,
          facebook_link,
          instagram_link,
          linkedin_link,
          website_link,
          reach_in_kms,
          work_location_id,
        } = req.body;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Insert the partner into the database
        const [result] = await connection.execute(
          'INSERT INTO Partners (user_id, username, contact_number, address, email, country_id, state_id, city_id, is_business, business_name, team_size, facebook_link, instagram_link, linkedin_link, website_link, reach_in_kms, work_location_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            user_id,
            username,
            contact_number,
            address,
            email,
            country_id,
            state_id,
            city_id,
            is_business,
            business_name,
            team_size,
            facebook_link,
            instagram_link,
            linkedin_link,
            website_link,
            reach_in_kms,
            work_location_id,
          ]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner added successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const deletepartner=async(req,res)=>{
    try {
        const userId = req.params.user_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Delete the partner from the database
        await connection.execute('DELETE FROM Partners WHERE user_id = ?', [userId]);
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updatepartner=async(req,res)=>{
    try {
        const userId = req.params.user_id;
    
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Update the partner in the database
        await connection.execute(
          'UPDATE Partners SET username = ?, contact_number = ?, address = ?, email = ?, country_id = ?, state_id = ?, city_id = ?, is_business = ?, business_name = ?, team_size = ?, facebook_link = ?, instagram_link = ?, linkedin_link = ?, website_link = ?, reach_in_kms = ?, work_location_id = ? WHERE user_id = ?',
          [
            req.body.username,
            req.body.contact_number,
            req.body.address,
            req.body.email,
            req.body.country_id,
            req.body.state_id,
            req.body.city_id,
            req.body.is_business,
            req.body.business_name,
            req.body.team_size,
            req.body.facebook_link,
            req.body.instagram_link,
            req.body.linkedin_link,
            req.body.website_link,
            req.body.reach_in_kms,
            req.body.work_location_id,
            userId,
          ]
        );
    
        // Close the database connection
        connection.end();
    
        res.json({ message: 'Partner updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const Getpartner=async(req,res)=>{
    
}


module.exports={Addpartner,deletepartner,updatepartner,Getpartner}