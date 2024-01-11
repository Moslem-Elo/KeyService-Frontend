<template>
    <div>
        <header>
            <div class="wrapper">
                <div></div>
                <nav>
                    <router-link to="/" class="custom-link" :class="{ 'active-link': $route.path === '/' }">Home</router-link>
                    <router-link to="/about" class="custom-link" :class="{ 'active-link': $route.path === '/about' }">Service</router-link>
                </nav>
            </div>
        </header>

        <body>

        </body>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
header {
    background-color: #413f3f;
    padding: 30px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;

}

body {
    margin: 0; /* Setze den Seitenrand auf 0, um den Standardseitenrand zu entfernen */
    background-color: #03daf8; /* Hintergrundfarbe des Body-Elements */
    background-size: cover; /* Skaliert das Hintergrundbild, um die gesamte Fläche zu bedecken */
}


.image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1; /* Setze das Bild hinter den anderen Elementen */
}

.image-container img {
    width: 100vw; /* Breite des Viewports */
    height: 100vh; /* Höhe des Viewports */
    object-fit: cover; /* Skaliert das Bild, um die gesamte Fläche zu bedecken */
    object-position: center; /* Position des Bildes im Container */
}

.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    font-family: Calibri;
    font-style: normal;
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
