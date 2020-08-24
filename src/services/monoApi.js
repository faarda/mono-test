import api from '../api'

export default {
    GET_USER_ID: (code) => {
        return api.post('/account/auth', {code})
            .then(res => {
                return Promise.resolve(res)
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    GET_ACCOUNTS: (id) => {
        return api.get(`/accounts/${id}`)
            .then(res => {
                return Promise.resolve(res)
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    GET_TRANSACTIONS: (id, duration) => {
        return api.get(`/accounts/${id}/statement?last${duration}months`)
            .then(res => {
                return Promise.resolve(res)
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
}