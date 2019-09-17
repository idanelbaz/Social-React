import Axios from 'axios';
import userService from './userService'

export default {
  query, 
  addPost,
  deletePost,
  getUserPosts,
}


async function query() {
  const user = userService.getLoggedinUser();
  const token = user.data.token;
  try {
    const res = await Axios.get(_getUrl('get-all-posts'), { headers: {"Authorization" : `${token}`}})
    if(res === "unauthorized") throw new Error ('unauthorized')
    if(res.data.res === true)return res.data.data;
  }
  catch (err) {
   throw err;
  }
}

async function addPost(post) {
  const user = userService.getLoggedinUser();
  const token = user.data.token;
  try {
    const res = await Axios.post(_getUrl('add-post'),post,{ headers: {"Authorization" : `${token}`}})
    return res.status
  }
  catch (err) {
    if (err.response.status !== 200) {
      return err.response.status
   }
  }
}

async function deletePost(post_id) {
  const user = userService.getLoggedinUser();
  const token = user.data.token;
  try {
    const res = await Axios.delete(_getUrl(`delete-post-by-id/${post_id}`), { headers: {"Authorization" : `${token}`}})
    if(res.res === true) return true;
  }
  catch (err) {
    throw err;
  }
}

async function getUserPosts() {
  const user = userService.getLoggedinUser();
  const token = user.data.token;
  try {
    const res = await Axios.get(_getUrl('/post/get-posts-by-user-id'), { headers: {"Authorization" : `${token}`}})
    if(res === "unauthorized") throw new Error ('unauthorized')
    if(res.res === true)return res.data;
  }
  catch (err) {
    throw err;
  }
}





function _getUrl(action = '') {
  return `https://moonsite-rn-test.herokuapp.com/api/post/${action}`;
}
