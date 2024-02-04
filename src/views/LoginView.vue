<template>
  <div>
    <form @submit.prevent="signInUser">
      <div class="container">
        <h1>Sign In</h1>
        <p>Bitte geben Sie ihre Daten ein, um sich anzumelden.</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input v-model="email" type="text" placeholder="Enter Email" name="email" required>

        <label for="password"><b>Passwort</b></label>
        <input v-model="password" type="password" placeholder="Enter Password" name="password" required>
        <hr>

        <button type="submit" class="registerbtn">Anmelden</button>
      </div>

      <div class="container register-container">
        <p>Noch keinen Account? <router-link to="/register">Registrieren</router-link>.</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const signInUser = () => {
  // Beispiel: Einfache Überprüfung von E-Mail und Passwort
  if (email.value === 'admin' && password.value === 'password123') {
    // Hier kann man weitere Aktionen durchführen (z.B., Zustand aktualisieren, Benutzer weiterleiten)
    console.log('Anmeldung erfolgreich');
    router.push('/admin');
  } else {

    console.error('Anmeldung fehlgeschlagen. Überprüfen Sie E-Mail und Passwort.');
  }
};
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffffff;
}

.container {
  padding: 16px;
  background-color: #7c7a7a;
  color: white;
}

h1 {
  font-weight: bold;
}

p {
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.registerbtn {
  background-color: #227955;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

a {
  color: #ffffff;
}

.register-container {
  background-color: #7c7a7a;
  text-align: center;
  font-weight: bold;
}
</style>
