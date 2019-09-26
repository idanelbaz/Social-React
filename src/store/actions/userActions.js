import types from "../types";
import userService from "../../services/userService";



export const getUser = () => {
    return async (dispatch) => {
        const response = await userService.getLoggedinUser()
         dispatch({ type: types.GET_USER, data: response })
    };
};

export const signUp = (user) => {
    return async (dispatch) => {
       try{ 
            await userService.signUp(user);
            const response = userService.getLoggedinUser()
            dispatch({ type: types.GET_USER, data: response })
       }
       catch(err){ 
            throw err;
       }
     
    };
};

export const logIn = (user) => {
    return async (dispatch) => {
       try{ 
            await userService.logIn(user)
            const response = userService.getLoggedinUser()
            dispatch({ type: types.GET_USER, data: response })
       }
       catch(err){ 
            throw err
       }
        
    };
};

export const logOut = () => {
    return (dispatch) => {
        userService.logOut();
        const response = userService.getLoggedinUser()
        dispatch({ type: types.GET_USER, data: response })
    };
};

export const addFollow = (userId) => {
    return async (dispatch) => {
       try{ 
            await userService.addFollowOn(userId)
            getUser();
       }
       catch(err){ 
            throw err
       }
        
    };
};

