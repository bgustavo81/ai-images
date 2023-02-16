import pool from "../config/pool.js";


export class Post {
    constructor ( id, name, prompt, photo ) {
        this.id = id;
        this.name = name;
        this.prompt = prompt;
        this.photo = photo;
    };

    static getPosts () {
        return pool.query(
            'SELECT * FROM ai_posts ORDER BY id DESC'
        );
    };

    static getPost () {
        return pool.query(
            'SELECT * FROM ai_posts ORDER BY id DESC LIMIT 1'
        );
    };

    static getPostById(id) {
        return pool.query(
            'SELECT * FROM ai_posts WHERE id = $1',
            [id]
        );
    };

    createPost() {
        return pool.query(
            'INSERT INTO ai_posts (name, prompt, photo) VALUES ($1, $2, $3)',
            [this.name, this.prompt, this.photo]
        );
    };

    static updatePost(name, prompt) {
        return pool.query(
            'UPDATE ai_posts SET name = $1, prompt = $2 WHERE id = $3',
            [title, content, id]
        );
    };

    static deletePost() {
        return pool.query(
            'DELETE FROM ai_posts WHERE id = $1',
            [id]
        );
    };
};