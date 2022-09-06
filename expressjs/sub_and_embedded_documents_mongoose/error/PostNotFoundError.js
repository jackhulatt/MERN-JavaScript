class PostNotFoundError extends Error {

    constructor(id) {
        super(`Post with id ${id} not found`);
        this.name = "PostNotFoundError";
    }
}

module.exports = PostNotFoundError;