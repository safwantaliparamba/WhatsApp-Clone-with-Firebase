import axios from "axios";

const FCMMessage = axios.create({
    baseURL:"https://fcm.googleapis.com/fcm/"
})


const API_KEY = "AAAAjkmTnL8:APA91bGbaI0T4G1dnokXiNuThdoL-yQPAArpkH5519D6w-G_Qc7E2K_tu0v89zZLsq5-UpLEOXP-K72Ro-zPTF4wHQIPvqtY-PHZvXzslYzd9PZlmZW5cGNLsU7GzYd1ZUrvfF19nSOi"

FCMMessage.interceptors.request.use((request)=>{
    request.headers.Authorization = `key=${API_KEY}`

    return request
})

export default FCMMessage