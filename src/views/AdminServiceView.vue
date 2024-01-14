<template>
  <div>
    <h2>Schlüsselanfragen Formular</h2>
    <p>Bitte geben Sie Ihre Daten ein.</p>


    <div class="additional-info">
      <h3 style="color: white;">Key Requests</h3>
      <div class="search-container">
        <input type="text" id="myInput" @input="filterTable" placeholder="Dienstleistung suchen.." title="Geben Sie eine Dienstleistung ein">
      </div>
      <p style="color: #ccc;">Hier sind die aktuellen Key Requests:</p>

      <table id="myTable">
        <tr class="header">
          <th style="width:60%;">Vorname</th>
          <th style="width:40%;">Nachname</th>
        </tr>
        <tr v-for="request in keyRequests" :key="request.id" @click="showKeyRequestDetails(request)">
          <td>{{ request.firstname }}</td>
          <td>{{ request.lastname }}</td>
        </tr>
      </table>
      <div class="modal" v-if="selectedKeyRequest">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>KeyRequest Details</h2>
          <p><strong>Vorname:</strong> {{ selectedKeyRequest.firstname }}</p>
          <p><strong>Nachname:</strong> {{ selectedKeyRequest.lastname }}</p>
          <!-- Fügen Sie hier weitere Details hinzu -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedKeyRequest = ref(null);

const showKeyRequestDetails = (request) => {
  selectedKeyRequest.value = request;
};

const closeModal = () => {
  selectedKeyRequest.value = null;
};

const filterTable = () => {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

const vorname = ref('');
const nachname = ref('');
const laendervorwahl = ref('+49');
const telefonnummer = ref('');
const email = ref('');
const nachricht = ref('');
const keyRequests = ref([]);

const fetchKeyRequests = async () => {
  try {
    const response = await axios.get('http://localhost:8080/get-all');
    keyRequests.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Key Requests:', error);
  }
};

const formularAbsenden = async () => {
  try {
    const response = await axios.post('http://localhost:8080/create', {
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

onMounted(() => {
  fetchKeyRequests();
});
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

.additional-info {
  text-align: left;
  margin-top: 20px;
  font-weight: bold;
}

.container {
  border-radius: 5px;
  background-color: #484848;
  padding: 20px;
}

input[type="email"] {
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
