<template>
  <br><br>

  <v-row>
    <v-col cols="1" md="12">

      <v-card class="general-census-form">

        <h2>General Census </h2>
        <br>

        <table>
          <!-- Location Information -->
          <tr>
            <th colspan="12">Location Information</th>
          </tr>
          <tr>
            <td><label for="barangay">Barangay</label></td>
            <td colspan="3"><input type="text" id="barangay" v-model="barangay" class="form-control"></td>
            <td><label for="zone">Zone</label></td>
            <td><input type="text" id="zone" v-model="zone" class="form-control"></td>
            <td><label for="dateOfInterview">Date of Interview</label></td>
            <td colspan="2"><input type="date" id="dateOfInterview" v-model="dateOfInterview" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="respondentName">Name of Respondent</label></td>
            <td colspan="3"><input type="text" id="respondentName" v-model="respondentName" class="form-control"></td>
            <td><label for="intervieweeName">Name of Interviewee</label></td>
            <td colspan="3"><input type="text" id="intervieweeName" v-model="intervieweeName" class="form-control"></td>
          </tr>

          <!-- Family Information -->
          <th colspan="12">Family Information</th>
          <tr>
            <td><label for="familyNumber">Family Number</label></td>
            <td><input type="text" id="familyNumber" v-model="familyNumber" class="form-control"></td>
            <td><label for="familyMemberName">Name of Family Member</label></td>
            <td colspan="3"><input type="text" id="familyMemberName" v-model="familyMemberName" class="form-control"></td>
            <td><label for="dateOfBirth">Date of Birth</label></td>
            <td><input type="date" id="dateOfBirth" v-model="dateOfBirth" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="age">Age</label></td>
            <td><input type="text" id="age" v-model="age" class="form-control"></td>
            <td><label for="sex">Sex</label></td>
            <td><input type="text" id="sex" v-model="sex" class="form-control"></td>
            <td><label for="religion">Religion</label></td>
            <td colspan="3"><input type="text" id="religion" v-model="religion" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="civilStatus">Civil Status</label></td>
            <td><input type="text" id="civilStatus" v-model="civilStatus" class="form-control"></td>
            <td><label for="educationalAttainment">Educational Attainment</label></td>
            <td colspan="2"><input type="text" id="educationalAttainment" v-model="educationalAttainment" class="form-control"></td>
            <td><label for="occupation">Occupation</label></td>
            <td colspan="2"><input type="text" id="occupation" v-model="occupation" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="pregnancyStatus">Pregnancy Status</label></td>
            <td><input type="text" id="pregnancyStatus" v-model="pregnancyStatus" class="form-control"></td>
            <td><label for="nursingMotherStatus">Nursing Mother Status</label></td>
            <td><input type="text" id="nursingMotherStatus" v-model="nursingMotherStatus" class="form-control"></td>
            <td><label for="familyPlanning">Practice of Family Planning</label></td>
            <td><input type="text" id="familyPlanning" v-model="familyPlanning" class="form-control"></td>
            <td><label for="disabilities">Presence of Disabilities</label></td>
            <td><input type="text" id="disabilities" v-model="disabilities" class="form-control"></td>
          </tr>

          <!-- Household Amenities and Infrastructure -->
          <tr>
            <th colspan="12">Household Amenities and Infrastructure</th>
          </tr>
          <tr>
            <td><label for="mainSourceOfWater">Main Source of Water</label></td>
            <td colspan="3"><input type="text" id="mainSourceOfWater" v-model="mainSourceOfWater" class="form-control"></td>
            <td><label for="garbageDisposal">Garbage Disposal</label></td>
            <td colspan="3"><input type="text" id="garbageDisposal" v-model="garbageDisposal" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="toiletFacility">Toilet Facility</label></td>
            <td colspan="3"><input type="text" id="toiletFacility" v-model="toiletFacility" class="form-control"></td>
            <td><label for="tenureStatus">Tenure Status of Housing Unit</label></td>
            <td colspan="3"><input type="text" id="tenureStatus" v-model="tenureStatus" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="presenceOfGarden">Presence of Vegetable Garden, Poultry Livestock, and Fishpond</label></td>
            <td colspan="3"><input type="text" id="presenceOfGarden" v-model="presenceOfGarden" class="form-control"></td>
            <td><label for="accessToElectricity">Access to Electricity</label></td>
            <td colspan="3"><input type="text" id="accessToElectricity" v-model="accessToElectricity" class="form-control"></td>
          </tr>
          <tr>
            <td><label for="constructionMaterials">Construction Materials Used in the House</label></td>
            <td colspan="2"><input type="text" id="constructionMaterials" v-model="constructionMaterials" class="form-control"></td>
            <td><label for="meansOfCommunication">Means of Communication</label></td>
            <td colspan="2"><input type="text" id="meansOfCommunication" v-model="meansOfCommunication" class="form-control"></td>
            <td><label for="ofwStatus">Overseas Filipino Worker (OFW) Status</label></td>
            <td colspan="2"><input type="text" id="ofwStatus" v-model="ofwStatus" class="form-control"></td>
          </tr>

          <!-- Agricultural Profile -->
          <tr>
            <th colspan="12">Agricultural Profile</th>
          </tr>
          <tr>
            <td><label for="plantationCrops">Plantation Crops</label></td>
            <td colspan="3"><input type="text" id="plantationCrops" v-model="plantationCrops" class="form-control"></td>
            <td><label for="farmMachineries">Farm Machineries</label></td>
            <td colspan="3"><input type="text" id="farmMachineries" v-model="farmMachineries" class="form-control"></td>
          </tr>

          <!-- Economic Indicators -->
          <tr>
            <th colspan="10">Economic Indicators</th>
          </tr>
          <tr>
            <td><label for="povertyIncidence">Poverty Incidence (Monthly Family Income)</label></td>
            <td colspan="2"><input type="text" id="povertyIncidence" v-model="povertyIncidence" class="form-control"></td>
            <td><label for="foodThreshold">Food Threshold/Incidence</label></td>
            <td colspan="2"><input type="text" id="foodThreshold" v-model="foodThreshold" class="form-control"></td>
            <td><label for="livelihoods">Livelihoods</label></td>
            <td colspan="2"><input type="text" id="livelihoods" v-model="livelihoods" class="form-control"></td>
          </tr>
        </table>
      </v-card>
    </v-col>
  </v-row>
  <br>


  <v-container>
  <!-- General Census Form -->
  <v-card>
    
    <v-card-text>
      <!-- Existing Census Form Fields -->
      <table>
        <!-- Family Members Table -->
        <tr>
          <th colspan="13">Family Members</th>
        </tr>
        <tr>
          <td><strong>Name</strong></td>
          <td><strong>Marital Status</strong></td>
          <td><strong>Another Household?</strong></td> <!-- New column -->
          <td><strong>Original/New</strong></td> <!-- Origin/New column -->
          <td><strong>Relationship to Head</strong></td> <!-- Relationship to Head column -->
          <td><strong>Actions</strong></td> <!-- Actions column -->
        </tr>
        <tr v-for="member in familyMembers" :key="member.name">
          <td>{{ member.name }}</td>
          <td>{{ member.maritalStatus }}</td>
          <td>{{ member.anotherHousehold ? 'Yes' : 'No' }}</td> <!-- Check if member has another household -->
          <td>{{ member.originFamilyRecord ? 'Original  Family' : 'New Member' }}</td> <!-- Display 'Orig' if origin family record, else display 'New' -->
          <td>{{ member.relationshipToHead }}</td> <!-- Display relationship to head -->
          <td>
            <!-- Add link button to view resident components -->
            <v-btn color="primary" text @click="viewResidentComponents(member)">View</v-btn>
          </td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</v-container>


</template>
<script>
export default {
  data() {
  return {
    dialog: false,
    familyMembers: [
      { 
        name: 'Juan Dela Cruz',
        maritalStatus: 'Married',
        anotherHousehold: true,
        originFamilyRecord: 'Original',
        relationshipToHead: 'Son' // Relationship to head
      },
      { 
        name: 'Maria Clara',
        maritalStatus: 'Single',
        anotherHousehold: false,
        originFamilyRecord: 'Original',
        relationshipToHead: 'Daughter' // Relationship to head
      },
      // Add more dummy data as needed
    ],
    familyMemberHeaders: [
      { text: 'Name', value: 'name' },
      { text: 'Marital Status', value: 'maritalStatus' },
      { text: 'Another Household', value: 'anotherHousehold' }, // Added header for another household
    
      { text: 'Relationship to Head', value: 'relationshipToHead' }, // Added header for relationship to head
      // Add more headers as needed
    ],
    editedItem: {},
    selectedYear: null,
    startYear: 2000, // Change as needed
    endYear: new Date().getFullYear(), // Current year
    years: [],
    // General Census Form Fields
    barangay: 'Barangay Bonifacio San Fernando Camarines Sur',
    zone: '',
    dateOfInterview: '',
    respondentName: '',
    intervieweeName: '',
    // Family Information Fields
    familyNumber: '',
    familyMemberName: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    religion: '',
    civilStatus: '',
    educationalAttainment: '',
    occupation: '',
    pregnancyStatus: '',
    nursingMotherStatus: '',
    familyPlanning: '',
    disabilities: '',
    // Family Tree
    familyMemberPosition: '',
    // Household Amenities and Infrastructure Fields
    mainSourceOfWater: '',
    garbageDisposal: '',
    toiletFacility: '',
    tenureStatus: '',
    presenceOfGarden: '',
    accessToElectricity: '',
    constructionMaterials: '',
    meansOfCommunication: '',
    ofwStatus: '',
    // Agricultural Profile Fields
    plantationCrops: '',
    farmMachineries: '',
    // Economic Indicators Fields
    povertyIncidence: '',
    foodThreshold: '',
    livelihoods: '',
  };
},

  mounted() {
    this.generateYears();
  },
  methods: {
    generateYears() {
      for (let year = this.startYear; year <= this.endYear; year++) {
        this.years.push(year);
      }
    },
    close() {
      this.dialog = false;
      this.editedItem = {};
    },
    save() {
      // Save family member data
      // Add your save logic here
      this.familyMembers.push(Object.assign({}, this.editedItem));
      this.close();
    },
  },
};
</script>



<style scoped>
.general-census-form {
  max-width: 1200px;
  margin: auto;
  padding: 30px;
  box-shadow: 0px 0px 5px #3a53a5;
  justify-content: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #3a53a5;
  color: #fff;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="date"] {
  width: calc(100% - 6px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  width: calc(100% - 6px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.v-btn {
  background-color: #3a53a5 !important;
  color: #fff !important;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.v-btn:hover {
  background-color: #3a53a5 !important;
}

.submit-button {
  text-align: right;
  margin-top: 1px;
}

.confirmation {
  width: calc(100% - 6px);
  padding: 30px;
  font-size: 16px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hr {
  width: calc(100% - 6px);
}

.hr hr {
  border: none;
  border-top: 1px solid #ccc;
}

.header {
  background-color: #3a53a5;
  color: white;
  box-shadow: 0px 0px 10px #c5c8d1e5;
}
</style>
