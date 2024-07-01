<template>
  <v-card flat>
    <v-row class="d-flex justify-space-between align-center">
      <v-container>
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Clearance Management</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-btn color="#3a53a5" @click="openClearance" class="addbtn"
                  >Add Clearance</v-btn
                >
                <v-text-field
                  v-model="search2"
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  @input="filterClearances"
                  class="search2"
                ></v-text-field> </v-row
            ></v-card-text>
            <v-data-table
              :headers="clearanceHeaders"
              :items="filteredClearances"
              class="custom-table"
            >
              <template v-slot:item="{ item }">
                <tr class="table-row">
                  <td>{{ item.clearance_id }}</td>
                  <td>{{ item.clearance_name }}</td>
                  <td>{{ item.clearance_owner_name }}</td>
                  <td>{{ item.clearance_tin }}</td>
                  <td>{{ item.date_issued }}</td>
                  <td class="action-icon">
                    <v-icon @click="editClearance(item)" color="green">
                      mdi-pencil</v-icon
                    >
                    <v-icon @click="deleteClearance(item)" color="red darken-1">
                      mdi-delete</v-icon
                    >
                    <v-icon @click="showClearanceDetails(item)">
                      mdi-format-list-bulleted</v-icon
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>

            <v-dialog v-model="formDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="form">
                    <v-select
                      v-model="form.clearance_name"
                      label="Clearance Name"
                      :items="businessRecords"
                      item-title="business_name"
                      item-value="business_name"
                      @change="updateClearanceDetails"
                      required
                    ></v-select>
                    <v-text-field
                      v-model="form.clearance_owner_name"
                      label="Owner Name"
                      required
                      readonly
                    ></v-text-field>
                    <v-text-field
                      v-model="form.clearance_tin"
                      label="TIN"
                      required
                      readonly
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeForm"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="saveClearance"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      <v-row>
        <!-- Edit Clearance Dialog -->
        <v-dialog
          v-model="showEditClearanceDialogs"
          persistent
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Edit Clearance</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="selectedClearance.clearance_name"
                  label="Clearance Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="selectedClearance.clearance_owner_name"
                  label="Owner Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="selectedClearance.clearance_tin"
                  label="TIN"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEditClearance"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveEditClearance"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>

          <!-- Delete Clearance Dialog -->
          <v-dialog
            v-model="showDeleteClearanceDialogs"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title
                >Are you sure you want to delete this clearance?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="closeDeleteClearance"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteClearanceConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Clearance Details Dialog -->

          <v-dialog
            v-model="showClearanceDetailsDialogs"
            persistent
            max-width="1000px"
          >
            <v-card>
              <v-card-title class="maintitle">
                <v-row>
                  <v-img
                    src="/src/assets/images/logo.png"
                    alt="Logos2"
                    width="100"
                  />
                  <v-col cols="6" class="text-center">
                    <p>Municipality of San Fernando</p>
                    <h1>BUSINESS RECORD</h1>
                    <p>Barangay Bonifacio</p>
                  </v-col>
                  <v-img
                    src="/src/assets/images/sflogo.png"
                    alt="Logos2"
                    width="100"
                  />
                </v-row>
              </v-card-title>
              <v-card-text class="dialogtext">
                <p>
                  <strong>Business Name</strong>
                  <span class="ClearanceDetails1"
                    >: {{ selectedClearance.clearance_name }}</span
                  >
                </p>
                <p>
                  <strong>Owner Name</strong>
                  <span class="ClearanceDetails2"
                    >: {{ selectedClearance.clearance_owner_name }}</span
                  >
                </p>
                <p>
                  <strong>TIN</strong>
                  <span class="ClearanceDetails3"
                    >: {{ selectedClearance.clearance_tin }}</span
                  >
                </p>
                <p>
                  <strong>Date Issued</strong>
                  <span class="ClearanceDetails4"
                    >: {{ selectedClearance.date_issued }}</span
                  >
                </p>
                <div>
                  <br /><br />
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This
                    certification is issued in accordance with the records
                    maintained by the Municipality of<br />
                    San Fernando. For further inquiries, please contact our
                    office.
                  </p>
                  <br />
                  <br />
                  <br />
                  <p class="sig">
                    <em><span class="Signature">Authorized Signature </span></em
                    ><br />Municipality of San Fernando
                  </p>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="blue" @click="closeClearanceDetails">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-dialog>
        <v-btn color="primary" @click="addItem" class="add-btn">Add</v-btn>
        <v-btn color="#3a53a5" @click="openDialog" class="clearancebtn"
          >Manage Clearances</v-btn
        >
      </v-row>
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
      :headers="businessHeaders"
      :items="filteredBusinessRecords"
      :search="search"
      class="custom-table"
    >
      <template v-slot:[`item`]="{ item }">
        <tr :key="item.business_id" class="table-row">
          <td>{{ item.business_id }}</td>
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
    <v-dialog v-model="showAddDialog" max-width="800px">
      <v-card>
        <!-- Dialog Title -->
        <v-card-title style="background-color: #3a53a5; color: white"
          >Add Business</v-card-title
        >

        <!-- Owner Information Section -->
        <v-card-text>
          <v-container>
            <v-card-title class="addtitles"> Owner Information </v-card-title>
            <v-row fast-fail @submit.prevent>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="newBusiness.first_name"
                  label="First Name"
                  :rules="firstNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="newBusiness.middle_name"
                  label="Middle Name"
                  :rules="middleNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="newBusiness.last_name"
                  label="Last Name"
                  :rules="lastNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.owner_phone_num"
                  label="Contact Number"
                  :rules="phoneRules"
                  prefix="+63"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.owner_email"
                  label="Email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Divider between sections -->
        <v-divider class="my-2"></v-divider>

        <!-- Business Information Section -->
        <v-card-text>
          <v-container>
            <v-row>
              <v-card-title class="addtitles">
                Business Information
              </v-card-title>

              <v-col cols="12">
                <v-text-field
                  v-model="newBusiness.business_name"
                  label="Business Name"
                  :rules="businessNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.business_type"
                  label="Business Type"
                  :rules="businessTypeRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newBusiness.monthly_income"
                  :items="incomeRanges"
                  label="Monthly Income Range"
                  item-title="label"
                  item-value="value"
                  :rules="incomeRules"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="newBusiness.vat_status"
                  label="VAT Status"
                  :items="['Registered', 'Not Registered']"
                  :rules="vatStatusRules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newBusiness.active_status"
                  label="Status"
                  :items="['Active', 'Inactive']"
                  :rules="activeStatusRules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newBusiness.address"
                  label="Address"
                  :rules="addressRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBusiness.num_employees"
                  label="No. of Employees"
                  :rules="employeesRules"
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
                      :rules="dateRules"
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
              <v-col cols="12">
                <v-text-field
                  v-model="newBusiness.tin"
                  label="Tin Number"
                  :rules="tinRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Card Actions (Buttons) -->
        <v-card-actions>
          <!-- Centering the actions -->
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
    <v-dialog v-model="showEditDialog" max-width="800px">
      <v-card>
        <!-- Dialog Title -->
        <v-card-title style="background-color: #3a53a5; color: white"
          >Update Business</v-card-title
        >

        <!-- Owner Information Section -->
        <v-card-text>
          <v-container>
            <v-card-title class="addtitles"> Owner Information </v-card-title>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="selectedBusiness.first_name"
                  label="First Name"
                  :rules="firstNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="selectedBusiness.middle_name"
                  label="Middle Name"
                  :rules="middleNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="selectedBusiness.last_name"
                  label="Last Name"
                  :rules="lastNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.owner_phone_num"
                  label="Contact Number"
                  :rules="phoneRules"
                  prefix="+63"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.owner_email"
                  label="Email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Divider between sections -->
        <v-divider class="my-2"></v-divider>

        <!-- Business Information Section -->
        <v-card-text>
          <v-container>
            <v-card-title class="addtitles">
              Business Information
            </v-card-title>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedBusiness.business_name"
                  label="Business Name"
                  :rules="businessNameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.business_type"
                  label="Business Type"
                  :rules="businessTypeRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedBusiness.monthly_income"
                  :items="incomeRanges"
                  label="Monthly Income Range"
                  item-title="label"
                  item-value="value"
                  :rules="incomeRules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedBusiness.vat_status"
                  label="VAT Status"
                  :items="['Registered', 'Not Registered']"
                  :rules="vatStatusRules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedBusiness.active_status"
                  label="Status"
                  :items="['Active', 'Inactive']"
                  :rules="activeStatusRules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedBusiness.address"
                  label="Address"
                  :rules="addressRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedBusiness.num_employees"
                  label="No. of Employees"
                  :rules="employeesRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="editDateEstablishedPicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedBusiness.date_establishment"
                      label="Date Established"
                      v-on="on"
                      type="date"
                      required
                      :rules="dateRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedBusiness.date_establishment"
                    @input="editDateEstablishedPicker = false"
                    no-title
                    required
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedBusiness.tin"
                  label="Tin Number"
                  :rules="tinRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Card Actions (Buttons) -->
        <v-card-actions class="text-center">
          <v-btn color="blue" @click="saveEdit">Save</v-btn>
          <v-btn color="red darken-1" @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Details Dialog -->
    <v-dialog
      v-model="showDetailsDialog"
      max-width="900px"
      class="details-dialog"
    >
      <v-card>
        <!-- Dialog Title -->
        <v-card-title class="maintitle">
          <v-row>
            <v-img src="/src/assets/images/logo.png" alt="Logos" width="100" />
            <v-col cols="6" class="text-center">
              <p>Municipality of San Fernando</p>
              <h1>BUSINESS RECORD</h1>
              <p>Barangay Bonifacio</p>
            </v-col>
            <v-img
              src="/src/assets/images/sflogo.png"
              alt="Logos"
              width="100"
            />
          </v-row>
        </v-card-title>
        <!-- Owner Information Section -->
        <v-card-text ref="detailsContent">
          <v-container>
            <v-card-title class="addtitles">Owner Information</v-card-title>
            <v-row>
              <v-col cols="12" sm="4">
                <v-card-title class="detail-field-title"
                  >First Name</v-card-title
                >
                <p class="ownervalue1">{{ selectedBusiness.first_name }}</p>
              </v-col>
              <v-col cols="12" sm="4">
                <v-card-title class="detail-field-title"
                  >Middle Name</v-card-title
                >
                <p class="ownervalue2">{{ selectedBusiness.middle_name }}</p>
              </v-col>
              <v-col cols="12" sm="4">
                <v-card-title class="detail-field-title"
                  >Last Name</v-card-title
                >
                <p class="ownervalue3">{{ selectedBusiness.last_name }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="contact">Contact Number</v-card-title>
                <p class="ownervalue4">
                  +63 {{ selectedBusiness.owner_phone_num }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="email">Email</v-card-title>
                <p class="ownervalue5">{{ selectedBusiness.owner_email }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Divider between sections -->
        <v-divider class="my-2"></v-divider>

        <!-- Business Information Section -->
        <v-card-text>
          <v-container>
            <v-card-title class="addtitles">Business Information</v-card-title>
            <v-row>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Business Name</v-card-title>
                <p class="busvalue">{{ selectedBusiness.business_name }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Business Type</v-card-title>
                <p class="busvalue">{{ selectedBusiness.business_type }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Monthly Income</v-card-title>
                <p class="busvalue">{{ selectedBusiness.monthly_income }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">VAT Status</v-card-title>
                <p class="busvalue">{{ selectedBusiness.vat_status }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Status</v-card-title>
                <p class="busvalue">{{ selectedBusiness.active_status }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Address</v-card-title>
                <p class="busvalue">{{ selectedBusiness.address }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">No. of Employees</v-card-title>
                <p class="busvalue">{{ selectedBusiness.num_employees }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">TIN Number</v-card-title>
                <p class="busvalue">{{ selectedBusiness.tin }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Date Established</v-card-title>
                <p class="busvalue">
                  {{ selectedBusiness.date_establishment }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="bustitle">Date Registered</v-card-title>
                <p class="busvalue">{{ selectedBusiness.date_registered }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Card Actions (Buttons) -->
        <v-card-actions class="text-center">
          <v-btn color="green lighten-3" icon @click="printDetails">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
          <v-btn color="blue" @click="closeDetails">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script src="./BusinessFormScript.js"></script>

<style src="./BusinessFormStyle.css" scoped></style>
