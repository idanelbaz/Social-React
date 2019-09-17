import Axios from 'axios';
import userService from './userService'

export default {
 addFollower, 
 getFollowersOfUser,
 getUserFollowOn,
}


async function addFollower(userId) {
  const user = userService.getLoggedinUser();
  const token = user.data.token;
  const userAdded = {"f_user_id": userId }
  try {
  const res = await Axios.post(_getUrl('add-follower'),userAdded ,{ headers: {"Authorization" : `${token}`}})
    if(res === "unauthorized") throw new Error ('unauthorized')
    if(res.res)return res.data;
  }
  catch (err) {
   throw err;
  }
}

async function getFollowersOfUser() {
  const user = userService.getLoggedinUser();
  const token = user.data.token;
  try {
    const res = await Axios.get(_getUrl('get-my-followers'), { headers: {"Authorization" : `${token}`}})
    if(res === "unauthorized") throw new Error ('unauthorized')
    if(res.data.res === true)return res.data.data;
  }
  catch (err) {
    throw err;
  }
}

async function getUserFollowOn() {
    const user = userService.getLoggedinUser();
    const token = user.data.token;
    try {
      const res = await Axios.get(_getUrl('get-followers-by-user-id'), { headers: {"Authorization" : `${token}`}})
      if(res === "unauthorized") throw new Error ('unauthorized')
      if(res.data.res === true)return res.data.data;
    }
    catch (err) {
     throw err;
    }
  }





function _getUrl(action = '') {
  return `https://moonsite-rn-test.herokuapp.com/api/follower/${action}`;
}
