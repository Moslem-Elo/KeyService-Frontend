<template>
  <div>
    <h2>Durchsuchen der vorhandenen Anfragen</h2>

    <div class="additional-info">
      <h3 style="color: white;">Key Requests</h3>
      <div class="search-container">
        <input type="text" id="myInput" @input="filterTable" placeholder="Auftrag suchen.." title="Geben sie eine Auftragsnummer ein.">
      </div>
      <p style="color: #ccc;">Hier sind die aktuellen Key Requests:</p>

      <table class="selected-table" id="myTable">
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
          <p><strong>Status:</strong> {{selectedKeyRequest.status}} </p>
          <div class="setStatus">
            <label for="statusSelect">Status ändern:</label>
            <div class="status-update-container">
              <select id="statusSelect" v-model="selectedStatus" class="status-select">
                <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
              </select>
              <button class="updateButton" @click="updateStatus">Status aktualisieren</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showAlert" class="alert success">
        <span class="closebtn" @click="closeAlert">&times;</span>
        <strong>{{ alertMessage }}</strong>
      </div>
      <div v-if="showAlertUpdate" class="alert update" :class="{ 'alert-update-animate': alertAnimationTrigger }">
        <span class="closebtn" @click="closeAlertUpdate">&times;</span>
        <strong>{{ alertMessageUpdate }}</strong>
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
const showAlertUpdate = ref(false);
const closeAlertUpdate = () => {
  showAlertUpdate.value = false;
};

const alertMessage = "Löschen erfolgreich!";
const alertMessageUpdate = 'Status erfolgreich aktualisiert!';
const selectedKeyRequest = ref(null);
const alertAnimationTrigger = ref(false);

const triggerAlertAnimation = () => {
  alertAnimationTrigger.value = true;
  setTimeout(() => {
    alertAnimationTrigger.value = false;
  }, 500); // Wartezeit sollte der Dauer der Animation entsprechen
};
const showKeyRequestDetails = (request) => {
  selectedKeyRequest.value = request;
};

const closeModal = () => {
  selectedKeyRequest.value = null;
};
const statuses = ref([]); // Hinzufügen dieser Zeile
const selectedStatus = ref(''); // Stellen Sie sicher, dass diese Zeile vorhanden ist

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
const fetchStatuses = async () => {
  try {
    const response = await axios.get('http://localhost:8080/all-keystatus'); // Pfad anpassen entsprechend Ihrem Backend
    statuses.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Statusoptionen:', error);
  }
};

const updateStatus = async () => {
  try {
    const url = `http://localhost:8080/${selectedKeyRequest.value.id}/update-status?status=${encodeURIComponent(selectedStatus.value)}&email=${encodeURIComponent(selectedKeyRequest.value.email)}`;
    await axios.put(url);
    selectedKeyRequest.value.status = selectedStatus.value; // Aktualisiert den Status in der UI

    if(showAlertUpdate.value == true){
      triggerAlertAnimation();
    } else {
      showAlertUpdate.value = true;
    }
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Status:', error);
  }
};

onMounted(() => {
  fetchKeyRequests();
  fetchStatuses(); // Ruft Statusoptionen beim Initialisieren der Komponente ab
});


</script>

<style scoped>
.status-select {
  width: 30%; /* Passen Sie dies an Ihre Bedürfnisse an */
  padding: 5px;
  border-radius: 4px;
  background-color: #a8a3a3;
  color: white;
  border: 1px solid #666;
}
.status-select:hover{
  cursor: pointer;
}

@keyframes blink-animation {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.alert-update-animate {
  animation: blink-animation 1s ease-in-out;
}

.modal{
  background-color: #575757;
  border-radius: 5px;
  font-size: 20px;
}
.updateButton, .deleteButton button {
  cursor: pointer;
  position: relative;
  padding: 10px 20px; /* Angepasst für Konsistenz */
  border-radius: 10px;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  transition: background-color 0.3s;
  border: none; /* Entfernt den Standardrand */
}

/* Hover-Effekte */
.updateButton:hover, .deleteButton button:hover {
  background-color: #fc761a; /* Leichtere Farbe für Hover bei updateButton */
  color: white; /* Stellt sicher, dass die Textfarbe konsistent bleibt */
}

/* Spezieller Hover-Effekt für deleteButton */
.deleteButton button:hover {
  background-color: #ef7b7b; /* Spezifische Hover-Farbe für deleteButton */
}

/* Zusätzlicher Stil für spezielle Effekte (wenn benötigt) */
.updateButton::before, .updateButton::after,
.deleteButton button::before, .deleteButton button::after {
  /* Hier könnten Sie die speziellen ::before und ::after Stile einfügen */
  /* Beispiel: */
  content: "";
  display: block;
  position: absolute;
  /* Spezifische Stile für den dekorativen Effekt */
}
.setStatus {
  display: flex;
  flex-direction: column; /* Stellt sicher, dass das Label über den anderen Elementen steht */
  //align-items: flex-start; /* Richtet den Container am rechten Rand aus */
}
.status-update-container {
  display: flex;
  justify-content: flex-start;/* Richtet die Elemente nach rechts aus */
  align-items: center; /* Zentriert die Elemente vertikal */
  gap: 55%; /* Fügt einen Abstand zwischen den Elementen hinzu */
}
.button-container {
  display: flex;
  justify-content:flex-end; /* Ausrichtung des Buttons am Ende des Containers */
}



.selected-table {
  background-color: #575757; /* Hervorhebungsfarbe für ausgewählte Zeile */
  border-radius: 10px;
  font-size: larger;
}
.selected td {
  border-radius: 10px;
  //padding: 10px;
  background-color: #858484;
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
.update {
  background-color: #ff7300;
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
