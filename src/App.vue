<template>

    <div class="all">

        <div class="sidebar">
            <img src="@/assets/slogo2.jpg" alt="Logo" class="logo"/>
            <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">Home</router-link>
            <router-link to="/service" class="nav-link" :class="{ 'active': $route.path === '/service' }">Service</router-link>
            <router-link to="/login" class="nav-link" :class="{ 'active': $route.path === '/contact' }">Login</router-link>
          </div>


        <div class="content">
          <img src="@/assets/name.png" class="logo2">

          <router-view></router-view>
        </div>
      <img src="@/assets/background.jpg" class="back">
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
.logo {
  display: block; /* Stellt sicher, dass das Logo korrekt gerendert wird */
  margin: 0 auto; /* Zentriert das Logo innerhalb der Sidebar */
  padding: 0 0; /* Fügt oben und unten etwas Platz hinzu */
  width: 100%; /* Passt die Breite des Logos an */
  max-height: 100px; /* Beschränkt die Höhe des Logos, um Übergrößen zu vermeiden */
}
.logo2 {
   /* Stellt sicher, dass das Logo korrekt gerendert wird */
  display: block; /* Zentriert das Logo innerhalb der Sidebar */
  padding: 10px 0; /* Fügt oben und unten etwas Platz hinzu */
  width: 30%; /* Passt die Breite des Logos an */
  max-height: 100px;
  margin: 0 auto;/* Beschränkt die Höhe des Logos, um Übergrößen zu vermeiden */
}
body {

    font-family: "Lato", sans-serif;
}

.content {
  background-image: url('@/assets/background.jpg'); /* Stelle sicher, dass der Pfad korrekt ist */
  background-size: auto; /* Behält die ursprüngliche Größe des Bildes bei */
  background-position: top left; /* Startet das Bild in der oberen linken Ecke */
  background-repeat: repeat; /* Wiederholt das Bild */
  color: #ffffff;
  margin-left: 200px; /* Passt den linken Rand an, abhängig von deiner Sidebar */
  padding: 1px 16px;
  transition: margin-left 0.3s;
  min-height: 100vh; /* Stellt sicher, dass der Inhalt mindestens die Höhe des Viewports einnimmt */
}
.back {
  position: fixed; /* oder 'absolute', je nach Bedarf */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Stellt sicher, dass es hinter anderen Inhalten bleibt */
  object-fit: cover; /* Sorgt dafür, dass das Bild den Container vollständig bedeckt, ohne dessen Verhältnisse zu verzerren */
}


.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #ffffff;
    position: fixed;
    height: 100%;
    overflow: auto;
    transition: width 0.3s;
    font-weight: bold;
}

.sidebar a {
    display: block;
    color: #000000;
    padding: 16px;
    text-decoration: none;
}

.sidebar a.active {
    background-color: #516be1;
    color: #fffcfc;
}

.sidebar a:hover:not(.active) {
    background-color: #516be1;
    color: #fffcfc;
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
