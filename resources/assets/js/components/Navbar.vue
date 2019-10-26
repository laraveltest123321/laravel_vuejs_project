<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel navbar-management" v-show="isLoggedIn">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">
                <img src="/images/logo.png" width="100">
                <small class="brand-name">Navigation Bar</small>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">

                </ul>

                <ul class="navbar-nav ml-auto">

                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{user && user.name}}  <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <button @click="doLogout()" class="dropdown-item">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {

        name: 'navbar',
        methods: {
            doLogout() {
                this.$store.commit("logout");
                this.$router.push({name: 'login'});
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.state.isLoggedIn;
            },
            user() {
                return this.$store.state.currentUser;
            }
        }
    }
</script>

<style>
    .navbar-management {
        box-shadow: 0 1px 4px #ccc;
        margin-bottom: 20px;
    }

    .navbar-management .nav-link,
    .navbar-management .dropdown-item {
        color: #68a3d6 !important;
        font-weight: 600;
    }

    .navbar-management .nav-link:hover,
    .navbar-management .dropdown-item:hover {
        color: #588ab5 !important;
    }

    .brand-name {
        vertical-align: -webkit-baseline-middle;
        text-transform: uppercase;
        color: #888;
        font-weight: 600;
        letter-spacing: 2px;
        font-size: 12px;
    }
</style>
