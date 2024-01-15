<template>
    <div>
        <div class="sidebar">
            <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">Home</router-link>
            <router-link to="/service" class="nav-link" :class="{ 'active': $route.path === '/service' }">Service</router-link>
            <router-link to="/login" class="nav-link" :class="{ 'active': $route.path === '/contact' }">Login</router-link>
        </div>

        <div class="content">

            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(
    () => route.path,
    (newPath) => {
        // Close sidebar when navigating to a new route (for mobile view)
        if (window.innerWidth <= 700) {
            toggleSidebar();
        }
    }
);

const sidebarOpen = ref(false);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

// Close sidebar on initial load if in mobile view
if (window.innerWidth <= 700) {
    toggleSidebar();
}

// Close sidebar when clicking outside of it
window.addEventListener('click', (event) => {
    const sidebar = document.querySelector('.sidebar');
    if (event.target !== sidebar && !sidebar.contains(event.target)) {
        sidebarOpen.value = false;
    }
});

// Update sidebar status on window resize
window.addEventListener('resize', () => {
    sidebarOpen.value = window.innerWidth > 700;
});
</script>

<style scoped>
body {
    margin: 0;
    font-family: "Lato", sans-serif;
}

.content {
    background-color: #7c7a7a;
    color: white;

}

.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #424242;
    position: fixed;
    height: 100%;
    overflow: auto;
    transition: width 0.3s;
    font-weight: bold;
}

.sidebar a {
    display: block;
    color: #ffffff;
    padding: 16px;
    text-decoration: none;
}

.sidebar a.active {
    background-color: #504f4f;
    color: #4f6cff;
}

.sidebar a:hover:not(.active) {
    background-color: #504f4f;
    color: #4f6cff;
}

div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
    transition: margin-left 0.3s;
}

@media screen and (max-width: 700px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
    .sidebar a {
        float: left;
    }
    div.content {
        margin-left: 0;
    }
    .sidebar:not(.open) {
        display: none;
    }
}

@media screen and (max-width: 400px) {
    .sidebar a {
        text-align: center;
        float: none;
    }
}
</style>
