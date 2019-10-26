<template>
    <div class="login">
        <div class="alert alert-danger" v-show="authError">
            {{ authError }}
        </div>
        <div class="card form-wrapper">
            <div class="card-header form-header">Login</div>
            <div class="card-body form-body">
                <form @submit.prevent="authenticate">
                    <div class="form-group row">
                        <input type="text" v-model="form.email" placeholder="Email Address" :class="['form-control', {'is-invalid' : formErrors.email}]" @keyup="formErrors.email = ''">
                        <span role="alert" class="invalid-feedback" v-if="formErrors.email">
                            <strong>{{formErrors.email}}</strong>
                        </span>
                    </div>
                    <div class="form-group row">
                        <input type="password" v-model="form.password" placeholder="Password"  :class="['form-control', {'is-invalid' : formErrors.password}]" @keyup="formErrors.password = ''">
                        <span role="alert" class="invalid-feedback" v-if="formErrors.password">
                            <strong>{{formErrors.password}}</strong>
                        </span>
                    </div>
                    <div class="form-group row">
                        <input type="submit" value="Login">
                    </div>
                    <div class="form-footer">
                        <span>Don't Have An Acoount Yet? </span>
                        <router-link :to="{ name: 'register'}">Register Here</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from '../../helpers/api';
    export default {
        name: "login",
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                formErrors: {
                    email: '',
                    password: ''
                },
                authError: null
            };
        },
        methods: {
            authenticate() {
                this.formErrors.email = '';
                this.formErrors.password = '';
                const credentials = this.$data.form;
                login(credentials)
                    .then((res) => {
                        this.$store.commit("login_success", {access_token: res});
                        this.$router.push({name: 'home'});
                    })
                    .catch((error) => {
                        const response = error.response;
                        if (response) {
                            const statusCode = response.status;
                            const data = response.data;

                            switch (statusCode) {
                                case 401: {
                                    this.authError = data;
                                    if (this.errTimeOut) {
                                        clearTimeout(this.errTimeOut);
                                    }
                                    this.errTimeOut = setTimeout(() => {
                                        this.authError = null;
                                    }, 4000);
                                    break;
                                }
                                case 422: {
                                    const errObj = data.errors;

                                    for (const key in errObj) {
                                        this.formErrors[key] = errObj[key][0];
                                    }

                                    break;
                                }
                            }
                        }
                    });
            }
        }
    }
</script>


<style>
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .form-wrapper {
        flex-direction: row;
        min-width: 480px;
        max-width: 500px;
        border: none;
        box-shadow: 1px 2px 8px #ccc;
        border-radius: 15px;
    }
    .form-header {
        background: #d7dee5;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20px;
        color: #999;
        font-weight: 600;
        border: none;
        display: flex;
        align-items: center;
    }

    .form-body {
        padding: 30px 30px 20px;
    }

    .form-body input {
        border: none;
        border-bottom: 1px solid #eee;
        border-radius: 0;
    }

    .form-body .form-control:focus {
        box-shadow: unset;
    }

    .form-body input[type=submit] {
        background: #68a3d6;
        color: #fff;
        border-radius: 3px;
        padding: 3px 20px;
        border: 1px solid #68a3d6;
        margin-top: 15px;
    }

    .form-body input[type=submit]:hover {
        background: #588ab5;
        border-color: #588ab5;
        cursor: pointer;
    }

    .form-footer span {
        font-size: 12px;
        color: #555;
    }

    .form-footer a {
        color: #588ab5;
        font-weight: 600;
        cursor: pointer;
        font-style: italic;
    }


</style>