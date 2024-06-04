<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 style="
            text-align: center;
            font-size: 32px;
            margin-top: 5px;
            color: #3a53a5;
          ">
          Cedula
        </h1>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-space-between align-center mx-3" style="margin-top: -25px; ">
      <v-col cols="5" class="d-flex justify-start">
        <v-select :items="filterOptions" v-model="selectedFilter" class="filter-select" variant="outlined"
          density="compact" style="width: 150px;" @change="applyFilter"></v-select>
        <v-btn @click="toggleDialog" style="
              background-color: #3a53a5;
              color: white;
              margin: 0 10px;
              width: 350px;
            ">
          Add
        </v-btn>

      </v-col>
      <v-col cols="3">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Search" class="search-bar"
          variant="outlined" density="compact"></v-text-field>
      </v-col>
    </v-row>

    <v-row class="" style="margin-top: -28px ; ">
      <v-col cols="9">
        <div class="ml-7">
          <v-table class="mb-10" height="480px" max-height="700px" fixed-header :search="search" hover>
            <thead>
              <tr>
                <th class="text-left">Cedula Number</th>
                <th class="text-left">Full Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Gender</th>
                <th class="text-left">Birthdate</th>
                <th class="text-left">Status</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id" @click="onRowClicked(item)">
                <td>{{ item.id }}</td>
                <td>{{ item.fullName }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.birthdate }}</td>
                <td>{{ item.paymentStatus }}</td>
                <td>

                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>
      <v-col cols="3">
        <v-card class="mr-5  border-e-thin border-s-thin bg-white" elevation="0" height="480px">
          <p class="text-center text-h8 py-3" style="background-color: #3a53a5; color: white" height="480px">
            Information
          </p>
          <v-card max-height="700" class="overflow-y-auto" elevation="0" height="370px" v-if="selectedItem">
            <div class="mt-4">
              <p class="font-weight-light ml-3 text-caption">Full Name:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.fullName }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Gender:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.gender }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Height:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.height }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Weight:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h6h8">
                {{ selectedItem.weight }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Birthdate:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.birthdate }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Place of Birth:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.placeOfBirth }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Address:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.address }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Email:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.email }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Contact Number:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.contactNumber }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Civil Status:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.civilStatus }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Occupation:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.occupation }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Citizenship:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.citizenship }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Date Issued:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.dateIssued }}
              </p>
              <p class="font-weight-light ml-3 text-caption">TIN No:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.tinNo }}
              </p>
            </div>
          </v-card>
          <div v-else class="border-b-thin" style="background-color: white;">
            <p class="font-weight-regular text-h9 d-flex justify-center  " style="margin-top: 180px;" elevation="0">
              No item selected
            </p>
          </div>

          <!-- Edit and Delete Button -->
          <div class="text-center mt-4 bg-grey-lighten-3" v-if="selectedItem">
            <div class="py-8">
              <v-row justify="center">
                <v-btn icon @click.stop="editItem(selectedItem)"
                  style="border-radius: 0; background-color: #3a53a5; color: white;"
                  class="rounded mx-4 margin-top: 10px">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click.stop="deleteItem(selectedItem)"
                  style="border-radius: 0; background-color:  #f44336; color:white;"
                  class="rounded mx-4 margin-top: 10px">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </div>
          </div>

        </v-card>
      </v-col>

    </v-row>

    <!-- Cedula Form -->
    <v-dialog v-model="showDialog" max-width="600px">
      <v-card style="max-width: 600px; margin: 20px auto; padding: 20px;">
        <div>
          <h2
            style="text-align: center; font-size: 20px; margin-bottom: 20px; background-color: #3a53a5; color: white; padding: 10px;">
            Cedula</h2>
        </div>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.id" label="Cedula Number" :rules="idRules" required
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.tinNo" label="TIN No." :rules="tinNoRules" required
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="newEntry.lastName" label="Last Name" :rules="nameRules" required
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="newEntry.firstName" label="First Name" :rules="nameRules" required
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="newEntry.middleName" label="Middle Name" :rules="nameRules"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.address" label="Address" :rules="addressRules" required
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="newEntry.gender" :items="['Male', 'Female']" label="Gender" :rules="genderRules"
                    required variant="outlined"></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.birthdate" label="Birthdate" :rules="birthdateRules" required
                    variant="outlined" type="date"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.placeOfBirth" label="Place of Birth" :rules="placeOfBirthRules"
                    required variant="outlined"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.contactNumber" label="Contact Number" :rules="contactNumberRules"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.email" label="Email" :rules="emailRules" required variant="outlined"
                    type="email"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.occupation" label="Occupation" :rules="occupationRules" required
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="newEntry.civilStatus" :items="['Single', 'Married', 'Widowed']" label="Civil Status"
                    :rules="civilStatusRules" required variant="outlined"></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.height" label="Height (cm)" :rules="heightRules" required
                    variant="outlined" type="number"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.weight" label="Weight (kg)" :rules="weightRules" required
                    variant="outlined" type="number"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.citizenship" label="Citizenship" :rules="citizenshipRules" required
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="newEntry.dateIssued" label="Date Issued" :rules="dateIssuedRules" required
                    variant="outlined" type="date"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div style="display: flex; justify-content: center; margin-top: 20px;">
            <v-btn @click="saveEntry" :disabled="!valid"
              style="background-color: #3a53a5; color: white; margin: 0 10px; width: 100px;">
              Save
            </v-btn>
            <v-btn @click="toggleDialog"
              style="background-color: white; color: #424141; margin: 0 10px; width: 100px; border: 0.001 solid #282727; box-shadow: 0 0 0 1px #424141;">
              Cancel
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Edit Payment Status Dialog -->
    <v-dialog v-model="showEditDialog" max-width="400px">
      <v-card class="edit-payment-card">
        <v-card-title class="headline edit-payment-title">
          Update Payment Status
        </v-card-title>
        <v-card-text class="edit-payment-text">
          <v-form ref="editForm">
            <v-select v-model="editItem.paymentStatus" :items="paymentStatuses" label="Payment Status"
              variant="outlined"></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="edit-payment-actions">
          <v-btn style="background-color: #3a53a5; color: white; margin: 0 10px; width: 100px;" @click="saveEdit"
            :disabled="!editItem.paymentStatus">
            Save
          </v-btn>
          <v-btn style="background-color: #3a53a5; color: white; margin: 0 10px; width: 100px;"
            @click="closeEditDialog">
            Cancel
          </v-btn>
        </v-card-actions>


        <!-- Form Inputs -->

        <v-row>
          <v-col cols="6" class="text-left">
            <v-btn @click="toggleDialog" color="grey">Cancel</v-btn>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn @click="saveEntry" :disabled="!valid" style="background-color: #3a53a5; color: white">Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
export default {
  data() {
    return {
      search: '',
      showDialog: false,
      selectedItem: null,
      newEntry: {
        id: '',
        tinNo: '',
        lastName: '',
        firstName: '',
        middleName: '',
        address: '',
        gender: '',
        birthdate: '',
        placeOfBirth: '',
        contactNumber: '',
        email: '',
        occupation: '',
        civilStatus: '',
        citizenship: '',
        height: '',
        weight: '',
        dateIssued: '',
      },
      valid: true,
      filterOptions: ['Status', 'Valid', 'Expired'],
      selectedFilter: 'Status',

      //SAMPLE DATA
      items: [{
        id: 1,
        lastName: 'Doe',
        firstName: 'John',
        middleName: 'Quincy',
        address: '123 Main St',
        gender: 'Male',
        birthdate: '1990-01-01',
        paymentStatus: 'Valid',
        height: 180,
        weight: 75,
        placeOfBirth: 'City A',
        email: 'john.doe@example.com',
        contactNumber: '123456789',
        civilStatus: 'Single',
        occupation: 'Engineer',
        citizenship: 'Country A',
        dateIssued: '2022-01-01',
        tinNo: '123-456-789',
      },
      {
        id: 2,
        lastName: 'Smith',
        firstName: 'Jane',
        middleName: 'Elizabeth',
        address: '456 Elm St',
        gender: 'Female',
        birthdate: '1995-02-02',
        paymentStatus: 'Expired',
        height: 165,
        weight: 60,
        placeOfBirth: 'City B',
        email: 'jane.smith@example.com',
        contactNumber: '987654321',
        civilStatus: 'Married',
        occupation: 'Doctor',
        citizenship: 'Country B',
        dateIssued: '2021-02-02',
        tinNo: '987-654-321',
      },
      {
        id: 3,
        lastName: 'Brown',
        firstName: 'Michael',
        middleName: 'David',
        address: '789 Oak St',
        gender: 'Male',
        birthdate: '1985-03-03',
        paymentStatus: 'Valid',
        height: 175,
        weight: 80,
        placeOfBirth: 'City C',
        email: 'michael.brown@example.com',
        contactNumber: '456123789',
        civilStatus: 'Married',
        occupation: 'Teacher',
        citizenship: 'Country C',
        dateIssued: '2023-03-03',
        tinNo: '456-789-123',
      },
      {
        id: 4,
        lastName: 'Johnson',
        firstName: 'Emily',
        middleName: 'Anne',
        address: '321 Pine St',
        gender: 'Female',
        birthdate: '1992-04-04',
        paymentStatus: 'Expired',
        height: 160,
        weight: 55,
        placeOfBirth: 'City D',
        email: 'emily.johnson@example.com',
        contactNumber: '987321654',
        civilStatus: 'Single',
        occupation: 'Artist',
        citizenship: 'Country D',
        dateIssued: '2020-04-04',
        tinNo: '789-123-456',
      },
      {
        id: 5,
        lastName: 'Williams',
        firstName: 'Robert',
        middleName: 'James',
        address: '555 Maple St',
        gender: 'Male',
        birthdate: '1980-05-05',
        paymentStatus: 'Valid',
        height: 185,
        weight: 90,
        placeOfBirth: 'City E',
        email: 'robert.williams@example.com',
        contactNumber: '654789123',
        civilStatus: 'Married',
        occupation: 'Lawyer',
        citizenship: 'Country E',
        dateIssued: '2024-05-05',
        tinNo: '159-753-852',
      },
      {
        id: 6,
        lastName: 'Jones',
        firstName: 'Sarah',
        middleName: 'Michelle',
        address: '777 Cedar St',
        gender: 'Female',
        birthdate: '1998-06-06',
        paymentStatus: 'Expired',
        height: 170,
        weight: 65,
        placeOfBirth: 'City F',
        email: 'sarah.jones@example.com',
        contactNumber: '321654987',
        civilStatus: 'Single',
        occupation: 'Writer',
        citizenship: 'Country F',
        dateIssued: '2022-06-06',
        tinNo: '357-951-486',
      },
      {
        id: 7,
        lastName: 'Brown',
        firstName: 'William',
        middleName: 'Andrew',
        address: '999 Walnut St',
        gender: 'Male',
        birthdate: '1987-07-07',
        paymentStatus: 'Valid',
        height: 170,
        weight: 75,
        placeOfBirth: 'City G',
        email: 'william.brown@example.com',
        contactNumber: '987654321',
        civilStatus: 'Married',
        occupation: 'Architect',
        citizenship: 'Country G',
        dateIssued: '2023-07-07',
        tinNo: '852-369-741',
      },
      {
        id: 8,
        lastName: 'Taylor',
        firstName: 'Olivia',
        middleName: 'Grace',
        address: '111 Pine St',
        gender: 'Female',
        birthdate: '1990-08-08',
        paymentStatus: 'Expired',
        height: 165,
        weight: 60,
        placeOfBirth: 'City H',
        email: 'olivia.taylor@example.com',
        contactNumber: '789456123',
        civilStatus: 'Single',
        occupation: 'Dancer',
        citizenship: 'Country H',
        dateIssued: '2021-08-08',
        tinNo: '369-852-741',
      },
      {
        id: 9,
        lastName: 'Miller',
        firstName: 'Ethan',
        middleName: 'Alexander',
        address: '222 Oak St',
        gender: 'Male',
        birthdate: '1983-09-09',
        paymentStatus: 'Valid',
        height: 180,
        weight: 85,
        placeOfBirth: 'City I',
        email: 'ethan.miller@example.com',
        contactNumber: '654123789',
        civilStatus: 'Married',
        occupation: 'Manager',
        citizenship: 'Country I',
        dateIssued: '2025-09-09',
        tinNo: '456-852-369',
      },
      {
        id: 10,
        lastName: 'Wilson',
        firstName: 'Sophia',
        middleName: 'Rose',
        address: '888 Maple St',
        gender: 'Female',
        birthdate: '1996-10-10',
        paymentStatus: 'Expired',
        height: 170,
        weight: 65,
        placeOfBirth: 'City J',
        email: 'sophia.wilson@example.com',
        contactNumber: '321789456',
        civilStatus: 'Single',
        occupation: 'Engineer',
        citizenship: 'Country J',
        dateIssued: '2022-10-10',
        tinNo: '258-369-147',
      },

      ],
      // Validation rules (example)
      idRules: [(v) => !!v || 'Cedula Number is required'],
      tinNoRules: [(v) => !!v || 'TIN No is required'],
      nameRules: [(v) => !!v || 'Name is required'],
      placeOfBirthRules: [(v) => !!v || 'Place of Birth is required'],
      birthdateRules: [(v) => !!v || 'Birthdate is required'],
      heightRules: [(v) => !!v || 'Height is required'],
      weightRules: [(v) => !!v || 'Weight is required'],
      addressRules: [(v) => !!v || 'Address is required'],
      emailRules: [(v) => !!v || 'Email is required'],
      contactNumberRules: [(v) => !!v || 'Contact Number is required'],
      genderRules: [(v) => !!v || 'Gender is required'],
      civilStatusRules: [(v) => !!v || 'Civil Status is required'],
      occupationRules: [(v) => !!v || 'Occupation is required'],
      citizenshipRules: [(v) => !!v || 'Citizenship is required'],
      dateIssued: [(v) => !!v || 'Date Issued is required'],
    };
  },
  computed: {
    filteredItems() {
      let items = this.items;
      // Filter based on selected payment status
      if (this.selectedFilter !== 'Status') {
        items = items.filter(item => item.paymentStatus === this.selectedFilter);
      }
      // Apply search filter for last name
      if (this.search.trim() !== '') {
        const searchTerm = this.search.trim().toLowerCase();
        items = items.filter(item =>
          item.lastName.toLowerCase().startsWith(searchTerm)
        );
      }
      // Map each item to include the 'fullName' property
      return items.map(item => ({
        ...item,
        fullName: `${item.lastName}, ${item.firstName} ${item.middleName}`.trim(),
      }));
    },
  },

  methods: {
    applyFilter() {
      // Add your filter logic here if needed
    },
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
    saveEntry() {
      // Add your save logic here
      if (this.$refs.form.validate()) {
        // Check if the new entry already exists in the items array
        const index = this.items.findIndex(item => item.id === this.newEntry.id);
        if (index !== -1) {
          // If the new entry exists, replace it with the edited data
          this.items.splice(index, 1, { ...this.newEntry });
        } else {
          // If the new entry does not exist, push it to the items array
          this.items.push({ ...this.newEntry });
        }
        this.resetForm();
        this.toggleDialog();
      }
    },

    resetForm() {
      this.newEntry = {
        id: '',
        tinNo: '',
        lastName: '',
        firstName: '',
        middleName: '',
        placeOfBirth: '',
        birthdate: '',
        height: '',
        weight: '',
        address: '',
        email: '',
        contactNumber: '',
        gender: '',
        civilStatus: '',
        occupation: '',
        citizenship: '',
        dateIssued: '',
      };
      this.$refs.form.reset();
    },
    onRowClicked(item) {
      this.selectedItem = item;
    },
    editItem(item) {
      // Copy the selected item's data to the newEntry object
      this.newEntry = { ...item };
      // Set the showDialog to true to show the dialog with pre-filled data
      this.showDialog = true;
    },
    deleteItem(item) {
      // Find the index of the item in the 'items' array
      const index = this.items.findIndex(i => i.id === item.id);
      // Remove the item from the 'items' array
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      // Clear the selected item
      this.selectedItem = null;
    },
  },
};
</script>

<style>
.v-table th {
  background-color: #3a53a5 !important;
  color: white !important;
}

body {
  overflow: hidden;
  /* Disable scrolling */
}

/* Customize the scrollbar */
::-webkit-scrollbar {
  width: 2px;
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
  background-color: #677fcb;
  /* Color of the thumb (handle) */
  border-radius: 6px;
  /* Rounded corners of the thumb */
}
</style>
