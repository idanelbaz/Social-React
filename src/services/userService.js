import httpService from './http.service.js';


export default {
    signUp,
    logIn,
    logOut,
    getLoggedinUser,
    addFollowOn,
}

function getLoggedinUser() {
    if (loadFromStorage('user')) return loadFromStorage('user');
    return null;
}

async function logIn(user) {
    try {
        const currUser = await httpService.post(_getUrl('login'), user);
        saveToStorage('user', currUser);
    }
    catch (err) {
        throw err;
    }
}

async function signUp(user) {
    try {
        const res = await httpService.post(_getUrl('signup'), user);
        saveToStorage('user', res);
    }
    catch (err) {
        console.log(err, 'cannot do login');
        throw err;
    }
}

function logOut() {
    localStorage.clear();
}

async function addFollowOn(userFollowedOnId) {
    try {
        const user = getLoggedinUser();
        const userWithFollow = await httpService.put(_getUrl('addFollower'), { userFollowedOnId, userThatFollow: user });
        saveToStorage('user', userWithFollow);
    }
    catch (err) {
        throw err;
    }
}






function _getUrl(id = '') {
    return `user/${id}`;
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}