<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1
          style="
            text-align: center;
            font-size: 32px;
            margin-top: 5px;
            color: #3a53a5;
          "
        >
          Cedula
        </h1>
      </v-col>
    </v-row>

    <v-row
      class="d-flex justify-space-between align-start mx-3"
      style="margin-top: -25px"
    >
      <v-col cols="6" class="d-flex justify-start" style="">
        
        <!--ADD BUTTON-->
        <v-btn
          @click="toggleDialog"
          style="
            background-color: #3a53a5;
            color: white;
            
            max-width: 10px;
          "
        >
          Add
        </v-btn>
      </v-col>


      <!--SEARCH AND YEAR-->
      <v-col cols="6" class="d-flex justify-end ga-5">
        <v-select
          :items="filterOptions"
          v-model="yearFilter"
          class="filter-select"
          variant="outlined"
          density="compact"
          @change="applyFilter"
          style="max-width: 120px"
          label=""
        ></v-select>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="search-bar"
          variant="outlined"
          density="compact"
          style="max-width: 280px"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="" style="margin-top: -28px">
      <v-col cols="9">
        <div class="ml-7">
          <v-table
            class="mb-10"
            height="480px"
            max-height="700px"
            fixed-header
            :search="search"
            hover
          >
            <thead>
              <tr>
                <th class="text-left">Cedula Number</th>
                <th class="text-left">Full Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Gender</th>
                
                <th class="text-left">Date Issued</th>
               
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredItems"
                :key="item.id"
                @click="onRowClicked(item)"
              >
                <td>{{ item.id }}</td>
                <td>
                  {{ item.lastName }}, {{ item.firstName }}
                  {{ item.middleName ? item.middleName + " " : "" }}
                </td>
                <td>{{ item.address }}</td>
                <td>{{ item.gender }}</td>
               
                <td>{{ item.dateIssued }}</td>
                
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>
      <v-col cols="3">
        <v-card
          class="mr-5 border-e-thin border-s-thin bg-white"
          elevation="0"
          height="480px"
        >
          <p
            class="text-center text-h8 py-3"
            style="background-color: #3a53a5; color: white"
            height="480px"
          >
            Information
          </p>
          <v-card
            max-height="700"
            class="overflow-y-auto"
            elevation="0"
            height="370px"
            v-if="selectedItem"
          >
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
              <p class="font-weight-light ml-3 text-caption">Profession:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.profession }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Business:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.business }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Citizenship:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.citizenship }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Date Issued:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.dateIssued }}
              </p>
              <p class="font-weight-light ml-3 text-caption">TIN (if any)</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.tinNo }}
              </p>
              <p class="font-weight-light ml-3 text-caption">ICR (if Alien)</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.icrNo }}
              </p>
              <p class="font-weight-light ml-3 text-caption">Place of Issue:</p>
              <p class="font-weight-regular ml-3 mb-2 text-h8">
                {{ selectedItem.placeIssued }}
              </p>
            </div>
          </v-card>
          <div v-else class="border-b-thin" style="background-color: white">
            <p
              class="font-weight-regular text-h9 d-flex justify-center"
              style="margin-top: 180px"
              elevation="0"
            >
              No item selected
            </p>
          </div>

          <!-- Edit and Delete Button -->
          <div class="text-center mt-4" v-if="selectedItem">
            <div>
              <v-row justify="center">
                <v-btn
                  icon
                  @click.stop="editItem(selectedItem)"
                  style="
                    border-radius: 0;
                    background-color: #3a53a5;
                    color: white;
                  "
                  class="rounded mx-4 margin-top: 10px"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click.stop="deleteItem(selectedItem)"
                  style="
                    border-radius: 0;
                    background-color: #f44336;
                    color: white;
                  "
                  class="rounded mx-4 margin-top: 10px"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!--PERSONAL INFORMATION CEDULA-->
    <v-dialog v-model="showDialog">
      <v-card style="margin: 20px auto; padding: 20px; width: 1000px">
        <!-- Place of Issue and Date Issued -->
        <v-row>
          <v-col cols="6">
            <v-text-field
            v-model="placeIssued"
              label="Place of Issue"
              model-value="Bonifacio San Fernando, Camarines Sur"
              variant="outlined"
              readonly
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="newEntry.dateIssued"
              label="Date Issued"
              :rules="dateIssuedRules"
              required
              variant="outlined"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-form ref="form" v-model="valid">
          <h2
            style="
              text-align: center;
              font-size: 20px;
              margin-bottom: 20px;
              background-color: #3a53a5;
              color: white;
              padding: 5 px;
            "
          >
            Personal Information
          </h2>
          <!-- Cedula Number, TIN, and ICR Number -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.id"
                label="Cedula Number"
                :rules="idRules"
                required
                variant="outlined"
                placeholder="CCI2024 87896587"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.tinNo"
                label="TIN (if any)"
                :rules="tinNoRules"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.icrNo"
                label="ICR No (if Alien)"
                :rules="icrNoRules"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Name Fields -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.lastName"
                label="Last Name"
                :rules="lastNameRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.firstName"
                label="First Name"
                :rules="firstNameRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.middleName"
                label="Middle Name"
                :rules="middleNameRules"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Sex and Citizenship -->
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="newEntry.gender"
                :items="['Male', 'Female']"
                label="Sex"
                :rules="genderRules"
                required
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.citizenship"
                label="Citizenship"
                :rules="citizenshipRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Address -->
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newEntry.address"
                label="Address"
                :rules="addressRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Place of Birth and Date of Birth -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.placeOfBirth"
                label="Place of Birth"
                :rules="placeOfBirthRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.birthdate"
                label="Birthdate"
                :rules="birthdateRules"
                required
                variant="outlined"
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.contactNumber"
                label="Contact Number"
                :rules="contactNumberRules"
                required
                variant="outlined"
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.email"
                label="Email"
                :rules="emailRules"
                required
                variant="outlined"
                type="email"
                prepend-inner-icon="mdi-email"
                suffix="@gmail.com"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Height, Weight, Civil Status -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.height"
                label="Height"
                :rules="heightRules"
                required
                variant="outlined"
                type="number"
                suffix="cm"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.weight"
                label="Weight"
                :rules="weightRules"
                required
                variant="outlined"
                type="number"
                suffix="kg"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="newEntry.civilStatus"
                :items="[
                  'Single',
                  'Married',
                  'Widowed',
                  'Legally Separated',
                  'Divorced',
                ]"
                label="Civil Status"
                :rules="civilStatusRules"
                required
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>

          <!-- Profession, Occupation, Business -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.profession"
                label="Profession"
                :rules="professionRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.occupation"
                label="Occupation"
                :rules="occupationRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.business"
                label="Business"
                :rules="businessRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <h2
            style="
              text-align: center;
              font-size: 20px;
              margin-bottom: 20px;
              background-color: #3a53a5;
              color: white;
              padding: 5 px;
            "
          >
            <!--PAYMENT INFORMATION-->
            Payment Information
          </h2>
          <h3 style="font-size: 16px; margin-bottom: 20px">
            Note: Don't use comma (,) for entering GROSS RECEIPT, SALARY, REAL
            PROPERTY
          </h3>

          <!-- BASIC TAX-->
          <v-row>
            <v-col cols="6">
              <v-card
                text="A. Basix Community Tax:"
                variant="plain"
                style="margin-bottom: -30px; margin-top: -20px"
              >
              </v-card>

              <v-card
                text="(₱5.00) Voluntary or Excempted (₱1.00)"
                variant="plain"
              >
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-col> </v-col>
              <v-text-field
                v-model="basicTax"
                variant="outlined"
                model-value="5.00"
                readonly=""
                prefix="₱"
              >
              </v-text-field>
            </v-col>

            <v-row> </v-row>
          </v-row>

          <!--ADD COMM TAX-->
          <!--GROSS-->
          <v-row>
            <v-col cols="6">
              <v-card
                text="B. Additional Community Tax:"
                variant="plain"
                style="margin-bottom: -30px; margin-top: -45px"
              >
              </v-card>

              <v-card
                text="1. Gross Receipt or Earnings Derived from Business Duirng the  Preceding Year (Annual):"
                variant="plain"
              >
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="basicTax" variant="outlined"
              prefix="₱"
              >
                
              </v-text-field>
            </v-col>
          </v-row>
          <!--SALARIES-->
          <v-row>
            <v-col cols="6">
              <v-card
                text="2. Salaries or Gross Receipt or Earnings Derived from Exercise of Profession or pursuit of any occupation (Annual):"
                variant="plain"
                style="margin-bottom: -30px; margin-top: -45px"
              >
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="professionEarnings" variant="outlined"
              prefix="₱"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!--INCOME-->
          <v-row>
            <v-col cols="6">
              <v-card
                text="3. Income from Real Property (Annual):"
                variant="plain"
                style="margin-bottom: -30px; margin-top: -45px"
              >
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="professionEarnings"
                variant="outlined"
                style="margin-top: -20px"
                prefix="₱"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <!--COMPUTATION-->

          <v-row>
            <v-col cols="6"> </v-col>
            <v-col cols="6" style="margin-top: -20px">
              <v-text-field
                label="TOTAL"
                model-value="AMOUNT TOTAL"
                variant="outlined"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6"> </v-col>
            <v-col cols="6" style="margin-top: -20px">
              <v-text-field
                label="INTEREST"
                model-value="TOTAL INTEREST"
                variant="outlined"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6"> </v-col>
            <v-col cols="6" style="margin-top: -20px">
              <v-text-field
                label="TOTAL AMOUNT PAID"
                model-value="PAID"
                variant="outlined"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Buttons -->
          <div style="display: flex; justify-content: center; margin-top: 20px">
            <v-btn
              @click="saveEntry"
              :disabled="!valid"
              style="
                background-color: #3a53a5;
                color: white;
                margin: 0 10px;
                width: 100px;
              "
            >
              Save
            </v-btn>
            <v-btn
              @click="toggleDialog"
              style="
                background-color: white;
                color: #424141;
                margin: 0 10px;
                width: 100px;
                border: 0.001 solid #282727;
              "
            >
              Cancel
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      showDialog: false,
      selectedItem: null,
      newEntry: {
        id: "",
        tinNo: "",
        lastName: "",
        firstName: "",
        middleName: "",
        address: "",
        gender: "",
        birthdate: "",
        placeOfBirth: "",
        contactNumber: "",
        email: "",
        occupation: "",
        profession: "",
        business:"",
        civilStatus: "",
        citizenship: "",
        height: "",
        weight: "",
        dateIssued: "",
        placeOfIssue: "",

      },
      valid: true,
      filterOptions: ["All", "2021", "2022", "2023", "2024", "2025", "2026"],
      yearFilter: "All",
  

      //SAMPLE DATA
      items: [
        {
          id: "CCI2024 67325489",
          lastName: "Paronda",
          firstName: "Weneilyn",
          middleName: "Beriso",
          address: "123 Main St",
          gender: "Male",
          birthdate: "1990-01-01",
          paymentStatus: "Valid",
          height: 180,
          weight: 75,
          placeOfBirth: "City A",
          email: "john.doe@example.com",
          contactNumber: "123456789",
          civilStatus: "Single",
          occupation: "Engineer",
          citizenship: "Country A",
          dateIssued: "2022-01-01",
          tinNo: "123-456-789",
        },
        {
      id: "CCI2024 35341922",
      lastName: "Nelson",
      firstName: "Tammy",
      middleName: "Micheal",
      address: "0718 Mccarty Parkway Suite 853, East Veronica, WA 32341",
      gender: "Male",
      birthdate: "1940-03-03",
      paymentStatus: "Valid",
      height: 154,
      weight: 72,
      placeOfBirth: "Beckton",
      email: "kennethbrown@gmail.com",
      contactNumber: "025-270-3498",
      civilStatus: "Widowed",
      occupation: "Lawyer",
      citizenship: "Mauritania",
      dateIssued: "2020-05-03",
      tinNo: "133-372-872",
    },
    {
      id: "CCI2024 89314176",
      lastName: "Stevens",
      firstName: "Timothy",
      middleName: "Juan",
      address: "88948 Paul Light Apt. 510, Jacobton, NV 27784",
      gender: "Male",
      birthdate: "1940-08-08",
      paymentStatus: "Valid",
      height: 167,
      weight: 57,
      placeOfBirth: "Port Davidfurt",
      email: "adamsmichael@lynch.com",
      contactNumber: "(030)014-8553x652",
      civilStatus: "Divorced",
      occupation: "Teacher",
      citizenship: "Croatia",
      dateIssued: "2023-12-05",
      tinNo: "766-666-278",
    },
    {
      id: "CCI2024 37996786",
      lastName: "Martin",
      firstName: "Dale",
      middleName: "Jeff",
      address: "474 Ruth Ranch Apt. 263, Lake Haleyfurt, GA 98867",
      gender: "Male",
      birthdate: "1985-08-13",
      paymentStatus: "Valid",
      height: 198,
      weight: 95,
      placeOfBirth: "Maryberg",
      email: "anngonzalez@yahoo.com",
      contactNumber: "(394)550-4210x217",
      civilStatus: "Widowed",
      occupation: "Engineer",
      citizenship: "Libyan Arab Jamahiriya",
      dateIssued: "2023-08-08",
      tinNo: "255-757-266",
    },
    {
      id: "CCI2024 76579860",
      lastName: "Chung",
      firstName: "Edward",
      middleName: "Rebecca",
      address: "99810 John Squares, Amberburgh, NE 95056",
      gender: "Male",
      birthdate: "1973-01-29",
      paymentStatus: "Invalid",
      height: 176,
      weight: 85,
      placeOfBirth: "South Danielle",
      email: "melanie68@watson-cervantes.biz",
      contactNumber: "566-891-9440",
      civilStatus: "Married",
      occupation: "Developer",
      citizenship: "Rwanda",
      dateIssued: "2021-06-21",
      tinNo: "947-457-865",
    },
    {
      id: "CCI2024 58867491",
      lastName: "Kane",
      firstName: "Albert",
      middleName: "Marsha",
      address: "82630 King Rapid Apt. 950, Lake Kyleton, MT 67097",
      gender: "Female",
      birthdate: "1982-07-14",
      paymentStatus: "Invalid",
      height: 179,
      weight: 61,
      placeOfBirth: "Kaitlyntown",
      email: "trejozachary@yahoo.com",
      contactNumber: "+1-343-239-6620",
      civilStatus: "Single",
      occupation: "Nurse",
      citizenship: "Niger",
      dateIssued: "2021-06-27",
      tinNo: "618-902-734",
    },
    {
      id: "CCI2024 23640912",
      lastName: "Jones",
      firstName: "Patricia",
      middleName: "Heather",
      address: "0207 Deanna Path Apt. 666, North Shawnview, PA 89654",
      gender: "Female",
      birthdate: "1963-04-26",
      paymentStatus: "Valid",
      height: 199,
      weight: 82,
      placeOfBirth: "Millerside",
      email: "douglasjoseph@hotmail.com",
      contactNumber: "690-789-4918x6787",
      civilStatus: "Single",
      occupation: "Doctor",
      citizenship: "Heard Island and McDonald Islands",
      dateIssued: "2021-05-16",
      tinNo: "527-119-871",
    },
    {
      id: "CCI2024 52163548",
      lastName: "Clark",
      firstName: "Jessica",
      middleName: "Stephen",
      address: "04094 Jonathan Dam, New Kelly, NY 17458",
      gender: "Female",
      birthdate: "1947-10-10",
      paymentStatus: "Valid",
      height: 170,
      weight: 78,
      placeOfBirth: "East Kellyfort",
      email: "barbara28@hahn.biz",
      contactNumber: "+1-082-678-0644",
      civilStatus: "Divorced",
      occupation: "Artist",
      citizenship: "Zimbabwe",
      dateIssued: "2021-02-07",
      tinNo: "538-298-832",
    },
    {
      id: "CCI2024 50391326",
      lastName: "Cox",
      firstName: "Danielle",
      middleName: "Jessica",
      address: "2941 Gomez Union Apt. 869, East Trevor, OR 99612",
      gender: "Female",
      birthdate: "1955-02-07",
      paymentStatus: "Valid",
      height: 194,
      weight: 50,
      placeOfBirth: "Port Andrewview",
      email: "jamieray@gmail.com",
      contactNumber: "835.641.1647x7575",
      civilStatus: "Widowed",
      occupation: "Engineer",
      citizenship: "Maldives",
      dateIssued: "2020-12-04",
      tinNo: "489-417-330",
    },
    {
      id: "CCI2024 28501536",
      lastName: "Jones",
      firstName: "James",
      middleName: "Nicholas",
      address: "3994 Griffin Flats, Marshallton, TX 89721",
      gender: "Female",
      birthdate: "1975-05-17",
      paymentStatus: "Invalid",
      height: 160,
      weight: 63,
      placeOfBirth: "West Kerriborough",
      email: "wendy76@gmail.com",
      contactNumber: "+1-797-349-7818x171",
      civilStatus: "Single",
      occupation: "Developer",
      citizenship: "Central African Republic",
      dateIssued: "2024-05-21",
      tinNo: "867-954-896",
    },
    {
      id: "CCI2024 27610389",
      lastName: "Ward",
      firstName: "Tyler",
      middleName: "Tara",
      address: "551 Cox Mountains Suite 980, Dunlapshire, DE 81682",
      gender: "Female",
      birthdate: "1952-12-18",
      paymentStatus: "Invalid",
      height: 159,
      weight: 91,
      placeOfBirth: "Port Brandon",
      email: "noahwilliams@yahoo.com",
      contactNumber: "001-616-527-5991",
      civilStatus: "Single",
      occupation: "Artist",
      citizenship: "United States of America",
      dateIssued: "2023-07-28",
      tinNo: "960-111-245",
    }
       
      ],
      // Validation rules (example)
     /* idRules: [
        (v) => !!v || "Cedula number is required",
        (v) =>
          /^[A-Za-z]{3}\d{4}\s\d{8}$/.test(v) || "Cedula number is invalid",
      ],
      tinNoRules: [(v) => !v || /^\d{9}$/.test(v) || "TIN is invalid"],
      lastNameRules: [
        (v) => !!v || "Last Name is required",
        (v) => /^[A-Za-z]{2,}$/.test(v) || "Must contain at least 2 characters",
      ],
      firstNameRules: [
        (v) => !!v || "First Name is required",
        (v) => v.length >= 2 || "Must contain at least 2 characters",
        (v) =>
          /^[A-Za-z-]*$/.test(v) ||
          "Invalid characters (only letters and hyphens allowed)",
      ],

      middleNameRules: [
        (v) => !v || /^[A-Za-z.]*$/.test(v) || "Invalid input",
        (v) => !v || v.length >= 2 || "Must contain at least 2 characters",
      ],

      

      contactNumberRules: [
        (v) => !!v || "Contact Number is required",
        (v) => /^\d+$/.test(v) || "Contact Number must be valid",
        (v) => /^09\d+$/.test(v) || "Contact Number must be valid",
        (v) => v.length === 11 || "Contact Number must be valid",
      ],*/

      //genderRules: [(v) => !!v || 'Gender is required'],
      //civilStatusRules: [(v) => !!v || 'Civil Status is required'],
      //occupationRules: [(v) => !!v || 'Occupation is required'],
      //citizenshipRules: [(v) => !!v || 'Citizenship is required'],
      //dateIssued: [(v) => !!v ||'Date Issued is required'],
      //placeOfBirthRules: [(v) => !!v || 'Place of Birth is required'],
      //birthdateRules: [(v) => !!v || 'Birthdate is required'],
      //heightRules: [(v) => !!v || 'Height is required'],
      //weightRules: [(v) => !!v || 'Weight is required'],
      //addressRules: [(v) => !!v || 'Address is required'],
      // emailRules: [
        // (v) => !!v || "Email is required",
        // (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      // ],

      newEntry: {
        dateIssued: new Date().toISOString().substr(0, 10), // Set current date
      },
    };
  },
  computed: {
  filteredItems() {
    let items = this.items.slice(); // Create a shallow copy of the items array

    // Filter based on selected year of date issued
    if (this.yearFilter !== "All") {
      items = items.filter((item) => {
        const yearIssued = new Date(item.dateIssued).getFullYear().toString();
        return yearIssued === this.yearFilter;
      });
    }
    // Apply search filter for last name
    if (this.search.trim() !== "") {
      const searchTerm = this.search.trim().toLowerCase();
      items = items.filter((item) =>
        item.lastName.toLowerCase().startsWith(searchTerm)
      );
    }

    return items.map((item) => {
      let fullName = `${item.lastName}, ${item.firstName}`;
      if (item.middleName) {
        fullName += ` ${item.middleName}`;
      }
      return {
        ...item,
        fullName: fullName,
      };
    });
  },
},

methods: {
  
  toggleDialog() {
  this.showDialog = !this.showDialog;
  const currentDate = new Date(); // Get current date and time
  const currentDay = currentDate.getDate(); // Get the day of the month
  const currentMonth = currentDate.getMonth() + 1; // Get the month (0-indexed, thus +1)
  const currentYear = currentDate.getFullYear(); // Get the year

  
  const issuedDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
  if (issuedDate !== this.newEntry.dateIssued) {
    this.newEntry.dateIssued = issuedDate;
  }
},
  saveEntry() {
    
    if (this.$refs.form.validate()) {
      
        this.newEntry.emailPrefix = this.getPrefixFromEmail();
        const index = this.items.findIndex((item) => item.id === this.newEntry.id);
        if (index !== -1) {
           
            this.items.splice(index, 1, { ...this.newEntry });
        } else {
           
            this.items.push({ ...this.newEntry });
        }
        this.resetForm();
        this.toggleDialog();
    }
},


  resetForm() {
    this.newEntry = {
      id: "",
      tinNo: "",
      lastName: "",
      firstName: "",
      middleName: "",
      placeOfBirth: "",
      birthdate: "",
      height: "",
      weight: "",
      address: "",
      email: "",
      contactNumber: "",
      gender: "",
      civilStatus: "",
      occupation: "",
      citizenship: "",
      dateIssued: "",
    };
    this.$refs.form.reset();
  },
  onRowClicked(item) {
    this.selectedItem = item;
  },
  editItem(item) {
    
    this.newEntry = { ...item };
    
    this.showDialog = true;
  },
  deleteItem(item) {
   
    const index = this.items.findIndex((i) => i.id === item.id);
  if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.selectedItem = null;

  },
  getPrefixFromEmail() {
    const email = this.newEntry.email;

    if (email && email.endsWith("@gmail.com")) {
      const prefix = email.slice(0, -"@gmail.com".length);
      return prefix;
    } else {
      return "";}
  },
}

};

</script>

<style>
.v-table th {
  background-color: #3a53a5 !important;
  color: white !important;
}
body {
  overflow: hidden; /* Disable scrolling */
}
::-webkit-scrollbar {
  width: 2px; 
}
::-webkit-scrollbar-track {
  background-color: #f1f1f1; 
}
:-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}
::-webkit-scrollbar-thumb {
  background-color: #677fcb; 
  border-radius: 6px; 
}
</style>
