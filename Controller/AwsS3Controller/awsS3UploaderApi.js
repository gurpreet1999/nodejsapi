const uploadPreSignedUrl=async(req,res)=>{
    try {
        const { filename, contenttype } = req.body;
    
        const putObjectCommand = new PutObjectCommand({
          Bucket: "gurpreet-private",
          Key: `/uploads/${filename}`,
          ContentType: contenttype,
        });
    
        const url = await getSignedUrl(s3Client, putObjectCommand);
        res.json({ uploadUrl: url });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


const viewObjectPresignedUrl=async(req,res)=>{

    try {
        const { filename } = req.params;
    
        const getObjectCommand = new GetObjectCommand({
          Bucket: "gurpreet-private",
          Key: `/uploads/${filename}`,
        });
    
        const url = await getSignedUrl(s3Client, getObjectCommand);
        res.json({ downloadUrl: url });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}