<template>
  <v-card flat>
    <v-row class="d-flex justify-space-between align-center">
      <v-btn color="primary" @click="addItem" class="add-btn">Add</v-btn>

      <label for="vatStatusFilter" class="filter2">VAT Status:</label>
      <select v-model="vatStatusFilter">
        <option value="all">Show All</option>
        <option value="registered">Registered</option>
        <option value="not_registered">Not Registered</option>
      </select>

      <label for="activeStatusFilter" class="filter1">Active Status:</label>
      <select v-model="activeStatusFilter" class="">
        <option value="all">Show All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="search-bar"
      ></v-text-field>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredBusinessRecords"
      :search="search"
      class="custom-table"
    >
      <template v-slot:[`item`]="{ item }">
        <tr :key="item.business_id" class="table-row">
          <td>{{ item.business_id }}</td>
          <td>{{ item.barangay_id }}</td>
          <td>{{ item.business_name }}</td>
          <td>{{ item.business_type }}</td>
          <td>{{ item.monthly_income }}</td>
          <td>{{ item.vat_status }}</td>
          <td>{{ item.active_status }}</td>
          <td class="action-icons">
            <v-icon @click="editItem(item)" color="green">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)" color="red darken-1"
              >mdi-delete</v-icon
            >
            <v-icon @click.stop="showDetails(item)"
              >mdi-format-list-bulleted</v-icon
            >
          </td>
        </tr>
      </template>

      <template v-slot:[`header`]="{}">
        <thead>
          <tr>
            <th>Business ID</th>
            <th>Barangay ID</th>
            <th>Business Name</th>
            <th>Business Type</th>
            <th>Monthly Income</th>
            <th>VAT Status</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
      </template>
    </v-data-table>

    <!-- Add Form Dialog -->
    <v-dialog v-model="showAddDialog" max-width="600px">
      <v-card>
        <v-card-title style="background-color: #3a53a5; color: white"
          >Add Business</v-card-title
        >
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Add Form Fields -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.business_name"
                  label="Business Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.business_type"
                  label="Business Type"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="newBusiness.first_name"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="newBusiness.middle_name"
                  label="Middle Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="newBusiness.last_name"
                  label="Last Name"
                  required
                  aria-errormessage="Add lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="newBusiness.middle_initial"
                  label="Middle Initial"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.monthly_income"
                  label="Monthly Income"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newBusiness.vat_status"
                  label="VAT Status"
                  :items="['Registered', 'Not Registered']"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newBusiness.active_status"
                  label="Status"
                  :items="['Active', 'Inactive']"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.owner_phone_num"
                  label="Contact Number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newBusiness.owner_email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newBusiness.address"
                  label="Address"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.num_employees"
                  label="No. of Employees"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-menu
                  v-model="addDateEstablishedPicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newBusiness.date_establishment"
                      label="Date Established"
                      v-on="on"
                      type="date"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newBusiness.date_establishment"
                    @input="addDateEstablishedPicker = false"
                    no-title
                    required
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="newBusiness.tin"
                  label="Tin Number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue lighten-1" @click="saveAdd">Save</v-btn>

          <v-btn color="red darken-1" @click="cancelAdd">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete dialog-->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title style="background-color: #3a53a5; color: white"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" variant="text" @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" variant="text" @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Form Dialog -->
    <v-dialog v-model="showEditDialog" max-width="600px">
      <v-card>
        <v-card-title style="background-color: #3a53a5; color: white"
          >Update Form</v-card-title
        >
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Edit Form Fields -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.business_name"
                  label="Business Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.business_type"
                  label="Business Type"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="selectedBusiness.first_name"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="selectedBusiness.middle_name"
                  label="Middle Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="selectedBusiness.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="selectedBusiness.middle_initial"
                  label="Middle Initial"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.monthly_income"
                  label="Monthly Income"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedBusiness.vat_status"
                  label="VAT Status"
                  :items="['Registered', 'Not Registered']"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedBusiness.active_status"
                  label="Status"
                  :items="['Active', 'Inactive']"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.owner_phone_num"
                  label="Contact Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedBusiness.owner_email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedBusiness.address"
                  label="Address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.num_employees"
                  label="No. of Employees"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.tin"
                  label="Tin Number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" @click="saveEdit">Save</v-btn>
          <v-btn color="red darken-1" @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Details Dialog -->
    <v-dialog v-model="showDetailsDialog" max-width="800px">
      <v-card>
        <v-card-title style="background-color: #3a53a5; color: white"
          >Details</v-card-title
        >
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Display Business Details -->
              <v-col cols="12" sm="6">
                <p>
                  <strong>Business Name:</strong>
                  {{ selectedBusiness.business_name }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Business Type:</strong>
                  {{ selectedBusiness.business_type }}
                </p>
              </v-col>

              <v-col cols="12" sm="6">
                <p>
                    <strong>Name:</strong> {{ selectedBusiness.last_name }},
                    {{ selectedBusiness.first_name }}
                    {{ selectedBusiness.middle_name }}
                    <template v-if="selectedBusiness.middle_initial">
                        {{ selectedBusiness.middle_initial }}.
                    </template>
                </p>
            </v-col>
            

              <v-col cols="12" sm="6">
                <p>
                  <strong>Monthly Income:</strong>
                  {{ selectedBusiness.monthly_income }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>VAT Status:</strong> {{ selectedBusiness.vat_status }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Status:</strong> {{ selectedBusiness.active_status }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Contact Number: </strong>+63
                  {{ selectedBusiness.owner_phone_num }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Email:</strong>
                  {{ selectedBusiness.owner_email }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p><strong>Address:</strong> {{ selectedBusiness.address }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>No. of Employees:</strong>
                  {{ selectedBusiness.num_employees }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p><strong>Tin Number:</strong> {{ selectedBusiness.tin }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Date Established:</strong>
                  {{ selectedBusiness.date_establishment }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Date Registered:</strong>
                  {{ selectedBusiness.date_registered }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" @click="closeDetails">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script src="./BusinessFormScript.js"></script>

<style src="./BusinessFormStyle.css" scoped></style>

