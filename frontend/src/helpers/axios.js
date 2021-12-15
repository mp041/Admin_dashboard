import axios from 'axios';


const token = window.localStorage.getItem('token')

const axiosIntance  = axios.create({
  headers : {
    'Authorization' : token ? token : ''
  }

});

export default axiosIntance;
