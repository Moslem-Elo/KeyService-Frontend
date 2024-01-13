<template>
    <div>
        <form @submit.prevent="registerUser">
            <div class="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <label for="email"><b>Email</b></label>
                <input v-model="email" type="text" placeholder="Enter Email" name="email" required>

                <label for="password"><b>Password</b></label>
                <input v-model="password" type="password" placeholder="Enter Password" name="password" required>

                <label for="password-repeat"><b>Repeat Password</b></label>
                <input v-model="passwordRepeat" type="password" placeholder="Repeat Password" name="password-repeat" required>
                <hr>
                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                <button type="submit" class="registerbtn">Register</button>
            </div>

            <div class="container signin">
                <p>Already have an account? <router-link to="/login">Sign in</router-link>.</p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const passwordRepeat = ref('');

const registerUser = () => {
    // Implement your user registration logic here
    // You can use email.value, password.value, and passwordRepeat.value to access form inputs
    // Redirect to another route after successful registration
    router.push('/dashboard');
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

.signin {
    background-color: #7c7a7a;
    text-align: center;
    font-weight: bold;
}
</style>
