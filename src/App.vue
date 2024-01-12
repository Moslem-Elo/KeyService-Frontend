<template>
    <div>
        <header>
            <div class="wrapper">
                <div class="title-container">
                    <h3 class="title">Schlüsseldienst</h3>
                </div>
                <nav>
                    <router-link to="/" class="custom-link" :class="{ 'active-link': $route.path === '/' }">
                        <font-awesome-icon icon="fa-solid fa-house" />
                    </router-link>
                    <router-link to="/service" class="custom-link" :class="{ 'active-link': $route.path === '/service' }">
                        <font-awesome-icon icon="fa-solid fa-key" />
                    </router-link>
                    <router-link to="login" class="custom-link" :class="{'active-link': $route.path === '/login'}">
                        <font-awesome-icon icon="fa-solid fa-user" />
                    </router-link>
                </nav>
            </div>
        </header>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style>
header {
    background-color: #484848;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}

body{
    background-color: #575757;
}

.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    font-family: Arial;
    font-style: normal;
}

.title-container {
    flex: 1; /* Fülle den verfügbaren Platz aus */

}

.title {
    font-weight: bold; /* Mach die Schrift dicker */
    font-size: larger;
    color: white;
    font-family: "Arial Black";
}

nav {
    display: flex;
    gap: 20px;
}

.custom-link {
    color: #fffafa; /* Farbe für nicht aktive Links */
}

.active-link {
    color: #4f6cff; /* Farbe für aktive Links */
    /* Hier könntest du auch andere Stile für aktive Links hinzufügen */
}
</style>
