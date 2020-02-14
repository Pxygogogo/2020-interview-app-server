import axios from 'axios';

const requests = axios.create({
  timeout: 10000,
});

requests.interceptors.response.use(response => {
  return response.data;
});

export default requests;
