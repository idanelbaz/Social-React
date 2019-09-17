import Axios from 'axios';


export default {
signUp,
logIn,
logOut,
getLoggedinUser,
}


function getLoggedinUser() {
    if (loadFromStorage('user')) return loadFromStorage('user')
    return null
}

async function logIn(user) {
    try {
            const res = await Axios.post(_getUrl('login'), user)
            saveToStorage('user', res.data)
            return res.status;
    }
    catch (err) {
        if (err.response.status !== 200) {
           return err.response.status
        }
    }
}

async function signUp(user) {
    try {
        const res = await Axios.post(_getUrl('register'), user)
        return res.status;
    }
    catch (err) {
        if (err.response.status !== 200) {
            return err.response.status
        }
    }
}

function logOut() {
    localStorage.clear();
}

function _getUrl(action = '') {
    return `https://moonsite-rn-test.herokuapp.com/api/usr/${action}`;
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}