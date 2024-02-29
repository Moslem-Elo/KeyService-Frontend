<template>
  <div>
    <h2>Schlüsselanfragen Formular</h2>

    <div class="container">
      <form @submit.prevent="formularAbsenden">
        <div class="row">
          <div class="col-25">
            <label for="vorname">Vorname:</label>
          </div>
          <div class="col-75">
            <input v-model="vorname" type="text" id="vorname" name="vorname" placeholder="Dein Vorname.." required>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="nachname">Nachname:</label>
          </div>
          <div class="col-75">
            <input v-model="nachname" type="text" id="nachname" name="nachname" placeholder="Dein Nachname.." required>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="telefon">Telefonnummer:</label>
          </div>
          <div class="col-75">
            <div class="telefon-eingabe">
              <select v-model="laendervorwahl" id="laendervorwahl" name="laendervorwahl" required>
                <option value="+49">+49 (Deutschland)</option>
                <option value="+41">+41 (Schweiz)</option>
                <option value="+43">+43 (Österreich)</option>
              </select>
              <input v-model="telefonnummer" type="text" id="telefonnummer" name="telefonnummer" placeholder="Deine Telefonnummer.." required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="email">E-Mail-Adresse:</label>
          </div>
          <div class="col-75">
            <input v-model="email" type="email" id="email" name="email" placeholder="Deine E-Mail-Adresse.." required>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="nachricht">Nachricht:</label>
          </div>
          <div class="col-75">
            <textarea v-model="nachricht" id="nachricht" name="nachricht" placeholder="Schreibe etwas.." style="height:200px" required></textarea>
          </div>
        </div>
        <!-- Bild hochladen -->
        <div class="row">
          <div class="col-25">
            <label for="bild">Bild:</label>
          </div>
          <div class="col-75">
            <input type="file" id="bild" name="bild" accept="image/*" class="bild">
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Absenden" class="absenden-btn">
        </div>
      </form>
    </div>

    <div v-if="showAlert" :class="alertClass">
      <span class="closebtn" @click="closeAlert">&times;</span>
      <strong>{{ alertMessage }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const vorname = ref('');
const nachname = ref('');
const laendervorwahl = ref('+49');
const telefonnummer = ref('');
const email = ref('');
const nachricht = ref('');

const showAlert = ref(false);
const showErrorAlert = ref(false);

const closeAlert = () => {
  showAlert.value = false;
  showErrorAlert.value = false;
};

const formularAbsenden = async () => {
  try {
    // Erste POST-Anfrage
    const formData = new FormData();
    const bildInput = document.getElementById('bild');
    const selectedFile = bildInput.files[0];
    formData.append('message', nachricht.value);
    formData.append('phoneNumber', `${laendervorwahl.value} ${telefonnummer.value}`);
    formData.append('firstname', vorname.value);
    formData.append('lastname', nachname.value);
    formData.append('email', email.value);
    formData.append('bild', selectedFile);

    const response1 = await axios.post('http://localhost:8080/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });


    showAlert.value = true;
    console.log('Formular abgesendet:', response1.data);
  } catch (error) {
    console.error('Fehler bei der Übermittlung des Formulars:', error);
    showErrorAlert.value = true;
  }
};

const alertClass = computed(() => {
  return showErrorAlert.value ? 'alert error' : 'alert success';
});

const alertMessage = computed(() => {
  return showErrorAlert.value ? 'Fehler beim Senden!' : 'Senden erfolgreich!';
});
</script>

<style scoped>
.alert {
  padding: 20px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 10px;
}

.success {
  background-color: #45a049;
}

.error {
  background-color: #f44336;
}


.closebtn {
  margin-left: 15px;
  color: #fffcfc;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #575757;
  color: #000000;
}
h2 {
  font-weight: bold;
  color: #f5f5f6;
  text-align: left;
}

.container {
  border-radius: 5px;
  background-color: #fffcfc; /*Farbe vom Formular*/
  padding: 20px;
}

input[type="email"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #000000;
  border-radius: 4px;
  resize: vertical;
  background-color: #fffcfc;
  color: #000000;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #000000;
  border-radius: 4px;
  resize: vertical;
  background-color: #fffcfc;
  color: #000000;
}

.telefon-eingabe {
  display: flex; /* Aktiviert Flexbox */
  align-items: center; /* Zentriert die Elemente vertikal */
  gap: 10px; /* Fügt einen Abstand zwischen den Elementen hinzu */
}

.telefon-eingabe select, .telefon-eingabe input[type="text"] {
  flex-grow: 1; /* Beide Elemente nehmen verfügbaren Platz ein */
  background-color: #fffcfc; /* Hintergrundfarbe */
  color: #000000; /* Schriftfarbe */
  border: 1px solid #000000; /* Grenzfarbe */
  padding: 10px; /* Innenabstand */
  border-radius: 4px; /* Ecken abrunden */
}

/* Optional: Anpassen der Breite spezifisch für das Dropdown und das Textfeld, falls nötig */
.telefon-eingabe select {
  width: 30%; /* Breite des Dropdown-Menüs */
}

.telefon-eingabe input[type="text"] {
  width: 70%; /* Breite des Textfeldes */
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  color: #000000;
}

input[type=submit] {
  background-color: #04AA6D;
  color: #fffcfc;
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
  font-weight: bold;
  color: black;

}

@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
