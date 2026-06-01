import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL ?? 'https://brokerage-api.contact.eg';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
