<template>
  <v-container fluid class="office-layout">
    <!-- Header -->
    <v-row>
  <v-col cols="12">
    <v-card class="elevation-2 header">
      <!-- Header Content -->

      <v-card-text class="d-flex flex-column align-center">
        <h1 class="text-h4 custom-black-text">General Census | Data Table</h1>

        <div v-if="highestPopulationZone" class="zone-stats">
          Highest Population Zone: {{ highestPopulationZone.zone }} ({{
            highestPopulationZone.percentage
          }}%)
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>

    <!-- Main Content Area -->
    <v-row>
      <v-container fluid>
        <!-- Data Table Section from database -->
        <v-card>
          <v-card-text>
             <!-- Search, Year Filter, and Zone Filter in One Row -->
<v-row>
  <!-- Search Bar -->
  <v-col cols="12" md="9">
    <v-text-field
      v-model="search"
      label="Search"
      outlined
      dense
      solo
      clearable
      class="mb-4"
    ></v-text-field>
  </v-col>

  <!-- Year Filter -->
  <v-col cols="12" md="2">
    <v-select
      v-model="selectedYear"
      :items="yearOptions"
      label="Select Year"
      outlined
      class="mb-4"
    ></v-select>
  </v-col>

  <!-- Zone Filter -->
  <v-col cols="12" md="1">
    <v-select
      v-model="selectedZone"
      :items="zoneOptions"
      label="Zone"
      outlined
      class="mb-4"
    ></v-select>
  </v-col>
</v-row>


            <div
              style="
                max-height: 1000px;
                overflow: auto;
                box-shadow: 0px 0px 10px rgba(58, 83, 165, 1);
                padding: 10px;
              "
            >
              <table id="dataTable" class="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Barangay</th>
                    <th>Zone</th>
                    <th>Date of Interview</th>
                    <th>Respondent Name</th>
                    <th>Family Number</th>
                    <th>Family Member Name</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Religion</th>
                    <th>Civil Status</th>
                    <th>Educational Attainment</th>
                    <th>Occupation</th>
                    <th>Pregnancy Status</th>
                    <th>Nursing Mother Status</th>
                    <th>Family Planning Practice</th>
                    <th>Presence of Disabilities</th>
                    <th>Main Water Source</th>
                    <th>Garbage Disposal</th>
                    <th>Toilet Facility</th>
                    <th>Tenure Status</th>
                    <th>Vegetable Garden Presence</th>
                    <th>Poultry Livestock Presence</th>
                    <th>Fishpond Presence</th>
                    <th>Access to Electricity</th>
                    <th>House Construction Materials</th>
                    <th>Communication Means</th>
                    <th>OFW Status</th>
                    <th>Plantation Crops</th>
                    <th>Farm Machineries</th>
                    <th>Poverty Incidence</th>
                    <th>Food Threshold</th>
                    <th>Livelihoods</th>
                    <th>Confirmation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in generalcensus" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.barangay }}</td>
                    <td>{{ item.zone }}</td>
                    <td>{{ item.dateOfInterview }}</td>
                    <td>{{ item.respondentName }}</td>
                    <!-- Render other data fields similarly -->
                    <td>{{ item.familyNumber }}</td>
                    <td>{{ item.familyMemberName }}</td>
                    <td>{{ item.dateOfBirth }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.sex }}</td>
                    <td>{{ item.religion }}</td>
                    <td>{{ item.civilStatus }}</td>
                    <td>{{ item.educationalAttainment }}</td>
                    <td>{{ item.occupation }}</td>
                    <td>{{ item.pregnancyStatus }}</td>
                    <td>{{ item.nursingMotherStatus }}</td>
                    <td>{{ item.familyPlanningPractice }}</td>
                    <td>{{ item.presenceOfDisabilities }}</td>
                    <td>{{ item.mainWaterSource }}</td>
                    <td>{{ item.garbageDisposal }}</td>
                    <td>{{ item.toiletFacility }}</td>
                    <td>{{ item.tenureStatus }}</td>
                    <td>{{ item.vegetableGardenPresence }}</td>
                    <td>{{ item.poultryLivestockPresence }}</td>
                    <td>{{ item.fishpondPresence }}</td>
                    <td>{{ item.accessToElectricity }}</td>
                    <td>{{ item.houseConstructionMaterials }}</td>
                    <td>{{ item.communicationMeans }}</td>
                    <td>{{ item.ofwStatus }}</td>
                    <td>{{ item.plantationCrops }}</td>
                    <td>{{ item.farmMachineries }}</td>
                    <td>{{ item.povertyIncidence }}</td>
                    <td>{{ item.foodThreshold }}</td>
                    <td>{{ item.livelihoods }}</td>
                    <td>{{ item.confirmation }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
  
  <!-- Sidebar Area -->
 
     <!-- Sidebar Content -->
<v-card-text>
  <v-row>
    <v-col cols="4">
      <v-btn
        color="indigo darken-2"
        block
        @click="handleButtonCreateHousehold"
        class="action-button"
      >
        <v-icon left>mdi-plus</v-icon>
        <span class="icon-text-gap">Create</span>
      </v-btn>
    </v-col>

    <v-col cols="4">
      <v-btn
        color="blue lighten-2"
        block
        @click="handleButtonDataPreview"
        class="action-button"
      >
        <v-icon left>mdi-eye</v-icon>
        <span class="icon-text-gap">Preview</span>
      </v-btn>
    </v-col>
    
    <v-col cols="4">
      <v-btn
        color="indigo darken-2"
        block
        @click="handleButtonArchive"
        class="action-button"
      >
        <v-icon left>mdi-archive</v-icon>
        <span class="icon-text-gap">Archive</span>
      </v-btn>
    </v-col>


    
  </v-row>
</v-card-text>

  

  <!-- V-Card Data Preview -->
  <transition name="fade">
    <v-card v-if="isDataPreviewVisible" class="data-preview">
      <!-- Close button at the top left corner with an icon -->
      <v-btn
        icon
        @click="closeDataPreview"
        style="position: absolute; top: 10px; left: 10px"
      >
        <v-icon color="#3a53a5">mdi-close</v-icon>
        <!-- Icon for close -->
       
      </v-btn>
      <DataPreview
        :data="selectedData"
        v-if="isDataPreviewVisible"
        @close="closeDataPreview"
      />
      <v-card-text>
        <!-- Display selected data here -->
        <div v-for="(value, key) in selectedData" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </v-card-text>
      <v-toolbar flat>
        <v-toolbar-title color="indigo darken-2"> </v-toolbar-title>
        <v-card-actions>
          <v-card class="align-buttons">
            <v-row>
              <v-col cols="1" md="4">
                <v-btn class="outlined-button" @click="showAddForm">
                  <v-icon left>mdi-plus</v-icon> Add
                </v-btn>
              </v-col>
              <v-col cols="1" md="4">
                <v-btn class="outlined-button" @click="handleButtonEdit">
                  <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
              </v-col>
              <v-col cols="1" md="3">
                <v-btn class="outlined-button" @click="showDelete">
                  <v-icon left>mdi-delete</v-icon> Delete
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-card-actions>
      </v-toolbar>
    </v-card>
  </transition>

  <!-- V-Card for Add Form with flashing effect -->
  <v-card-actions>
    <transition name="fade">
      <div v-if="isAddFormVisible" class="add-overlay">
        <div class="add-data">
          <!-- Close button aligned to the left side with an icon -->
          <v-btn icon color="primary" @click="closeAddForm">
            <v-icon color="#3aa553">mdi-close</v-icon>
            <!-- Icon for close filled with color -->
          </v-btn>
         
          <AddForm
            :data="selectedData"
            v-if="isAddFormVisible"
            @close="closeAddForm"
          />
          <v-card-text>
            <!-- Display selected data here -->
            <div v-for="(value, key) in selectedData" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </div>
          </v-card-text>
        </div>
      </div>
    </transition>
  </v-card-actions>

  <!-- V-Card for Add Form with flashing effect -->
  <v-card-actions>
    <transition name="fade">
      <div v-if="isEditFormVisible" class="add-overlay">
        <div class="add-data">
          <!-- Close button aligned to the left side with an icon -->
          <v-btn icon color="primary" @click="closeEditForm">
            <v-icon color="#a53a3a">mdi-close</v-icon>
            <!-- Icon for close filled with color -->
          </v-btn>
           
          <EditForm
            :data="selectedData"
            v-if="isEditFormVisible"
            @close="closeEditForm"
          />
          <v-card-text>
            <!-- Display selected data here -->
            <div v-for="(value, key) in selectedData" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </div>
          </v-card-text>
        </div>
      </div>
    </transition>
  </v-card-actions>

  <!-- V-Card for Archive Data with flashing effect -->
  <v-card-actions>
    <transition name="fade">
      <div v-if="isArchiveDataVisible" class="archive-overlay">
        <div class="archive-data">
          <!-- Close button aligned to the left side with an icon -->
          <v-btn icon color="primary" @click="closeArchiveData">
            <v-icon color="#3a53a5">mdi-close</v-icon>
            <!-- Icon for close filled with color -->
          </v-btn>
           
          <ArchiveData
            :data="selectedData"
            v-if="isArchiveDataVisible"
            @close="closeArchiveData"
          />
          <v-card-text>
            <!-- Display selected data here -->
            <div v-for="(value, key) in selectedData" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </div>
          </v-card-text>
        </div>
      </div>
    </transition>
  </v-card-actions>

  <div>
    <ul>
      <li v-for="item in generalcensus" :key="item.id">{{ item.field }}</li>
    </ul>
  </div>

  <!-- V-Card for Create Household with flashing effect -->
  <v-card-actions>
    <transition name="fade">
      <div v-if="isCreateHouseholdVisible" class="household-overlay">
        <div class="household-data">
          <!-- Close button aligned to the left side with an icon -->
          <v-btn icon color="primary" @click="closeCreateHousehold">
            <v-icon color="#3a53a5">mdi-close</v-icon>
            <!-- Icon for close filled with color -->
          </v-btn>
        
          <CreateHousehold
            :data="selectedData"
            v-if="isCreateHouseholdVisible"
            @close="closeCreateHousehold"
          />
          <v-card-text>
            <!-- Display selected data here -->
            <div v-for="(value, key) in selectedData" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </div>
          </v-card-text>
        </div>
      </div>
    </transition>
  </v-card-actions>
</template>

<script>
import axios from "axios";
import $ from "jquery"; // Import jQuery

import AddForm from "@/components/Household/AddForm.vue";
import EditForm from "@/components/Household/EditForm.vue";
import ArchiveData from "@/components/Household/ArchiveData.vue";
import DataPreview from "@/components/Household/DataPreview.vue";
import CreateHousehold from "@/components/Household/CreateHousehold.vue";
import DatabaseConnection from "@/components/DatabaseConnection.vue";

export default {
  components: {
    AddForm,
    EditForm,
    ArchiveData,
    DataPreview,
    CreateHousehold,
    DatabaseConnection,
  },
  data() {
    return {
      generalcensus: [], // Initialize an empty array to store fetched data
      zoneOptions: ["1", "2", "3", "4"], // Example zone options
      selectedYear: "",
      yearOptions: [2021, 2022, 2023, 2024], // Example year options
      headers: [
        { text: "ID", value: "id" },
        { text: "Barangay", value: "barangay" },
        { text: "Zone", value: "zone" },
        { text: "Date of Interview", value: "dateOfInterview" },
        { text: "Respondent Name", value: "respondentName" },
        { text: "Interviewee Name", value: "intervieweeName" },
        { text: "Family Number", value: "familyNumber" },
        { text: "Family Member Name", value: "familyMemberName" },
        { text: "Date of Birth", value: "dateOfBirth" },
        { text: "Age", value: "age" },
        { text: "Sex", value: "sex" },
        { text: "Religion", value: "religion" },
        { text: "Civil Status", value: "civilStatus" },
        { text: "Educational Attainment", value: "educationalAttainment" },
        { text: "Occupation", value: "occupation" },
        { text: "Pregnancy Status", value: "pregnancyStatus" },
        { text: "Nursing Mother Status", value: "nursingMotherStatus" },
        { text: "Family Planning Practice", value: "familyPlanningPractice" },
        { text: "Presence of Disabilities", value: "presenceOfDisabilities" },
        { text: "Main Water Source", value: "mainWaterSource" },
        { text: "Garbage Disposal", value: "garbageDisposal" },
        { text: "Toilet Facility", value: "toiletFacility" },
        { text: "Tenure Status", value: "tenureStatus" },
        { text: "Vegetable Garden Presence", value: "vegetableGardenPresence" },
        {
          text: "Poultry Livestock Presence",
          value: "poultryLivestockPresence",
        },
        { text: "Fishpond Presence", value: "fishpondPresence" },
        { text: "Access to Electricity", value: "accessToElectricity" },
        {
          text: "House Construction Materials",
          value: "houseConstructionMaterials",
        },
        { text: "Communication Means", value: "communicationMeans" },
        { text: "OFW Status", value: "ofwStatus" },
        { text: "Plantation Crops", value: "plantationCrops" },
        { text: "Farm Machineries", value: "farmMachineries" },
        { text: "Poverty Incidence", value: "povertyIncidence" },
        { text: "Food Threshold", value: "foodThreshold" },
        { text: "Livelihoods", value: "livelihoods" },
        { text: "Confirmation", value: "confirmation" },
      ],
      selectedZone: "All",
      search: "",
      selectedData: {},
      isDataPreviewVisible: false,
      isAddFormVisible: false,
      isEditFormVisible: false,
      isArchiveDataVisible: false,
      isCreateHouseholdVisible: false,
      highestPopulationZone: { zone: "", percentage: 0 },
    };
  },
  computed: {
    yearOptions() {
      return [
        "All",
        "1980",
        "1981",
        "1982",
        "1983",
        "1984",
        "1985",
        "1986",
        "1987",
        "1988",
        "1989",
        "1990",
        "1991",
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ];
    },

    zoneOptions() {
      return ["All", "1", "2", "3", "4", "5", "6", "7"];
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/api/data");
        this.data = response.data;
        // Initialize DataTable after data is fetched
        $(document).ready(function () {
          $("#dataTable").DataTable();
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    },

    searchItems() {
      return this.generalcensus.filter((item) => {
        const matchesSearch = Object.values(item).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        );
        return matchesSearch;
      });
    },

    showHeader(key) {
      return this.headers.some((header) => header.value === key);
    },

    showAddForm() {
      this.isAddFormVisible = true;
    },
    closeAddForm() {
      this.isAddFormVisible = false;
    },
    handleButtonAdd() {
      this.showAddForm();
    },
    showEditForm() {
      this.isEditFormVisible = true;
    },
    closeEditForm() {
      this.isEditFormVisible = false;
    },
    handleButtonEdit() {
      this.showEditForm();
    },
    showArchiveData() {
      this.isArchiveDataVisible = true;
    },
    closeArchiveData() {
      this.isArchiveDataVisible = false;
    },
    handleButtonArchive() {
      this.showArchiveData();
    },
    showCreateHousehold() {
      this.isCreateHouseholdVisible = true;
    },
    closeCreateHousehold() {
      this.isCreateHouseholdVisible = false;
    },
    handleButtonCreateHousehold() {
      this.showCreateHousehold();
    },
    showDataPreview() {
      this.isDataPreviewVisible = true;
    },
    closeDataPreview() {
      this.isDataPreviewVisible = false;
    },
    handleButtonDataPreview() {
      this.showDataPreview();
    },
    handleButtonExport() {
      // Implement export logic
      console.log("Export button clicked");
    },
    handleButtonImport() {
      // Implement import logic
      console.log("Import button clicked");
    },
    handleButtonPrint() {
      // Implement print logic
      console.log("Print button clicked");
    },
    handleButtonDelete() {
      // Logic for delete button
      if (this.selectedData) {
        console.log(
          "Delete button clicked with selected data:",
          this.selectedData
        );
      } else {
        console.log("Delete button clicked without selected data");
      }
    },
    selectZone(zone) {
      this.selectedZone = zone;
    },

    fetchData() {
      let url = "http://localhost/PHP/generalcensus_display.php";
      if (this.selectedZone !== "All") {
        url += `?zone=${this.selectedZone}`;
      }
      axios
        .get(url)
        .then((response) => {
          this.generalcensus = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  filteredHousehold() {
      return this.generalcensus.filter((item) => {
        const matchesSearch = this.search
          ? Object.values(item).some((value) =>
              String(value).toLowerCase().includes(this.search.toLowerCase())
            )
          : true;

        const matchesYear =
          this.selectedYear && this.selectedYear !== "All"
            ? new Date(item.dateOfInterview).getFullYear() === Number(this.selectedYear)
            : true;

        const matchesZone =
          this.selectedZone && this.selectedZone !== "All"
            ? item.zone === this.selectedZone
            : true;

        return matchesSearch && matchesYear && matchesZone;
      });
    },

  highestPopulationZone() {
    if (!this.generalcensus.length) return null;

    const zoneCounts = this.generalcensus.reduce((counts, item) => {
      counts[item.zone] = (counts[item.zone] || 0) + 1;
      return counts;
    }, {});

    const highestZone = Object.keys(zoneCounts).reduce((highest, zone) =>
      zoneCounts[zone] > zoneCounts[highest] ? zone : highest
    );

    const percentage = (
      (zoneCounts[highestZone] / this.generalcensus.length) *
      100
    ).toFixed(2);

    return { zone: highestZone, percentage };
  },

  mounted() {
    this.fetchData(); // Fetch data initially

    this.$watch("selectedZone", this.fetchData);
    // Fetch data from your API endpoint when the component is mounted
    axios
      .get("http://localhost/PHP/generalcensus_display.php") // Update the URL to match your API endpoint
      .then((response) => {
        this.generalcensus = response.data; // Update the generalcensus data with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>

<style scoped>
.office-layout {
 
  overflow: hidden; /* Prevent scrolling */
  scroll-padding-bottom: 0px; /* Adjust the value as needed */
}

.header {
  background-color: #3a53a5;
  color: white;
}
.main-content {
  min-height: 0px;
}
.sidebar {
  min-height: 400px;
}
.selected-data {
  margin-top: 1px;
}
.zone-stats {
  margin-top: 1px;
}
.action-button {
  margin-top: 5px;
}
.archive-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.archive-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #3a53a5;
}

z .edit-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.custom-black-text {
  color: #f9f9f9; /* Custom black color */
}

.edit-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  background-color: white; /* Ensure the modal has a visible background */
  max-height: 80%; /* Adjust as needed */
  width: 80%; /* Adjust as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
}

.align-center {
  display: flex;
  align-items: center;
}

.add-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.add-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  background-color: white; /* Ensure the modal has a visible background */
  max-height: 80%; /* Adjust as needed */
  width: 80%; /* Adjust as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
}

.household-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.household-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  background-color: white; /* Ensure the modal has a visible background */
  max-height: 80%; /* Adjust as needed */
  width: 80%; /* Adjust as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
}

.action-button {
  background-color: #3a53a5;
  color: white;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  padding: px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.action-button:hover {
  background-color: #3a53a5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 1em 0;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.styled-table tbody tr:hover {
  background-color: #ddd;
}

 
 
.zone-stats {
  font-size: 1.2rem;
  font-weight: bold; 

}

.v-card {
  margin: 20px;
}


</style>
