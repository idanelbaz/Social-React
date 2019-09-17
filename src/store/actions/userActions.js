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
            const signUpTry = await userService.signUp(user);
            if(signUpTry !== 200){ 
                return signUpTry
            }
            const response = userService.getLoggedinUser()
            dispatch({ type: types.GET_USER, data: response })
            return signUpTry;
       }
       catch(err){ 
            console.log(err)
       }
     
    };
};

export const logIn = (user) => {
    return async (dispatch) => {
       try{ 
           const logInTry = await userService.logIn(user)
           if(logInTry !== 200){ 
               return logInTry
           }
            const response = userService.getLoggedinUser()
            dispatch({ type: types.GET_USER, data: response })
            return logInTry;
       }
       catch(err){ 
            console.log(err)
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

