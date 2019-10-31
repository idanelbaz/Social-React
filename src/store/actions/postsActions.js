import types from "../types";
import postsService from "../../services/postsService";

export const filterPosts = (filterBy) => {
    return async (dispatch) => {
        try {
            const response = await postsService.query();
            if (response) {
                var postsToShow = response.filter(post => {
                    return post.title.includes(filterBy.title);
                })
                dispatch({ type: types.Get_POSTS, data: postsToShow });
            }
        }
        catch (err) {
            throw err;
        }
    }
};

export const getAllPosts = () => {
    return async (dispatch) => {
        try {
            const response = await postsService.query();
            dispatch({ type: types.Get_POSTS, data: response });
        }
        catch (err) {
            throw err;
        }
    };
};

export const deletePost = (postId) => {
    return async () => {
        try {
            await postsService.deletePost(postId);
            getAllPosts();
        }
        catch (err) {
            throw err;
        }
    }
};

export const addPost = (post) => {
    return async () => {
        try {
            await postsService.addPost(post);
            getAllPosts();
        }
        catch (err) {
            throw err;
        }
    }
};


