// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost/PHP/generalcensus_display.php',
  withCredentials: false, // Adjust this based on your server configuration
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  testConnection() {
    return apiClient.get('/');
  },
};
