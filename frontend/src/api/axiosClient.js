import axios from 'axios';
import config from '../config'; // אנחנו מייבאים את הקובץ שיצרנו בשלב 2

const axiosClient = axios.create({
    baseURL: config.apiBaseUrl, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// הוספה אוטומטית של מזהה לקוח וטוקן לכל בקשה
axiosClient.interceptors.request.use((reqConfig) => {
    const token = 'my-secret-token-123'; // מדמים טוקן
    
    if (token) {
        reqConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    
    reqConfig.headers['client_id'] = config.clientId;

    return reqConfig;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;