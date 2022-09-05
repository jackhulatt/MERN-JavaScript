const router = new require('express').Router();
const mongoose = require('mongoose');
const Post = require('../model/Post');
const PostNotFoundError = require('../error/PostNotFoundError');
const { isAuthenticated } = require('../util/AuthenticationUtils');

// read all
router.get('/', async (request, response, next) => {
    const posts = await Post.find({})
        .populate(['user']); // populates the user field with data from the db
        response.status(200).json(posts);
});

// read by id
router.get('/:id', async (request, response, next) => {
    const id = request.params.id;
    const post = await Post.findById(id).populate(['user']);
    if (post) {
        response.status(200).json(post);
        return; // stops the function from trying to execute the next res.status(404)
    }
    // pass the error to next() to call the next error handler
    // - in Express 5, we can just throw the error (Express5 is still in beta, we are using Express4 here)
    next(new PostNotFoundError(id));
});

// create post
router.post('/', isAuthenticated, async (request, response, next) => {
    const post = new Post(request.body);

    try {
        await post.save();
        response.status(200).json(post);
    } catch (error) {
        next(error);
    }
});

// update post
router.put('/:id', isAuthenticated, isCurrentUsersPost, async (request, response, next) => {
    const id = request.params.id;
    const updates = request.body;

    const post = await Post.updateOne({ _id: id }, updates);

    if (post) {
        response.status(200).json(post);
        return;
    }
    next(new PostNotFoundError(id));
});

// delete post
router.delete('/:id', isAuthenticated, isCurrentUsersPost, async (request, response, next) => {
    const filter = { _id: request.params.id };

    const post = await Post.findOneAndDelete(filter);
    if (post) {
        return response.status(200).json(post);
    }
    next(new PostNotFoundError(id));
});

async function isCurrentUsersPost(request, response, next) {
    const userId = request.user._id;
    const postId = request.params.id;
    const post = await Post.findById(postId);

    if (!post || !post.user.equals(userId)) {
        return response.status(400).send("Not the posts owner.");
    }
    next();
}

module.exports = router;