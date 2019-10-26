import {getAuthUser} from "./api";

export function init(store, router) {

    /*Define Middleware for axios request*/
    axios.interceptors.request.use(function (config) {
        if(localStorage.getItem('token')) {
            config.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    /*Define Middleware for axios response*/
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if(error.response && error.response.status === 401) {
            store.commit("logout");
            router.push({name: 'login'});
        }
        return Promise.reject(error);
    });

    /*Define Middleware for Vue Router*/
    router.beforeEach((to, from, next) => {
        const isLoggedIn = store.state.isLoggedIn;
        const isProtected = to.meta.protected;

        if(isLoggedIn && !store.state.currentUser) {
            getAuthUser()
                .then((res) => {
                    store.commit("set_user", res);
                }).catch((err) => {});

        }
        if(isLoggedIn && !isProtected) {
            next({name: 'home'});
            return;
        } else if (!isLoggedIn && isProtected) {
            next({name: 'login'});
            return;
        }
        next();
    });
}