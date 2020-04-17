import axios from 'axios'

const instanceaxios = axios.create({
    baseURL: 'http://192.168.1.3:5000'
})

export default instanceaxios

