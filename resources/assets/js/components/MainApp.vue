<template>
    <div class="">
        <navbar></navbar>
        <div class="">
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar';
    export default {
        name: 'main-app',
        components: {
            Navbar
        }
    }
</script>


