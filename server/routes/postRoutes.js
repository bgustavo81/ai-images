import express from 'express';
const router = express.Router();
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import {Post} from "../models/post.js";

dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
    endpoint: 's3-us-east-2.amazonaws.com',
    signatureVersion: 'v4',
    region: 'us-east-2'
})

router.route('/image').get(async (req, res, next) => {
    const key = `ai-images/${uuidv4()}.jpeg`;

    s3.getSignedUrl('putObject', {
        Bucket: 'my-foto-bucket-123',
        ContentType: 'image/jpeg',
        // ContentEncoding: 'base64',
        Key: key,
    }, (err, url) => res.send({ key, url }));
    console.log("past the put aws");
});


// post image to database
router.route('/').post( async (req, res) => {
    const name = req.body.name;
    const prompt = req.body.prompt;
    const image = req.body.photo; 


    try {
      //Destructuring
      let post = new Post(null, name, prompt, image);
    await post.createPost();
    post = await Post.getPost();
    res.status(201).json({ success: true, data: post.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error in posts.js");
    }
  }
);

// get all images
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.getPosts();
    res.status(200).json({ success: true, data: posts.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

export default router;
