import axios from 'axios'

const instanceaxios = axios.create({
    baseURL: 'http://localhost:5000'
})

export default instanceaxios

