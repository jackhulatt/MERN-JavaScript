class PostNotFoundError extends Error {

    constructor(id) {
        super(`Post with id ${id} not found`);
    }
}

module.exports = PostNotFoundError;