<template>
  <div
    style="position: fixed; width: 96%; background-color: white; z-index: 1000"
  >
    <v-row
      class="d-flex justify-space-between align-start mx-3"
      style="margin-top: -20px; display: flex; flex-wrap: wrap"
    >
      <v-col
        cols="18"
        md="auto"
        class="d-flex justify-start"
        style="flex: 1; margin-top: 10px"
      >
        <!--ADD BUTTON-->
        <v-btn
          @click="toggleDialog"
          style="background-color: #3a53a5; color: white; max-width: 100px"
        >
          Add
        </v-btn>
      </v-col>

      <!--SEARCH AND YEAR-->
      <v-col cols="6" md="auto">
        <v-select
          :items="filterOptions"
          v-model="yearFilter"
          class="filter-select"
          variant="outlined"
          density="compact"
          @change="applyFilter"
          style="max-width: 120px"
          label=""
        >
        </v-select>
      </v-col>

      <v-col cols="3" class="d-flex justify-end align-center; position-static">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="search-bar"
          variant="outlined"
          density="compact"
          style="max-width: 330px"
        ></v-text-field
      ></v-col>
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
              <p class="font-weight-regular ml-3 mb-2 text-h8" id="address">
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
        <v-card-title style="margin-bottom: 20px; text-align: center">
          <!-- Header with the logo and title -->
          <v-row justify="space-between">
            <v-col cols="4" class="LogoHeader">
              <v-img
                src="/src/assets/images/logo.png"
                alt="Logo 1"
                width="100"
              />
            </v-col>
            <v-col cols="4" class="text-center">
              <p>Municipality of San Fernando</p>
              <P style="font-size: 30px; margin-left: -69px"
                >COMMUNITY TAX CERTIFICATE</P
              >
              <p>Barangay Bonifacio</p>
            </v-col>
            <v-col cols="4" class="LogoHeader">
              <v-img
                src="/src/assets/images/sflogo.png"
                alt="Logo 1"
                width="100"
              />
            </v-col>
          </v-row>
        </v-card-title>
        <!-- Place of Issue and Date Issued -->

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="newEntry.placeIssued"
              label="Place of Issue"
              variant="outlined"
              readonly
              prepend-inner-icon="mdi-map-marker"
              density="compact"
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
              density="compact"
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
          <!-- Cedula Number, TIN,  -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.id"
                label="Cedula Number"
                :rules="idRules"
                required
                variant="outlined"
                placeholder="CCI2024 87896587"
                @input="capitalizeID"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="newEntry.tinNo"
                label="TIN (if any)"
                :rules="tinNoRules"
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
                @input="capitalizeInput('lastName')"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.firstName"
                label="First Name"
                :rules="firstNameRules"
                required
                variant="outlined"
                @input="capitalizeInput('firstName')"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.middleName"
                label="Middle Name"
                :rules="middleNameRules"
                variant="outlined"
                @input="capitalizeInput('middleName')"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Sex and Citizenship -->
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="newEntry.gender"
                :items="['Male', 'Female']"
                label="Sex"
                :rules="genderRules"
                required
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-checkbox-btn
                v-model="notFilipino"
                label="Not a Filipino"
              ></v-checkbox-btn>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.citizenship"
                label="Citizenship"
                :rules="citizenshipRules"
                required
                variant="outlined"
                @input="capitalizeInput('citizenship')"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.icrNo"
                label="ICR No (if Alien)"
                :rules="icrNoRules"
                variant="outlined"
                :required="notFilipino"
                :disabled="!notFilipino"
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
                @input="capitalizeInput('placeOfBirth')"
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
                @input="capitalizeInput('profession')"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.occupation"
                label="Occupation"
                :rules="occupationRules"
                required
                variant="outlined"
                @input="capitalizeInput('occupation')"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newEntry.business"
                label="Business"
                :rules="businessRules"
                required
                variant="outlined"
                @input="capitalizeInput('business')"
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
            Address
          </h2>

         <!-- Address selection fields -->
<v-row style="margin-bottom: 5px">
  <!-- REGION -->
  <v-col cols="3">
    <label style="font-weight: bold">Region:</label>
    <div style="position: relative">
      <label v-show="!selectedRegion" class="v-label" style="position: absolute; top: 50%; transform: translateY(-50%); left: 12px; color: #666; pointer-events: none;">Select Region</label>
      <select v-model="selectedRegion" @change="onRegionChange" class="v-select-outlined" style="padding: 12px 40px 12px 12px; border: 1px solid #ccc; border-radius: 4px; width: 200px; font-size: 14px; cursor: pointer;">
        <option value="" disabled style="color: #999">Select Region</option>
        <option v-for="region in regions" :value="region.region_code" :key="region.region_code" style="padding: 8px">{{ region.region_name }}</option>
      </select>
    </div>
  </v-col>
  
  <!-- PROVINCE -->
  <v-col cols="3">
    <label style="font-weight: bold">Province:</label>
    <div style="position: relative">
      <label v-show="!selectedProvince" class="v-label" style="position: absolute; top: 50%; transform: translateY(-50%); left: 12px; color: #666; pointer-events: none;">Select Province</label>
      <select v-model="selectedProvince" @change="onProvinceChange" class="v-select-outlined" style="padding: 12px 40px 12px 12px; border: 1px solid #ccc; border-radius: 4px; width: 200px; font-size: 14px; cursor: pointer;">
        <option value="" disabled style="color: #999">Select Province</option>
        <option v-for="province in filteredProvinces" :value="province.province_code" :key="province.province_code">{{ province.province_name }}</option>
      </select>
    </div>
  </v-col>
  
  <!-- CITY -->
  <v-col cols="3">
    <label style="font-weight: bold">City:</label>
    <div style="position: relative">
      <label v-show="!selectedCity" class="v-label" style="position: absolute; top: 50%; transform: translateY(-50%); left: 12px; color: #666; pointer-events: none;">Select City</label>
      <select v-model="selectedCity" @change="onCityChange" class="v-select-outlined" style="padding: 12px 40px 12px 12px; border: 1px solid #ccc; border-radius: 4px; width: 200px; font-size: 14px; cursor: pointer;">
        <option value="" disabled>Select City</option>44
        <option v-for="city in filteredCities" :value="city.city_code" :key="city.city_code">{{ city.city_name }}</option>
      </select>
    </div>
  </v-col>
  
  <!-- BARANGAY -->
  <v-col cols="3">
    <label style="font-weight: bold">Barangay:</label>
    <div style="position: relative">
      <label v-show="!selectedBarangay" class="v-label" style="position: absolute; top: 50%; transform: translateY(-50%); left: 12px; color: #666; pointer-events: none;">Select Barangay</label>
      <select v-model="selectedBarangay" @change="onBarangayChange" class="v-select-outlined" style="padding: 12px 40px 12px 12px; border: 1px solid #ccc; border-radius: 4px; width: 200px; font-size: 14px; cursor: pointer;">
        <option value="" disabled>Select Barangay</option>
        <option v-for="barangay in filteredBarangays" :value="barangay.brgy_code" :key="barangay.brgy_code">{{ barangay.brgy_name }}</option>
      </select>
    </div>
  </v-col>
</v-row>
          <v-row style="margin-bottom: 5px">
            <v-col cols="3">
              <v-text-field
                v-model="newEntry.postalCode"
                label="Postal Code"
                required
                variant="outlined"
                type="text"
                :rules="postalCodeRules"
                @keypress="isNumber"
                maxlength="4"
              ></v-text-field>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="newEntry.address"
                label="Street/Building/House No."
                required
                variant="outlined"
                @input="capitalizeInput('address')"
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
            <v-divider class="mx-3"> </v-divider>
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
                style="margin-top: -15px"
              >
              </v-text-field>
            </v-col>

            <v-row> </v-row>
          </v-row>

          <!--ADD COMM TAX-->
          <!--GROSS-->
          <v-row>
            <v-divider class="mx-3" style="margin-top: -15px"> </v-divider>
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
            <v-col cols="3">
              <v-text-field
                label="Enter Gross Receipt"
                v-model="grossTax"
                variant="outlined"
                prefix="₱"
                style="margin-top: -15px"
                :rules="grossTaxRules"
                @keypress="isNumber"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="grossTaxTotal"
                variant="outlined"
                prefix="₱"
                readonly=""
                style="margin-top: -15px"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!--SALARIES-->
          <v-row>
            <v-divider class="mx-3" style="margin-top: -20px"> </v-divider>
            <v-col cols="6">
              <v-card
                text="2. Salaries or Gross Receipt or Earnings Derived from Exercise of Profession or pursuit of any occupation (Annual):"
                variant="plain"
                style="margin-top: -35px"
              >
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Enter Salaries"
                v-model="professionEarnings"
                variant="outlined"
                prefix="₱"
                style="margin-top: -15px"
                 :rules="professionEarningsRules"
                @keypress="isNumber"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="professionEarningsTotal"
                variant="outlined"
                prefix="₱"
                readonly=""
                style="margin-top: -15px"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!--INCOME-->

          <v-row>
            <v-divider class="mx-3" style="margin-top: -10px"> </v-divider>
            <v-col cols="6">
              <v-card
                text="3. Income from Real Property (Annual):"
                variant="plain"
                style="margin-bottom: -30px; margin-top: -20px"
              >
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Enter Income Real Property"
                v-model="realPropertyEarnings"
                variant="outlined"
                style="margin-top: -5px"
                prefix="₱"
                  :rules="realPropertyEarningsRules"
                @keypress="isNumber"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="realPropertyEarningsTotal"
                variant="outlined"
                style="margin-top: -5px"
                prefix="₱"
                readonly=""
              >
              </v-text-field>
            </v-col>
          </v-row>

          <!--COMPUTATION-->

          <v-row>
            <v-col cols="6"> </v-col>
            <v-col cols="6" style="margin-top: -20px">
              <v-text-field
                :value="totalDisplay"
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
                v-model="interestValue"
                variant="outlined"
                prefix="₱"
                 :rules="interestRules"
                @keypress="isNumber"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6"> </v-col>
            <v-col cols="6" style="margin-top: -20px">
              <v-text-field
                :value="paidAmountDisplay"
                variant="outlined"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Buttons -->
          <div style="display: flex; justify-content: right; margin-top: 20px">
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
import logo from "@/assets/images/logo.png";
import regions from "@/assets/region.json";
import provinces from "@/assets/province.json";
import cities from "@/assets/city.json";
import barangays from "@/assets/barangay.json";
export default {
  data() {
    return {
      //FOR ADDRESS
      regions: regions,
      selectedRegion: null,
      provinces: provinces,
      selectedProvince: null,
      cities: cities,
      selectedCity: null,
      barangays: barangays,
      selectedBarangay: null,
     
        province: '',
        city: '',
        barangay: '',
      //FOR CEDULA FORM
      logo, //bms logo
      search: "",
      showDialog: false,
      selectedItem: null,
      notFilipino: false,
      //COPUTATION
      basicTax: 5,
      grossTax: "",
      professionEarnings: "",
      realPropertyEarnings: "",
      interestValue: "",

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
        business: "",
        civilStatus: "",
        citizenship: "",
        height: "",
        weight: "",
        dateIssued: "",
        placeIssued: "",
        icrNo: "",
        postalCode: "",
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
          address: "19th Gumamela St, Door 2 Delena Apartment Naga City, Subdivision",
          gender: "Female",
          birthdate: "2003-09-04",
       
          height: 180,
          weight: 75,
          placeOfBirth: "City of Naga",
          email: "john.doe@example.com",
          contactNumber: "123456789",
          civilStatus: "Single",
          occupation: "Engineer",
          citizenship: "Filipino",
          dateIssued: "2022-01-01",
          tinNo: "123-456-789",
          placeIssued: "Bonifacio San Fernando, Camarines Sur",
        },
        {
          id: "CCI2024 23234534",
          lastName: "Gonzales",
          firstName: "Graham Russell",
          middleName: "Gogo",
          address: "2nd Gate lang",
          gender: "Female",
          birthdate: "2003-09-04",
       
          height: 180,
          weight: 75,
          placeOfBirth: "City of Naga",
          email: "john.doe@example.com",
          contactNumber: "123456789",
          civilStatus: "Single",
          occupation: "Engineer",
          citizenship: "Filipino",
          dateIssued: "2022-01-01",
          tinNo: "123-456-789",
          placeIssued: "Bonifacio San Fernando, Camarines Sur",
        },
        {
          id: "CCI2024 21436534",
          lastName: "Sibucao",
          firstName: "Raizza",
          middleName: "Nichole",
          address: "Sa san Fernando lang",
          gender: "Female",
          birthdate: "2003-09-04",
       
          height: 180,
          weight: 75,
          placeOfBirth: "City of Naga",
          email: "john.doe@example.com",
          contactNumber: "123456789",
          civilStatus: "Single",
          occupation: "Engineer",
          citizenship: "Filipino",
          dateIssued: "2022-01-01",
          tinNo: "123-456-789",
          placeIssued: "Bonifacio San Fernando, Camarines Sur",
        },
        {
          id: "CCI2024 65346512",
          lastName: "Octa",
          firstName: "Jona",
          middleName: "Ganda",
          address: "Bikal Caramoan, Camarines Sur",
          gender: "Female",
          birthdate: "2003-09-04",
       
          height: 180,
          weight: 75,
          placeOfBirth: "City of Naga",
          email: "john.doe@example.com",
          contactNumber: "123456789",
          civilStatus: "Single",
          occupation: "Engineer",
          citizenship: "Filipino",
          dateIssued: "2022-01-01",
          tinNo: "123-456-789",
          placeIssued: "Bonifacio San Fernando, Camarines Sur",
        },
        {
          id: "CCI2024 23126789",
          lastName: "Oliva",
          firstName: "Jolina",
          middleName: "Abejero",
          address: "Tabi ng dagat",
          gender: "Female",
          birthdate: "2003-09-04",
       
          height: 180,
          weight: 75,
          placeOfBirth: "City of Naga",
          email: "john.doe@example.com",
          contactNumber: "123456789",
          civilStatus: "Single",
          occupation: "Engineer",
          citizenship: "Filipino",
          dateIssued: "2022-01-01",
          tinNo: "123-456-789",
          placeIssued: "Bonifacio San Fernando, Camarines Sur",
        },
      ],
      // Validation rules (example)
     idRules: [
        (v) => !!v || "Cedula number is required",
        (v) =>
          /^[A-Za-z]{3}\d{4}\s\d{8}$/.test(v) || "Cedula number is invalid",
      ],
      tinNoRules: [(v) => !v || /^\d{9}$/.test(v) || "TIN is invalid"],
      lastNameRules: [
        (v) => !!v || "Last Name is required",
        (v) => !v || /^[A-Za-z.]*$/.test(v) || "Invalid input",
        (v) => !v || v.length >= 2 || "Must contain at least 2 characters",
      ],

      firstNameRules: [
        (v) => !!v || "First Name is required",
        (v) => v.length >= 2 || "Must contain at least 2 characters",
        (v) =>
          /^[A-Za-z-\s]*$/.test(v) ||
          "Invalid characters (only letters, hyphens, and spaces allowed)",
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
      ],

      genderRules: [(v) => !!v || "Gender is required"],
      civilStatusRules: [(v) => !!v || "Civil Status is required"],
      //occupationRules: [(v) => !!v || "Occupation is required"],
      citizenshipRules: [(v) => !!v || "Citizenship is required"],
      dateIssued: [(v) => !!v || "Date Issued is required"],
      placeOfBirthRules: [(v) => !!v || "Place of Birth is required"],
      birthdateRules: [(v) => !!v || "Birthdate is required"],
      heightRules: [(v) => !!v || "Height is required"],
      weightRules: [(v) => !!v || "Weight is required"],
      addressRules: [(v) => !!v || "Address is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      postalCodeRules: [
        (v) => !!v || "Postal Code is required",
        (v) => /^\d+$/.test(v) || "Postal Code must be numeric",
        (v) => v.length === 4 || "Postal Code must be 4 digits long",
      ],
      grossTaxRules: [
        (v) => /^\d+$/.test(v) || "Gross Receipt must be numeric",
      ],
      grossTaxRules: [
        (v) => /^\d+$/.test(v) || "Gross Receipt must be numeric",
      ],
      professionEarningsRules: [
        (v) => /^\d+$/.test(v) || "Salaries must be numeric",
      ],
      realPropertyEarningsRules: [
        (v) => /^\d+$/.test(v) || "Income in Real Property must be numeric",
      ],
      interestRules: [
        (v) => /^\d+$/.test(v) || "Interest must be numeric",
      ],

      newEntry: {
        dateIssued: new Date().toISOString().substr(0, 10), // Set current date
        placeIssued: "Bonifacio San Fernando, Camarines Sur",
      },
    };
  },
  computed: {
   
  
    interestValueFloat() {
      return parseFloat(this.interestValue) || 0; // convert interestValue to a float, defaulting to 0 if empty or NaN
    },
    paidAmount() {
      const total = parseFloat(this.totalAmount);
      const interestValue = this.interestValueFloat;

      if (isNaN(total) || isNaN(interestValue)) {
        return (total + this.basicTax).toFixed(2); // return total + basicTax as default if total or interestValue is NaN
      }

      const paidAmount = total + interestValue;
      return paidAmount.toFixed(2); // format to two decimal places
    },
    paidAmountDisplay() {
      return `TOTAL AMOUNT PAID: ₱${this.paidAmount}`; // concatenate the string with the paid amount
    },

    totalAmount() {
      const total =
        parseFloat(this.basicTax) +
        parseFloat(this.grossTaxTotal) +
        parseFloat(this.professionEarningsTotal) +
        parseFloat(this.realPropertyEarningsTotal);

      if (isNaN(total)) {
        return "5.00"; // return 5.00 (default basicTax) if total is NaN or no inputs are given
      }

      return total.toFixed(2);
    },
    totalDisplay() {
      return `TOTAL: ₱${this.totalAmount}`; // concatenate the prefix and the total amount
    },
    realPropertyEarningsTotal() {
      return (this.realPropertyEarnings / 1000).toFixed(2); // calculate 1 peso for every 1000 pesos of realPropertyEarnings
    },
    professionEarningsTotal() {
      return (this.professionEarnings / 1000).toFixed(2); // calculate 1 peso for every 1000 pesos of professionEarnings
    },
    grossTaxTotal() {
      return (this.grossTax / 1000).toFixed(2); // calculate 1 peso for every 1000 pesos of basicTax
    },

    icrNoRules() {
      let rules = [];
      if (this.notFilipino) {
        rules.push((v) => !!v || "ICR No is required");
      }
      return rules;
    },

    //ADDRESS SELECTOR FILTERING
    filteredProvinces() {
      if (!this.selectedRegion) return [];
      return this.provinces.filter(
        (province) => province.region_code === this.selectedRegion
      );
    },
    filteredCities() {
      if (!this.selectedProvince) return [];
      return this.cities.filter(
        (city) => city.province_code === this.selectedProvince
      );
    },
    filteredBarangays() {
      if (!this.selectedCity) return [];
      return this.barangays.filter(
        (barangay) => barangay.city_code === this.selectedCity
      );
    },

    dynamicCitizenshipRules() {
      return [
        (v) => {
          if (this.form.icrNo) {
            return !!v || "Citizenship is required";
          }
          return true;
        },
      ];
    },

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
    capitalizeInput(property) {
      // Capitalize the first letter of the input property
      if (this.newEntry[property]) {
        let input = this.newEntry[property];
        let isCapsLockOn = this.isCapsLockOn();
        let words = input.split(" ");
        for (let i = 0; i < words.length; i++) {
          let word = words[i];
          if (word.length > 0) {
            if (isCapsLockOn) {
              words[i] = word.toLowerCase();
            } else {
              words[i] =
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
          }
        }
        this.newEntry[property] = words.join(" ");
      }
    },
    isCapsLockOn() {
      let capsLockOn = false;
      let keyCode = event.keyCode ? event.keyCode : event.which;
      let shiftKey = event.shiftKey
        ? event.shiftKey
        : keyCode == 16
        ? true
        : false;
      if (
        (keyCode >= 65 && keyCode <= 90 && !shiftKey) ||
        (keyCode >= 97 && keyCode <= 122 && shiftKey)
      ) {
        capsLockOn = true;
      }
      return capsLockOn;
    },

    capitalizeID() {
      this.newEntry.id = this.newEntry.id.toUpperCase(); //CAPITALIZE CEDULA ID
    },
    toggleDialog() {
      this.showDialog = !this.showDialog;
      if (!this.showDialog) {
        this.resetForm(); // Reset form data when dialog is closed
      }
      const currentDate = new Date(); // Get current date and time
      const currentDay = currentDate.getDate(); // Get the day of the month
      const currentMonth = currentDate.getMonth() + 1; // Get the month (0-indexed, thus +1)
      const currentYear = currentDate.getFullYear(); // Get the year

      const issuedDate = `${currentYear}-${currentMonth
        .toString()
        .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;
      if (issuedDate !== this.newEntry.dateIssued) {
        this.newEntry.dateIssued = issuedDate;
      }
    },
    saveEntry() {
  if (this.$refs.form.validate()) {
    this.newEntry.id = this.newEntry.id.toUpperCase(); // Capitalize input for cedula number
    this.newEntry.emailPrefix = this.getPrefixFromEmail();
    
    const index = this.items.findIndex((item) => item.id === this.newEntry.id);
    if (index !== -1) {
      this.items.splice(index, 1, { ...this.newEntry });
    } else {
      this.items.push({ ...this.newEntry });
    }
    
    this.resetForm(); // Reset form after successful save
    this.toggleDialog(); // Close dialog after successful save
  }
}
,

    //ADDRESS
    getRegionName(code) {
      const region = this.regions.find(region => region.region_code === code);
      return region ? region.region_name : '';
    },
    onRegionChange() {
      this.selectedProvince = null;
      this.selectedCity = null;
      this.selectedBarangay = null;
    },
    onProvinceChange() {
      this.selectedCity = null;
      this.selectedBarangay = null;
    },
    onCityChange() {
      this.selectedBarangay = null;
    },
    onBarangayChange() {
      // No need to reset anything when barangay changes
    },

    resetForm() {
      this.selectedRegion = null;
      this.selectedProvince = null;
      this.selectedCity = null;
      this.selectedBarangay = null;

      this.newEntry = {
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
        business: "",
        civilStatus: "",
        citizenship: "",
        height: "",
        weight: "",
        dateIssued: "",
        placeIssued: "Bonifacio San Fernando, Camarines Sur",
        selectedRegion: "",
        selectedProvince: "",
        selectedCity: "",
        selectedBarangay: "",
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
        return "";
      }
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
