export function login(credentials) {
    return new Promise((res, rej) => {
       axios.post('/api/auth/login', credentials)
           .then((response) => {
               res(response.data);
           })
           .catch((error) => {
               rej(error);
           });
    });
}

export function register(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/auth/register', credentials)
            .then((response) => {
                res(response.data);
            })
            .catch((error) => {
                rej(error);
            });
    });
}

export function getAuthUser() {
    return new Promise((res, rej) => {
        axios.get('/api/me')
            .then((response) => {
                res(response.data);
            })
            .catch((error) => {
                rej(error);
            });
    });
}
