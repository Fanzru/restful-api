const express = require('express')
const router = express.Router();
const Post = require('../models/post');
// route berguna untuk menyimpan 1 bagian dari direktori yang di tuju
const err = 'Sorry data not valid'
// To get all post after submite ini route.post
router.get('/',async(req,res)=>{
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch (err){
        res.json({massage:err})
    }
});

// to submit in mongoDB
router.post('/',async(req,res)=>{
    // untuk menampilkan log body json
    // const {title,description}=req.body;
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    
    try {
        const savedPost = await post.save();
        res.json(savedPost)
    } catch (err){
        res.json({massage: err})
    }
    
});
// to find some data in database
router.post(('/:postId'),async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err){
        res.json({massage: err})
    }
})

// to delete data 
router.delete(('/:postId'),async(req,res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId})
        res.json(removePost)
    } catch(err){
        res.json({massage: err})
    }
})
// to update data 
router.patch('/:postId',async(req,res)=>{
    try{
        const postUpdate = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        )
        res.json(postUpdate) 
    }  catch(err){
        res.json({massage: err})
    }
})

module.exports = router;