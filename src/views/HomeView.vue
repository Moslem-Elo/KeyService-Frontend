<template>

  <div>

        <!-- 24h Notdienst Button -->
        <div class="emergency-button">
            <button>
                <span style="color: white;">008-5155648</span>
                <br />
                <span style="font-size: 12px;">24h Notdienst</span>
            </button>
        </div>

        <div class="row">
            <div class="column">
                <img src="https://cdn.test.de/file/image/e5/61/67f35fda-2322-4c7d-97a2-15fcc159c2fe-web/5989207_schluesseldienst-a2304;a3-2.jpg" alt="Snow" style="width:100%">
            </div>
            <div class="column">
                <img src="https://www.24std-schluesselnotdienst.de/images/schluesseldienst.jpg" alt="Forest" style="width:100%">
            </div>
            <div class="column">
                <img src="https://sp-bochum.de/bilder/schluesseldienst-bochum-innenstadt.jpg" alt="Mountains" style="width:100%">
            </div>
        </div>

        <!-- Bereich für zusätzliche Informationen -->
        <div class="additional-info">
            <h3 style="color: white;">Dienstleistungen</h3>
          <div class="info-text">
            <p style="color: #ccc;">Hier können Sie weitere Informationen zu unseren Dienstleistungen, Preisen, usw. zur Kenntnis nehmen.</p>
          </div>

            <!-- Tabelle für Dienstleistungen -->
            <div class="search-container">
                <input type="text" id="myInput" @input="filterTable" placeholder="Dienstleistung suchen.." title="Geben Sie eine Dienstleistung ein">
            </div>

            <table id="myTable">
                <tr class="header">
                    <th style="width:60%;">Dienstleistung</th>
                    <th style="width:40%;">Preis inkl. Mwst.</th>
                </tr>
                <tr v-for="service in services" :key="service.id">
                    <td>{{ service.name }}</td>
                    <td>{{ service.price }}</td>
                </tr>
            </table>
        </div>

        <!-- Impressum Bereich -->
        <div class="imprint">
            <h3 style="color: white;">Impressum</h3>
            <p style="color: #ccc;">Schlüsseldienst gmbH</p>
            <p>Vorname, Nachname: Max Mustermann</p>
            <p>Adresse, PLZ: Musterstr.12, 12345</p>
            <p>Telefon: 0154826292</p>
            <p>E-Mail: muster@email.de</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
    { id: 1, name: 'Service 1', price: '20€' },
    { id: 2, name: 'Service 2', price: '30€' },
    { id: 3, name: 'Service 3', price: '25€' },

]);

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
</script>

<style scoped>
.info-text p {
  text-align: left;
  margin-left: 10px; /* Optional: Fügt einen linken Abstand hinzu */
}

.search-container {
    margin-bottom: 20px;
    text-align: left;
    left: 10px;
}

#myInput {
    width: 80%;
    padding: 12px;
    margin: 8px 0;
    box-sizing: border-box;
}

#myTable th, #myTable td {
}

* {
    box-sizing: border-box;
}

.column {
    float: left;
    width: 33.33%;
    padding: 5px;
}

h1, p {
    text-align: center;
    color: white;
    font-weight: bold;
}

.emergency-button {
  position: fixed;
  top: 10px;
  right: 10px;
}

button {
  background-color: #ff3b3b;
  color: white;
  padding: 2px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
/* Media Query für Bildschirmbreiten bis 600px */
@media screen and (max-width: 600px) {
  .emergency-button {
    font-size: 7px;
  }
}

/* Media Query für Bildschirmbreiten von 601px bis 900px */
@media screen and (min-width: 601px) and (max-width: 900px) {
  .emergency-button {
    font-size: 6px;
  }
}

/* Media Query für Bildschirmbreiten ab 901px */
@media screen and (min-width: 901px) {
  .emergency-button {
    font-size: 12px;
  }
}
.row::after {
    content: "";
    clear: both;
    display: table;
}

.additional-info {
    text-align: left;
    margin-top: 20px;
    font-weight: bold;
}

.additional-info h3 {
    color: white;
    font-weight: bold;
}

.additional-info p {
    color: #ccc;
}

.imprint {
    text-align: center;
    margin-top: 20px;

}

.imprint h2 {
    color: white;
}

.imprint p {
    color: #ccc;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script setup>
</script>
