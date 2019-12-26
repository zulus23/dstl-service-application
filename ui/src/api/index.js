import axios from 'axios'

const  client = axios.create();
client.defaults.timeout = 1000 * 60 * 8;
/*if (process.env.NODE_ENV !== 'production') {
    client.defaults.baseURL = 'http://localhost:9000';
    client.defaults.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

}
*/
/*client.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    console.log('client.interceptors.response ---- ',error.response.data);
    return Promise.reject(error);
})*/
/*let axiosConfig  =  (token) =>{

    return {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Auth-Token": token
        },

    }
};*/

export function authorization(user) {
    return client.post('/api/login',user);
}
