import axios from 'axios'


const API = axios.create({
	// baseURL: ``,
	baseURL: process.env.PREACT_APP_BASE_URL,
	headers: {
        "mono-sec-key": process.env.PREACT_APP_MONO_API_SECRET_KEY
    },
});


export default API;