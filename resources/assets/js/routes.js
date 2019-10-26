import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
export const routes = [

    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            protected: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            protected: false
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            protected: false
        },
    },
    {
        path: '/*',
        redirect: '/'
    }
];
