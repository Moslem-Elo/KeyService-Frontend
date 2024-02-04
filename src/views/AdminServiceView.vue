<template>
  <div>
    <h2>Durchsuchen der vorhandenen Anfragen</h2>

    <div class="additional-info">
      <h3 style="color: white;">Key Requests</h3>
      <div class="search-container">
        <input type="text" id="myInput" @input="filterTable" placeholder="Auftrag suchen.." title="Geben sie eine Auftragsnummer ein.">
      </div>
      <p style="color: #ccc;">Hier sind die aktuellen Key Requests:</p>

      <table id="myTable">
        <tr class="header">
          <th style="width:60%;">Vorname</th>
          <th style="width:40%;">Nachname</th>
          <th style="width:10%;">Aktionen</th>
        </tr>
        <tr v-for="request in keyRequests" :key="request.id" :class="{ 'selected': selectedKeyRequest === request }" @click="showKeyRequestDetails(request)">
          <td>{{ request.firstname }}</td>
          <td>{{ request.lastname }}</td>
          <td class="deleteButton">
            <button class="deleteButton" @click="deleteKeyRequest(request.id)">Löschen</button>
          </td>
        </tr>
      </table>

      <div class="modal" v-if="selectedKeyRequest">
        <div class="modal-content">
          <span class="close" @click="closeModal"></span>
          <h2>KeyRequest Details</h2>
          <p><strong>Vorname:</strong> {{ selectedKeyRequest.firstname }}</p>
          <p><strong>Nachname:</strong> {{ selectedKeyRequest.lastname }}</p>
          <p><strong>Email:</strong> {{ selectedKeyRequest.email }}</p>
          <p><strong>Telefonnummer:</strong> {{ selectedKeyRequest.phoneNumber }}</p>
          <p><strong>Nachricht:</strong> {{selectedKeyRequest.message}}</p>
        </div>
      </div>
      <div v-if="showAlert" class="alert success">
        <span class="closebtn" @click="closeAlert">&times;</span>
        <strong>{{ alertMessage }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const showAlert = ref(false);
const closeAlert = () => {
  showAlert.value = false;
};
const alertMessage = "Löschen erfolgreich!";

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

const keyRequests = ref([]);

const fetchKeyRequests = async () => {
  try {
    const response = await axios.get('http://localhost:8080/get-all');
    keyRequests.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Key Requests:', error);
  }
};

const deleteKeyRequest = async (keyRequestId) => {
  try {
    const confirmed = confirm('Sind Sie sicher, dass Sie diesen KeyRequest löschen möchten?');
    if (confirmed) {
      await axios.delete(`http://localhost:8080/${keyRequestId}/delete`);
      console.log('KeyRequest deleted');
      showAlert.value = true;
      // Remove the selectedKeyRequest from keyRequests array
      keyRequests.value = keyRequests.value.filter(request => request.id !== keyRequestId);
      selectedKeyRequest.value = null; // Reset selectedKeyRequest
    }
  } catch (error) {
    console.error('Fehler beim Löschen des Key Requests:', error);
  }
};

onMounted(() => {
  fetchKeyRequests();
});

</script>

<style scoped>
.modal{
  background-color: #575757;
  border-radius: 5px;
  font-size: 20px;
}
.deleteButton button {
  color: white;
  background-color: red;
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.3s;
}
.deleteButton button:hover {
  background-color: #f63e3e; /* Hervorhebungsfarbe beim Hovern */
}

.selected {
  background-color: #575757; /* Hervorhebungsfarbe für ausgewählte Zeile */
  border-radius: 10px;
}
.selected td {
  border-radius: 10px;
  padding: 10px;
  color: #4f6cff;
}
#myTable tr.selected:hover {
  cursor: pointer; /* Ändern Sie hier den Mauszeiger-Stil, zum Beispiel zu 'pointer' für einen Zeiger */
}
.alert {
  padding: 20px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 10px;
}

.success {
  background-color: #ff020a;
}

.error {
  background-color: #fd6054;
}
#myTable tr:hover {
  cursor: pointer; /* Ändern Sie hier den Mauszeiger-Stil, zum Beispiel zu 'pointer' für einen Zeiger */
}
.closebtn {
  margin-left: 15px;
  color: white;
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
  color: white;
}
h2 {
  font-weight: bold;
}
h3 {
  font-weight: bold;
}

.additional-info {
  text-align: left;
  margin-top: 20px;
  font-weight: bold;
  color: white;
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
