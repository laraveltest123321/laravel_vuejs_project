import {fetchBoards as apiFetchBoards} from './helpers/api';

export default {
    state: {
        isLoggedIn: !!localStorage.getItem('token'),
        currentUser: null,
        boards: null
    },

    getters: {

    },

    mutations: {
        login_success(state, payload) {
            localStorage.setItem( "token", payload.access_token );
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            state.currentUser = null;
        },
        set_user(state, user) {
            state.currentUser = user;
        },
        set_boards(state, boards) {
            state.boards = boards;
        }
    },

    actions: {
        fetchBoards(context) {
            apiFetchBoards()
                .then((response) => {
                    setTimeout(() => {
                        context.commit('set_boards', response);
                    }, 500);
                })
                .catch((error) => {});
        }
    }
}