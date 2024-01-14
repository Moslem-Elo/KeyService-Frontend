<template>
    <div>
        <h2>Schlüsselanfragen Formular</h2>
        <p></p>

        <div class="container">
            <form @submit.prevent="formularAbsenden">
                <div class="row">
                    <div class="col-25">
                        <label for="vorname">Vorname</label>
                    </div>
                    <div class="col-75">
                        <input v-model="vorname" type="text" id="vorname" name="vorname" placeholder="Dein Vorname.." required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="nachname">Nachname</label>
                    </div>
                    <div class="col-75">
                        <input v-model="nachname" type="text" id="nachname" name="nachname" placeholder="Dein Nachname.." required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="telefon">Telefonnummer</label>
                    </div>
                    <div class="col-75">
                        <div class="telefon-eingabe">
                            <select v-model="laendervorwahl" id="laendervorwahl" name="laendervorwahl" required>
                                <option value="+49">+49 (Deutschland)</option>
                                <option value="+41">+41 (Schweiz)</option>
                                <option value="+43">+43 (Österreich)</option>
                                <!-- Füge weitere Optionen nach Bedarf hinzu -->
                            </select>
                            <input v-model="telefonnummer" type="text" id="telefonnummer" name="telefonnummer" placeholder="Deine Telefonnummer.." required>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="email">E-Mail-Adresse</label>
                    </div>
                    <div class="col-75">
                        <input v-model="email" type="email" id="email" name="email" placeholder="Deine E-Mail-Adresse.." required>
                    </div>
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="nachricht">Nachricht</label>
                    </div>
                    <div class="col-75">
                        <textarea v-model="nachricht" id="nachricht" name="nachricht" placeholder="Schreibe etwas.." style="height:200px" required></textarea>
                    </div>
                </div>
                <div class="row">
                    <input type="submit" value="Absenden" class="absenden-btn">
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const vorname = ref('');
const nachname = ref('');
const laendervorwahl = ref('+49');
const telefonnummer = ref('');
const email = ref('');
const nachricht = ref('');

const formularAbsenden = async () => {
    try {
        const response = await axios.post('/dein/backend-endpoint', {
            message: nachricht.value,
            phoneNumber: `${laendervorwahl.value} ${telefonnummer.value}`,
            firstname: vorname.value,
            lastname: nachname.value,
            email: email.value,
            // Weitere Felder hinzufügen, falls erforderlich
        });

        console.log('Formular abgesendet:', response.data);
    } catch (error) {
        console.error('Fehler bei der Übermittlung des Formulars:', error);
    }
};
</script>


<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #575757;
    color: white;
}
h2 {
    font-weight: bold;
}

.container {
    border-radius: 5px;
    background-color: #484848;
    padding: 20px;
}

input[type="email"] { /* Neues Stilregel für das E-Mail-Feld */
    width: 100%;
    padding: 12px;
    border: 1px solid #666;
    border-radius: 4px;
    resize: vertical;
    background-color: #a8a3a3;
    color: white;
}

input[type="text"],
select,
textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #666;
    border-radius: 4px;
    resize: vertical;
    background-color: #a8a3a3;
    color: white;
}

.telefon-eingabe {
    display: flex;
    align-items: center;
}

label {
    padding: 12px 12px 12px 0;
    display: inline-block;
    color: white;
}

input[type=submit] {
    background-color: #04AA6D;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.row {
    display: flex;
    justify-content: space-between;
}

.col-25,
.col-75 {
    flex: 0 0 48%;
    margin-top: 6px;
}

/* Responsives Layout - Wenn der Bildschirm weniger als 600 Pixel breit ist, sollen die beiden Spalten übereinander gestapelt werden, anstatt nebeneinander */
@media screen and (max-width: 600px) {
    .col-25,
    .col-75,
    input[type=submit] {
        width: 100%;
        margin-top: 0;
    }
}
</style>
