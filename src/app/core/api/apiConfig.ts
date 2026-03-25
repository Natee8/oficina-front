import axios from 'axios';
import { environment } from '../../../environments/environments';

const api = axios.create({
  baseURL: environment.apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
