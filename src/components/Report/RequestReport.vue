<template>
  <v-row>
    <v-col col="9" class="main-content">
      <v-toolbar flat>
        <v-btn class="p-5" value="elevates" dark @click="openDialog('New Item')">
          New Report
        </v-btn>
        <v-spacer></v-spacer>
        <!-- Dropdown menu for filtering by type -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(type, index) in report_types" :key="index" @click="filterByType(type)">
              <v-list-item-title>{{ type }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- Dropdown menu for filtering by status -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(status, index) in reportStatuses" :key="index" @click="filterByStatus(status)">
              <v-list-item-title>{{ status }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- Text field for search -->
        <v-text-field max-width="20%" v-model="search" label="Search" single-line hide-details outlined></v-text-field>
      </v-toolbar>
      <v-container class="scrollable-container">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="item in filteredReports" :key="item.no">
            <v-card style="position: relative; cursor: pointer;" @click="displayItem(item)">
              <div class="color-indicator" :class="getIndicatorColor(item.status)"></div>
              <v-btn icon small @click.stop="openDialog('Edit Item', item)"
                style="position: absolute; top: 8px; right: 8px;">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-card-title>{{ item.fullName }}</v-card-title>
              <v-card-subtitle>{{ item.date_recorded }}</v-card-subtitle>
              <v-card-text>
                <div><strong>Report Type:</strong> {{ item.report_type }}</div>
                <div><strong>Status:</strong> {{ item.status }}</div>
              </v-card-text>
              <v-btn icon small color="red" @click.stop="deleteItem(item)"
                style="position: absolute; bottom: 8px; right: 8px;">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col cols="3" class="side-content">
      <v-container>
        <v-container class="display-container">
          <v-row>
            <v-col cols="4">
              <v-progress-circular v-if="selectedItem" :key="selectedItem.status" :size="100" :width="10" :rotate="360"
                :value="getProgress(selectedItem.status)" :color="progressCircleColor" class="mx-auto">
                <template v-slot:default="{ fillPercentage }">
                  <div v-if="fillPercentage === 100" style="text-align: center">
                    <span>Solved</span>
                  </div>
                  <div v-else style="text-align: center">
                    <span>{{ fillPercentage }}</span>
                    <span>{{ selectedItem.status }}</span>
                  </div>
                </template>
              </v-progress-circular>
            </v-col>
            <v-col cols="8">
              <div>
                <p v-if="selectedItem">
                  Full Name:<br> <strong>{{ selectedItem.fullName }}</strong> <br />
                  {{ selectedItem.date_recorded }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="display-container">
          <h2>Report Info</h2>
          <hr>
          <div>
            <p v-if="selectedItem">
              <strong>Full Name:</strong><br /> {{ selectedItem.fullName }}<br />
              <strong>Phone:</strong><br /> {{ selectedItem.phone_num }}<br />
              <strong>Email:</strong><br /> {{ selectedItem.email }}<br />
              <strong>Zone-Address:</strong><br /> {{ selectedItem.zone_address }}<br />
              <strong>Date Recorded:</strong><br /> {{ selectedItem.date_recorded }}<br />
              <strong>Report Type:</strong><br /> {{ selectedItem.report_type }}<br />
              <strong>Report Status:</strong><br /> {{ selectedItem.status }}<br />
              <strong>Purpose:</strong><br /> {{ selectedItem.reason }}<br />
              <hr />
              <v-btn class="btn-schedule" color="primary" @click="openHearingScheduleDialog">Hearing Schedule</v-btn>
              <v-btn class="btn-print" color="secondary" @click="printItem(selectedItem)">
                Print
              </v-btn>
            </p>
          </div>
        </v-container>

        <!-- Hearing schedule dialog -->
        <template>
          <v-dialog v-model="hearingScheduleDialog" max-width="800">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Hearing Schedule Dialog</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <!-- Header with the logo and title -->
                <v-row justify="space-between">
                  <v-col cols="3" class="LogoHeader">
                    <v-img src="/src/assets/images/logo.png" alt="Logo 1" width="100" />
                  </v-col>
                  <v-col cols="6" class="text-center">
                    <p>Municipality of San Fernando</p>
                    <h1>BARANGAY REPORT</h1>
                    <p>Barangay Bonifacio</p>
                  </v-col>
                  <v-col cols="3" class="LogoHeader">
                    <v-img src="/src/assets/images/sflogo.png" alt="Logo 1" width="100" />
                  </v-col>
                </v-row>
              </v-card-title>
              <v-select v-model="selectedLuponOfficer" :items="luponOfficers" label="Lupon Officer" item-text="name"
                item-value="id" dense outlined></v-select>
              <v-sheet class="pa-4">
                <v-sheet class="d-flex" height="54" tile>
                  <v-select v-model="type" :items="types" class="ma-2" label="View Mode" variant="outlined" dense
                    hide-details></v-select>
                  <v-select v-model="weekday" :items="weekdays" class="ma-2" label="Weekdays" variant="outlined" dense
                    hide-details></v-select>
                </v-sheet>
                <v-sheet>
                  <v-calendar ref="calendar" v-model="value" :events="events" :view-mode="type"
                    :weekdays="weekday"></v-calendar>
                </v-sheet>
              </v-sheet>
            </v-card>
          </v-dialog>
        </template>




        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <v-row justify="space-between">
                <v-col cols="3" class="LogoHeader">
                  <v-img src="/src/assets/images/logo.png" alt="Logo 1" width="100" />
                </v-col>
                <v-col cols="6" class="text-center">
                  <p>Municipality of San Fernando</p>
                  <h1>BARANGAY REPORT</h1>
                  <p>Barangay Bonifacio</p>
                </v-col>
                <v-col cols="3" class="LogoHeader">
                  <v-img src="/src/assets/images/sflogo.png" alt="Logo 1" width="100" />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.first_name" :rules="[v => !!v || 'First Name is required']"
                        label="First Name" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.middle_name" label="Middle Name"
                        variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.last_name" :rules="[v => !!v || 'Last Name is required']"
                        label="Last Name" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.suffix" label="Suffix" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.phone_num" :rules="[v => !!v || 'Phone number is required']"
                        label="Phone" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.email" :rules="[v => !!v || 'Email is required']" label="Email"
                        variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select v-model="editedItem.zone_address" :items="zones"
                        :rules="[v => !!v || 'Zone Address is required']" label="Zone Address"
                        variant="outlined"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="editedItem.dateRecorded" label="Date Recorded" v-on="on" type="date"
                            required variant="outlined"></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.dateRecorded" @input="menu = false" no-title
                          required></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-autocomplete v-model="editedItem.report_type" :items="reportTypes"
                        :rules="[v => !!v || 'Report Type is required']" label="Report Type" variant="outlined"
                        @blur="handleBlur('reportType', editedItem.report_type)" clearable>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="4" sm="6" v-if="formTitle === 'Edit Item'">
                      <!-- Only show the report_status field in the edit form -->
                      <v-autocomplete v-model="editedItem.status" :items="reportStatuses" label="Report Status"
                        variant="outlined">
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-textarea v-model="editedItem.reason" :rules="[v => !!v || 'Purpose is required']"
                        label="Purpose" variant="outlined"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
              <v-btn color="blue darken-1" text @click="saveItem()" :disabled="!valid">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import { useDate } from 'vuetify';

export default {
  data() {
    return {
      reports: [],
      reportTypes: [],
      search: '',
      selectedStatus: [],
      selectedType: [],
      selectedItem: null,
      editedItem: {
        report_id: null,
        resident_id: null,
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        report_type: '',
        date_recorded: '',
        email: '',
        phone_num: '',
        zone_address: '',
        reason: '',
        status: 'pending',
        report_status: '',
        InOutBarangay: ''
      },
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      hearingScheduleDialog: false,
      luponOfficers: [
        { id: 1, name: 'Officer 1' },
        { id: 2, name: 'Officer 2' },
        { id: 3, name: 'Officer 3' }
      ],
      selectedLuponOfficer: null,
      selectedDate: new Date(),
      hearingSchedules: [
        { title: 'Meeting with Resident', start: new Date('2024-06-03T10:00:00'), end: new Date('2024-06-03T11:00:00'), luponOfficerId: 1 },
        { title: 'Dispute Resolution', start: new Date('2024-06-04T14:00:00'), end: new Date('2024-06-04T15:00:00'), luponOfficerId: 2 }
      ],
      formTitle: '',
      progressCircleColor: 'red',
      defaultItem: {
        report_id: null,
        resident_id: null,
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        report_type: '',
        date_recorded: '',
        email: '',
        phone_num: '',
        zone_address: '',
        reason: '',
        report_status: '',
        InOutBarangay: ''
      },
      valid: false
    };
  },
  computed: {
    filteredReports() {
      let filtered = this.reportsWithFullName.filter(report =>
        report.fullName.toLowerCase().includes(this.search.toLowerCase())
      );
      if (this.selectedStatus.length > 0) {
        filtered = filtered.filter(report => this.selectedStatus.includes(report.status));
      }
      if (this.selectedType.length > 0) {
        filtered = filtered.filter(report => this.selectedType.includes(report.report_type));
      }
      return filtered;
    },
    reportsWithFullName() {
      return this.reports.map(report => ({
        ...report,
        fullName: `${report.first_name} ${report.middle_name} ${report.last_name} ${report.suffix}`.trim()
      }));
    }
  },
  created() {
    this.fetchReports();
    this.fetchReportTypes();
  },
  methods: {
    fetchReports() {
      axios.get('http://localhost/ReportBackend/data.php')
        .then(response => {
          this.reports = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the reports!", error);
        });
    },
    fetchReportTypes() {
      axios.get('http://localhost/ReportBackend/report_types.php')
        .then(response => {
          this.reportTypes = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the report types!", error);
        });
    },
    filterByType(type) {
      if (!this.selectedType.includes(type)) {
        this.selectedType.push(type);
      } else {
        this.selectedType = this.selectedType.filter(item => item !== type);
      }
      this.applyFilters();
    },
    filterByStatus(status) {
      if (!this.selectedStatus.includes(status)) {
        this.selectedStatus.push(status);
      } else {
        this.selectedStatus = this.selectedStatus.filter(item => item !== status);
      }
      this.applyFilters();
    },
    applyFilters() {
      // Trigger filtering when filter selection changes
      // No need to do anything here, computed property will handle the filtering
    },
    displayItem(item) {
      console.log("Selected Item:", item);
      this.selectedItem = {
        report_id: item.report_id,
        resident_id: item.resident_id,
        fullName: `${item.first_name} ${item.middle_name} ${item.last_name} ${item.suffix}`.trim(),
        middle_name: item.middle_name,
        last_name: item.last_name,
        suffix: item.suffix,
        report_type: item.report_type,
        date_recorded: item.date_recorded,
        email: item.email,
        phone_num: item.phone_num,
        zone_address: item.zone_address,
        reason: item.reason,
        status: item.status,
        report_status: item.status,
        InOutBarangay: item.InOutBarangay
      };
    },
    openHearingScheduleDialog() {
      console.log("Hearing Schedule button clicked");
      this.hearingScheduleDialog = true;
    },

    closeHearingScheduleDialog() {
      this.hearingScheduleDialog = false;
    },
    saveHearingSchedule() {
      console.log("Selected Lupon Officer:", this.selectedLuponOfficer);
      console.log("Selected Date:", this.selectedDate);

      // Create a new event with selected Lupon officer ID
      const newEvent = {
        title: 'New Event',
        start: this.selectedDate,
        end: this.selectedDate,
        luponOfficerId: this.selectedLuponOfficer
      };

      // Add the new event to hearingSchedules
      this.hearingSchedules.push(newEvent);

      // Reset selectedLuponOfficer and selectedDate
      this.selectedLuponOfficer = null;
      this.selectedDate = new Date();

      // Close the dialog
      this.closeHearingScheduleDialog();
    },
    // Method to get event color based on event type
    getEventColor(event) {
      // Check Lupon officer availability for the event
      const luponOfficerId = event.luponOfficerId;
      const luponOfficer = this.luponOfficers.find(officer => officer.id === luponOfficerId);

      if (luponOfficer) {
        // Lupon officer available
        return 'blue';
      } else {
        // Lupon officer not available
        return 'grey';
      }
    },
    // Method to get event text color
    getEventTextColor() {
      // You can implement logic to assign text color based on event type
      return 'white'; // Sample text color
    },
    openDialog(title, item) {
      this.formTitle = title;
      if (item) {
        this.editedIndex = this.reports.indexOf(item);
        this.editedItem = Object.assign({}, item);
      } else {
        this.editedItem = Object.assign({}, this.defaultItem);
        delete this.editedItem.status; // Remove this line if you want to keep the default status
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    handleBlur(field, value) {
      if (field === 'report_type' && value && !this.reportTypes.includes(value)) {
        this.reportTypes.push(value);
        // Optionally save the new report type to the database
        axios.post('http://localhost/ReportBackend/crud.php', {
          action: 'insert_report_type',
          report_type: value
        }).catch(error => {
          console.error("There was an error saving the new report type!", error);
        });
      }
    },
    saveItem() {
      const action = this.editedIndex > -1 ? 'update' : 'insert';
      const data = {
        action: action,
        report: this.editedItem
      };

      axios.post('http://localhost/ReportBackend/crud.php', data)
        .then(response => {
          this.fetchReports();
          this.closeDialog();
        })
        .catch(error => {
          console.error("There was an error saving the report!", error);
        });
    },

    deleteItemConfirm() {
      const data = {
        action: 'delete',
        report_id: this.selectedItem.report_id
      };

      axios.post('http://localhost/ReportBackend/crud.php', data)
        .then(response => {
          this.fetchReports();
          this.closeDelete();
        })
        .catch(error => {
          console.error("There was an error deleting the report!", error);
        });
    },

    closeDelete() {
      this.dialogDelete = false;
    },
    printItem(item) {
      const printContent = `
        <div>
          <h1>Report Info</h1>
          <p><strong>First Name:</strong> ${item.first_name}</p>
          <p><strong>Middle Name:</strong> ${item.middle_name}</p>
          <p><strong>Last Name:</strong> ${item.last_name}</p>
          <p><strong>Suffix:</strong> ${item.suffix}</p>
          <p><strong>Phone:</strong> ${item.phone_num}</p>
          <p><strong>Email:</strong> ${item.email}</p>
          <p><strong>Address:</strong> ${item.zone_address}</p>
          <p><strong>Date Recorded:</strong> ${item.date_recorded}</p>
          <p><strong>Report Type:</strong> ${item.report_type}</p>
          <p><strong>Report Status:</strong> ${item.status}</p>
          <p><strong>Purpose:</strong> ${item.reason}</p>
        </div>
      `;
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Print Report</title></head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    },
    getIndicatorColor(status) {
      switch (status) {
        case 'pending':
          return 'pending';
        case '1st Hearing':
          return 'first-hearing';
        case '2nd Hearing':
          return 'second-hearing';
        case '3rd Hearing':
          return 'third-hearing';
        case 'Solved':
          return 'Solved';
        default:
          return '';
      }
    },
    getProgress(status) {
      switch (status) {
        case 'pending':
          return 0;
        case '1st Hearing':
          return 25;
        case '2nd Hearing':
          return 50;
        case '3rd Hearing':
          return 75;
        case 'Solved':
          return 100;
        default:
          return 0;
      }
    },
    getProgressColor(status) {
      switch (status) {
        case 'pending':
        case '1st Hearing':
        case '2nd Hearing':
        case '3rd Hearing':
          this.progressCircleColor = 'red';
          break;
        case 'Solved':
          this.progressCircleColor = 'green';
          break;
        default:
          this.progressCircleColor = 'red';
      }
    },
  },
};
</script>



<style scoped>
.main-content {
  margin-top: 1em;
}

.side-content {
  margin-right: 1.4em;
  margin-left: 1em;
}

.scrollable-container {
  max-height: 75vh;
  margin-top: 1em;
  margin-left: 1em;
  overflow-y: auto;
}

.display-container {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  margin-bottom: 1em;
}

.v-card {
  cursor: pointer;
  margin-bottom: 16px;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn {
  margin-right: 8px;
}

.v-toolbar {
  background-color: transparent !important;
  margin-left: 2em;
}

.v-table__wrapper {
  border-radius: 10px;
}

.v-table__wrapper table thead th {
  background-color: #3A53A5 !important;
  color: #f8f8f8;
}

.v-table tbody {
  font-size: 1.1rem !important;
  background-color: #f0f0f0 !important;
}

.v-table-row {
  color: black !important;
}

.v-table--density-default {
  border-radius: 5px;
}

.v-toolbar .v-btn {
  background-color: #3A53A5 !important;
  color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 35px;
}

.v-toolbar .v-text-field {
  background-color: #3A53A5 !important;
  color: #ffffff;
  border-radius: 10px;
}

.display-container {
  background-color: #f0f0f0 !important;
  border-radius: 10px;
  font-size: 1.2rem !important;
}

.display-container h2 {
  text-align: center;
  font-size: 1.6rem !important;
}

.btn-edit .v-btn__content {
  padding: 12px;
}

.btn-edit {
  margin: 10px;
}

.btn-print .v-btn__content {
  padding: 12px;
}

.btn-print {
  margin: 10px;
}

.btn-del {
  margin: 10px;
}

.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.v-card-title img {
  max-width: 100%;
  height: auto;
}

.v-card-title .text-center {
  text-align: center;
}

.LogoHeader {
  display: grid;
  justify-content: space-evenly;
  align-items: center;
}


/* color indacator report status */
.color-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5em;
  /* Adjust width as needed */
  height: 100%;

}

.pending {
  background-color: #ff5733;
}

.first-hearing {
  background-color: #ff5733;
}

.second-hearing {
  background-color: #ff914d;
}

.third-hearing {
  background-color: #ffbf80;
}

.Solved {
  background-color: green;
}
</style>
