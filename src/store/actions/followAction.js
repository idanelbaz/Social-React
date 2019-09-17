import types from "../types";
import followService from "../../services/followService";


export const addFollow = (userId) => {
    return async (dispatch) => {
        try { 
            const response = await followService.addFollower(userId)
            return response;
        }
        catch (err) {
             console.log(err)
        } 
    };
};

export const getFollowersOfUser = () => {
    return async (dispatch) => {
        try { 
            const response = await followService.getFollowersOfUser()
            dispatch({ type: types.GET_FOLLOWERS_OF_USER, data: response })
        }
        catch (err) {
            console.log(err)
        } 
    };
};

export const getUserFollowOn = () => {
    return async (dispatch) => {
        try { 
            const response = await followService.getUserFollowOn()
            dispatch({ type: types.GET_USER_FOLLOWE_ON, data: response })
        }
        catch (err) {
             console.log(err)
        } 
    };
};



