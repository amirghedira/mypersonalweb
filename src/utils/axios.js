import axios from 'axios'

const instanceaxios = axios.create({
    baseURL: 'https://mywebrestapi.herokuapp.com/'
})

export default instanceaxios

