<template>
  <v-row class="mt-1 d-flex justify-space-between">
    <v-col cols="4" class="d-flex ga-3 ml-8">
      <v-select width="95px" style="width: 100px;" v-model="CategoryName" label="Category" density="compact"
        :items="['All', ' Age', 'Gender', 'Zone', 'Civil Status']" variant="outlined"></v-select>

      <v-select width="500" style="width: 100px;" v-model="Group" label="Group" density="compact"
        :items="filteredGroups" variant="outlined"></v-select>

      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn size="large" v-bind="props" flat>

            <v-icon icon="mdi-menu" color="#1A237E" size="x-large">
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="residentDialog = true" class="d-flex">
            <v-icon icon="mdi-plus" color="#1A237E" class="mr-3"></v-icon>
            Add Resident
          </v-list-item>

          <v-list-item class="d-flex" @click="printContent()">
            <v-icon icon="mdi-printer" color="#1A237E" class="mr-3"></v-icon>
            Print
          </v-list-item>

        </v-list>
      </v-menu>

    </v-col>
    <!-- Dialog for Resident -->
    <v-dialog v-model="residentDialog" width="1000" scrollable>
      <v-card class="px-3 bg-grey-lighten-4" max-width="1000" max-height="900" prepend-icon="mdi-account"
        title="Add Resident">

        <v-row class="ms-1 mt-3">
          <div class="bg-indigo-darken-3 w-100 mr-3">
            <h2 class="mx-3">Personal Information</h2>
          </div>
        </v-row>
        <!-- Personal Info -->

        <v-row>
          <v-col class="d-flex mt-3">
            <v-text-field v-model="resident.firstName" label="First name" variant="outlined"
              :rules="[rules.required, rules.minLength, rules.lettersOnly]"></v-text-field>
            <v-text-field v-model="resident.middleName" class="ms-3" label="Middle name" variant="outlined"
              :rules="[rules.required, rules.minLength, rules.lettersOnly]"></v-text-field>
            <v-text-field v-model="resident.lastName" class="ms-3" label="Last name" variant="outlined"
              :rules="[rules.required, rules.minLength, rules.lettersOnly]"></v-text-field>
            <v-text-field v-model="resident.suffix" class="ms-3" style="width: 10px;" label="Suffix"
              variant="outlined"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex">
            <v-select v-model="resident.gender" width="500" style="width: 85px;" label="Gender"
              :items="['Female', 'Male']" variant="outlined" :rules="[rules.required]"></v-select>
            <v-text-field v-model="resident.birthDate" class="ms-3 shrink" style="width: 85px;" label="Birth Date"
              variant="outlined" type="date" :rules="[rules.required, rules.birthDate]" clearable></v-text-field>
            <v-text-field v-model="resident.age" :value="calculateAge(resident.birthDate)" focused  class="ms-3"
              label="Age" variant="outlined" readonly></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex">
            <v-text-field v-model="resident.nationality" label="Nationality" variant="outlined"
              :rules="[rules.required, rules.minLength, rules.lettersOnly]"></v-text-field>
            <v-text-field v-model="resident.religion" class="ms-3" label="Religion" variant="outlined"
              :rules="[rules.required, rules.minLength, rules.lettersOnly]"></v-text-field>
            <v-text-field v-model="resident.email" class="ms-3" style="width: 85px;" label="Email" variant="outlined"
              suffix="@gmail.com" :rules="[rules.required]"></v-text-field>
          </v-col>
        </v-row>


        <v-row>
          <v-col class="d-flex">
            <v-select v-model="resident.civStat" width="500" style="width: 100px;" label="Civil Status"
              :items="['Single', 'Married', 'Annulled', 'Widowed', 'Live-in']" variant="outlined"
              :rules="[rules.required]"></v-select>
            <v-select v-model="resident.votStat" width="500" class="ms-3" style="width: 100px;" label="Voter Status"
              :items="['Voter', 'Not Voter Yet']" variant="outlined" :rules="[rules.required]"></v-select>
            <v-select v-model="resident.zone" width="500" class="ms-3" style="width: 100px;" label="Zone"
              :items="['1', '2', '3', '4', '5', '6', '7']" variant="outlined" :rules="[rules.required]"></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model="resident.contactNum" label="Phone Number" style="width: 310px;" variant="outlined"
              prefix="+63" counter="10" maxlength="10"
              :rules="[rules.required, rules.maxLength, rules.phoneNum, rules.numeric]">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row class="ms-1">
          <div class="bg-indigo-darken-3 w-100 mr-3">
            <h2 class="mx-3">Household Information</h2>
          </div>
        </v-row>
        <!-- Household Info -->

        <v-row>
          <v-col class="d-flex">
            <v-select v-model="resident.hhHead" label="Household Head" variant="outlined"
              :rules="rules.required"></v-select>
            <v-text-field v-model="resident.hhSize" class="ms-3" label="Household Size" variant="outlined"
              readonly></v-text-field>
            <v-text-field v-model="resident.relToHead" class="ms-3" label="Relation to Head" variant="outlined"
              readonly></v-text-field>
          </v-col>
        </v-row>

        <template v-slot:actions>
          <v-btn class="my-5 bg-grey-lighten-4 " size="large" @click="residentDialog = false">
            Cancel
          </v-btn>

          <v-btn class="my-5 bg-green-darken-1 px-5" size="large" @click="submitClicked" type="submit">
            Submit
          </v-btn>

        </template>

        <v-dialog v-model="resident.successDialog" width="500">
          <v-card class="px-3 bg-grey-lighten-4" width="500" height="250" prepend-icon="mdi-success" title="Success">
            <v-card-text class="text-center mt-3">Successfully added <p class=" font-weight-medium text-h5 "
                color="red-darken-3 "> {{ firstName }} </p></v-card-text>

          </v-card>

        </v-dialog>
      </v-card>
    </v-dialog>

    <v-col cols="3">
      <v-text-field class=" mt-0 mr-5" v-model="search" label="Search" density="comfortable "
        append-inner-icon="mdi-magnify" variant="solo" single-line clearable></v-text-field>
    </v-col>

  </v-row>
  <v-row>
    <v-col cols="9">
      <div class="ml-7">
        <v-table class="mb-10" height="70vh" max-height="700px" fixed-header search="search" hover>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Age
              </th>
              <th class="text-left">
                Gender
              </th>
              <th class="text-left">
                Nationality
              </th>
              <th class="text-center">
                Civil Status
              </th>
              <th class="text-center">
                Contact Number
              </th>
              <th class="text-left">
                Religion
              </th>
              <th class="text-center">
                Zone
              </th>
              <th class="text-center">
                Household
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.resident_id" @click="onRowClick(item)">
              <!-- <td>{{ convertToSentenceCase(item.first_name) }} {{ convertToSentenceCase(item.middle_name) }} {{
        convertToSentenceCase(item.last_name) }}</td> -->
              <td>{{ item.last_name }}, {{ item.first_name }} {{ item.middle_name.charAt(0).toUpperCase() }}. </td>
              <td>{{ calculateAge(item.birth_date) }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ convertToSentenceCase(item.nationality) }}</td>
              <td>{{ item.civil_status }}</td>
              <td class="text-center">0{{ item.phone_num }}</td>
              <td>{{ convertToSentenceCase(item.religion) }}</td>
              <td class="text-center">{{ item.zone }}</td>
              <td class="text-center">{{ item.household_id }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-col>
    <v-col cols="3">
      <v-card class="mr-5 bg-grey-lighten-3 border-e-thin border-s-thin" elevation="0">
        <p class="text-center text-h5 py-3" style="background-color: #3a53a5; color: white;">Resident Info</p>

        <v-card max-height="700" class="overflow-y-scroll " height="365px" v-if="selectedItem">
          <div class="mt-4 ">
            <!-- Name -->
            <p class="font-weight-light  ml-3  text-caption">Full Name:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6 "> {{ convertToSentenceCase(selectedItem.last_name) }} {{ convertToSentenceCase(selectedItem.first_name) }} {{ selectedItem.middle_name.charAt(0).toUpperCase() }}.</p>
             <!-- Weight -->
             <p class="font-weight-light  ml-3  text-caption">Weight:</p>
             <p class="font-weight-regular ml-3 mb-2 text-h6 ">{{ selectedItem.weight }} kg</p>
             <!-- Height -->
             <p class="font-weight-light  ml-3  text-caption">Height:</p>
             <p class="font-weight-regular ml-3 mb-2 text-h6 ">{{ selectedItem.height }} cm</p>
            <!-- Household SIze -->
            <p class="font-weight-light  ml-3  text-caption">Household Size:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6 "> 10</p>
            <!-- Relation with Family Head-->
            <p class="font-weight-light  ml-3  text-caption">Relationship to Head of The Family:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6 "> {{convertToSentenceCase(selectedItem.relation_to_family_head) }}</p>
            <!-- Peersonal Income -->
            <p class="font-weight-light ml-3 text-caption">Personal Income:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6">{{ selectedItem.personal_income }}</p>
            <!-- Occupation -->
            <p class="font-weight-light  ml-3 text-caption ">Occupation:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6">{{ selectedItem.occupation }}</p>
            <!-- Living Duration -->
            <p class="font-weight-light  ml-3  text-caption">Living Duration:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6">{{ selectedItem.living_duration }} Year/s</p>
            <!-- With Disability -->
            <p class="font-weight-light  ml-3  text-caption">Person with Disability:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6">{{ selectedItem.with_disability }}</p>
            <!-- Status -->
            <p class="font-weight-light ml-3  text-caption">Residency Status:</p>
            <p class="font-weight-regular ml-3 mb-2 text-h6">{{ selectedItem.Status }}</p>

            <v-dialog v-model="deleteDialog" width="500" v-if="selectedItem">
              <v-card class="px-3 bg-grey-lighten-4" width="500" height="250" prepend-icon="mdi-delete"
                title="Delete Resident">
                <v-card-text class="text-center mt-3">Are you sure you want to delete <p
                    class=" font-weight-medium text-h5 " color="red-darken-3 "> {{ selectedItem.name }} </p> from the
                  list?</v-card-text>

                <div class="d-flex justify-end ga-3 my-4 ">
                  <v-btn width="100px" class="bg-grey-lighten-4" @click="deleteDialog = false" text="Cancel" flat>
                  </v-btn>

                  <v-btn width="100px" class="bg-green-darken-1" @click="deleteDialog = false">
                    Ok
                  </v-btn>

                </div>

              </v-card>

            </v-dialog>
          </div>

        </v-card>

        <div v-else class="border-b-thin">
          <p class="font-weight-regular text-h6 d-flex justify-center mb-3 mt-3">No Selected Resident</p>

        </div>

      </v-card>

      <v-card max-height="60px"
        class="rounded-b-lg d-flex justify-center ga-3 pb-3 mr-5 border-e-thin border-s-thin border-b-thin"
        v-if="selectedItem" elevation="0">
        <v-btn width="100px" class="bg-green-darken-1 my-3" @click="editInfo(selectedItem)">
          edit
        </v-btn>

        <v-btn width="100px" class="bg-red-darken-1  my-3" @click="deleteDialog = true">
          Delete
        </v-btn>
      </v-card>

    </v-col>


  </v-row>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      residentDialog: false,
      employeeDialog: false,
      deleteDialog: false,
      successDialog: false,
      search: '',
      CategoryName: '',
      Group: '',
      selectedItem: null,
      residents: [],
      resident: {
        resident_id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        gender: '',
        birthDate: '',
        age: '',
        nationality: '',
        religion: '',
        email: '',
        civStat: '',
        votStat: '',
        zone: '',
        contactNum: '',
        hhHead: '',
        hhSize: '',
        relToHead: '',
      },

      rules: {
        required: value => !!value || 'Required.',
        minLength: value => (value || '').length >= 2 || `Min 2 characters.`,
        maxLength: value => (value || '').length <= 10 || `Max 10 characters.`,
        email: value => {
          const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        numeric: value => !isNaN(value) || 'Must be a number.',
        positive: value => (value > 0) || 'Must be a positive number.',
        ageRange: value => (value >= 0 && value <= 120) || 'Age must be between 0 and 120.',
        phoneNumber: value => {
          const pattern = /^[0-9]{10}$/;
          return pattern.test(value) || 'Invalid phone number. Must be 10 digits.';
        },
        birthDate: value => {
          const today = new Date();
          const birthDate = new Date(value);
          return birthDate <= today || 'Birth date must be in the past.';
        },
        lettersOnly: value => /^[a-zA-Z]*$/.test(value) || 'Only letters allowed.',
      },

    };
  },
  methods: {
    onRowClick(item) {
      this.selectedItem = item;
    },
    convertToSentenceCase(name) {
      if (!name) return ''; // If name is undefined or null, return an empty string

      let words = name.split(" ");

      // Capitalize the first letter of each word
      let sentenceCasedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });

      // Join the capitalized words back into a string
      let sentenceCasedName = sentenceCasedWords.join(" ");

      return sentenceCasedName;
    },
    calculateAge(birthDate) {
      const today = new Date();
      const bday = new Date(birthDate);
      let age = today.getFullYear() - bday.getFullYear();
      const monthDiff = today.getMonth() - bday.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bday.getDate())) {
        age--;
      }

      this.resident.age.focused;
      return age;
    },
    calculateAgeTextfield() {
      if (this.resident.birthDate) {
        const today = new Date();
        const birthDate = new Date(this.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        //  this.resident.age.focus();
        return age;
      }
      return null;
    },
    submitClicked() {

      const newResident = {
        resident_id: this.residents.length + 1,
        first_name: this.resident.firstName,
        middle_name: this.resident.middleName,
        last_name: this.resident.lastName,
        suffix: this.resident.suffix,
        gender: this.resident.gender,
        birth_date: this.resident.birthDate,
        phone_num: this.resident.contactNum,
        nationality: this.resident.nationality,
        religion: this.resident.religion,
        email: this.resident.email,
        zone: this.resident.zone,
        voter_status: this.resident.votStat,
        civil_status: this.resident.civStat,
        household_id: this.resident.hhHead,
        hhSize: this.resident.hhSize,
        relToHead: this.resident.relToHead,
      };

      this.residents.push(newResident);

      this.resident = {
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        gender: '',
        birthDate: '',
        age: '',
        nationality: '',
        religion: '',
        email: '',
        civStat: '',
        votStat: '',
        zone: '',
        contactNum: '',
        hhHead: '',
        hhSize: '',
        relToHead: '',

      }

      this.successDialog = true;
      setTimeout(() => {
        this.successDialog = false;
        this.residentDialog = false;
      }, 1000);
    },
    editInfo(item) {
      this.residentDialog = true;

      this.resident.firstName = item.first_name;
      this.resident.middleName = item.middle_name;
      this.resident.lastName = item.last_name;
      this.resident.suffix = item.suffix;
      this.resident.zone = item.zone;
      this.resident.gender = item.gender;
      this.resident.religion = item.religion;
      this.resident.nationality = item.nationality;
      this.resident.votStat = item.voter_status;
      this.resident.contactNum = item.phone_num;
      this.resident.email = item.email;
      this.resident.birthDate = item.birth_date;
      this.resident.civStat = item.civil_status;
      this.resident.hhHead = item.household_id;
      this.resident.hhSize = item.zone;
      this.resident.relToHead = item.relation_to_family_head;
    },
    getDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
      const day = String(now.getDate()).padStart(2, '0');
      const formattedDate = `${month}-${day}-${year}`;
      return formattedDate;
    },
    generateTableHTML() {
      let index = 1;
      let numberOfResidents = this.residents.length;

      let tableHTML = `
        <style scoped>
        body {
      font-family: 'Poppins', sans-serif;
      margin: auto;
    }
    h2, p{
      margin: 0;
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid black;
      padding: 3px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    @media print {
      @page { size: A4; margin: 0 auto;

      }
    }
        </style>
        <table id="residentTable">
    <thead>
      <tr>
        <th style="width: 60px;"></th>
        <th>Name</th>
        <th style="width: 60px;text-align: center;">Age</th>
        <th style="width: 80px;">Gender</th>
      </tr>
    </thead>
    <tbody>`;

      // Add table rows
      this.residents.forEach(item => {
        tableHTML += `<tr>
          <td >${index}</td>
          <td >${item.name}</td>
          <td>${item.birthd_date}</td>
          <td>${item.gender}</td>
        </tr>`;
        index++;
      });
      tableHTML += '</tbody></table>';
      tableHTML += ` <div style="margin: 30px ;">
    <p style="text-align:left ;">Number of Residents: ${numberOfResidents}</p>
  </div>`;
      return tableHTML;
    },
    printContent() {
      const tableHTML = this.generateTableHTML();
      const printWindow = window.open('', '', 'height=800,width=1000,top=100,left=200');
      printWindow.document.write('<html><head><title>Barangay Bonifacio Resident List</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write('<h2 style="margin-top: 15px;">Municipality of San Fernando</h2><h2>Barangay Bonifacio</h2><p style="text-align: end;margin-right: 50px;font-size: 18px;margin-top: 100px;">' + this.getDate() + '</p>');
      printWindow.document.write(tableHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    },
    fetchData() {
      axios.get('http://localhost/Connect Database/data.php')
        .then(response => {
          this.residents = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    },
  },
  computed: {
    filteredItems() {
      let filteredItems = this.residents;

      // Apply category and group filtering
      if (this.CategoryName && this.Group) {
        switch (this.CategoryName) {
          case 'Age':
            switch (this.Group) {
              case 'Infant [0 - 1]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 0 && item.age <= 1
                );
                break;
              case 'Toddler [2 - 4]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 2 && item.age <= 4
                );
                break;
              case 'Child [5 - 12]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 5 && item.age <= 12
                );
                break;
              case 'Adolescent [13 - 19]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 13 && item.age <= 19
                );
                break;
              case 'Young Adult [20 - 34]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 20 && item.age <= 34
                );
                break;
              case 'Middle-Aged [35 - 54]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 35 && item.age <= 54
                );
                break;
              case 'Older Adult [55 - 64]':
                filteredItems = filteredItems.filter(
                  (item) => item.age >= 55 && item.age <= 64
                );
                break;
              case 'Senior [65 Above]':
                filteredItems = filteredItems.filter((item) => item.age >= 65);
                break;
            }
            break;
          case 'Gender':
            filteredItems = filteredItems.filter(
              (item) => item.gender.toLowerCase() === this.Group.toLowerCase()
            );
            break;
          case 'Zone':
            filteredItems = filteredItems.filter(
              (item) => item.zone.toString() === this.Group.toString()
            );
            break;
          case 'Civil Status':
            filteredItems = filteredItems.filter(
              (item) =>
                item.civilStatus &&
                item.civilStatus.toLowerCase() === this.Group.toLowerCase()
            );
            break;
        }
      }

      // Apply search filtering
      if (this.search) {
        filteredItems = filteredItems.filter((item) =>
          Object.values(item).some((value) =>
            value.toString().toLowerCase().startsWith(this.search.toLowerCase())
          )
        );
      }

      return filteredItems;
    },
    filteredGroups() {
      switch (this.CategoryName) {
        case 'All':
          return [];
        case 'Age':
          return ['Infant [0 - 1]', 'Toddler [2 - 4]', 'Child [5 - 12]', 'Adolescent [13 - 19]', 'Young Adult [20 - 34]', 'Middle-Aged [35 - 54]', 'Older Adult [55 - 64]', 'Senior [65 Above]',
          ];
        case 'Gender':
          return ['Female', 'Male'];
        case 'Zone':
          return ['1', '2', '3', '4', '5', '6', '7'];
        case 'Civil Status':
          return ['Single', 'Married', 'Annulled', 'Widowed', 'Live-in'];
        default:
          return [];
      }
    },

  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.v-table {
  background-color: #ECEFF1;
  border-radius: 5px;
}

tr:hover {
  background-color: #CFD8DC;
}

.v-table__wrapper {
  border-radius: 5px;
}

.v-table.v-table--fixed-header .v-table__wrapper table thead tr th {
  background-color: #3a53a5;
  color: white;

}

* {

  /* Customize the scrollbar */
  ::-webkit-scrollbar {
    width: 3px;
    /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* Color of the track (background) */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    /* Color of the thumb on hover */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #C5CAE9;
    /* Color of the thumb (handle) */
    border-radius: 6px;
    /* Rounded corners of the thumb */
  }

}
</style>
