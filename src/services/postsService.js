import httpService from './http.service.js';

export default {
  query, 
  addPost,
  deletePost,
}


async function query() {
  try {
    const res = await httpService.get(_getUrl());
    return res;
  }
  catch (err) {
   throw err;
  }
}

async function addPost(post) {
  try {
      await httpService.post(_getUrl('addpost'), post);
  }
  catch (err) {
      throw err;
  }
}

async function deletePost(postId) {
  try {
   await httpService.delete(_getUrl(postId));
  }
  catch (err) {
    throw err;
  }
}


function _getUrl(id = '') {
  return `post/${id}`
}
