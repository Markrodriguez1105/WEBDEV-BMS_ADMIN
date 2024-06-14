<template>
  <div>
    <v-row align-content="baseline" justify="end" class="my-1 mr-7">

      <v-col cols="auto" class="d-flex ga-2">
        <v-btn color="#b2d7ef" size="large" height="49px" prepend-icon="mdi-printer" variant="flat" align-center>
          print
        </v-btn>
        <v-select density="comfortable" width="120px" label="Year" :items="['2019', '2020', '2021']" variant="outlined"></v-select>
      </v-col>
    </v-row>
    <div class="mx-7">

      <h1 class="group-profile">Demographic Profile</h1>
      <br>
      <h3 class="pl-2 pb-2">Age Distribution</h3>


      <v-card>
        <v-table height="100%">
          <thead>
            <tr>
              <th class="text-Left">
                Zone
              </th>
              <th class="text-center  ml-16">
                1
              </th>
              <th class="text-center  ms-16">
                2
              </th>
              <th class="text-center  ms-16">
                3
              </th>
              <th class="text-center  ms-16">
                4
              </th>
              <th class="text-center  ms-16">
                5
              </th>
              <th class="text-center  ms-16">
                6
              </th>
              <th class="text-center  ms-16">
                7
              </th>
              <th class="text-center  ms-16">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="text-center ms-2"></td>
              <td v-for="num in 8" :key="num">
              <td class=" d-flex ms-2">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12 ml-2 font-weight-bold">M</div>
                  <div class="text-center ml-5 font-weight-bold">F</div>
                </div>
              </td>
              </td>
            </tr>

            <tr v-for="item in ageGroup" :key="item.group">
              <td>{{ item.group }}</td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ item.male }}</div>
                  <div class="text-center ml-2">{{ item.female }}</div>
                </div>
              </td>
              <td class="ms-2 ">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ Math.floor((Math.random() * 500) + 1) }}</div>
                  <div class="text-center ml-2">{{ Math.floor((Math.random() * 500) + 1) }}</div>
                </div>
              </td>



            </tr>

            <tr>
              <td class="text-center font-weight-bold">Total</td>
              <td class="bg-grey-lighten-1" v-for="num in 7 " :key="num">
              <td class=" d-flex ms-2">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12">{{ Math.floor((Math.random() * 500) + 1) }}</div>
                  <div class="text-center ml-2">{{ Math.floor((Math.random() * 500) + 1) }}</div>
                </div>
              </td>
              </td>
              <td class="bg-grey-lighten-1">
                <div class="d-flex justify-center">
                  <div class="text-center mr-12 font-weight-bold">{{ Math.floor((Math.random() * 500) + 1) }}</div>
                  <div class="text-center ml-2 font-weight-bold">{{ Math.floor((Math.random() * 500) + 1) }}</div>
                </div>
              </td>
            </tr>

          </tbody>
        </v-table>

      </v-card>

      <h3 class="pl-2 pb-2 mt-10">Practice Family Planning</h3>



      <v-card>
        <v-table height="auto">
          <thead>
            <tr>
              <th class="text-center">
                Zone
              </th>
              <th class="text-center  ml-16">
                CMM
              </th>
              <th class="text-center  ms-16">
                BBT
              </th>
              <th class="text-center  ms-16">
                Sypto Termal
              </th>
              <th class="text-center  ms-16">
                SDM
              </th>
              <th class="text-center  ms-16">
                LAM
              </th>
              <th class="text-center  ms-16">
                Undecided
              </th>
              <th class="text-center  ms-16">
                Withdrawal
              </th>
              <th class="text-center  ms-16">
                Rhythm
              </th>
              <th class="text-center  ms-16">
                Calendar
              </th>
              <th class="text-center  ms-16">
                Abstinence
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="index in 7" :key="index">
              <td class="text-center ms-2 ">
                {{ index }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
            </tr>

            <tr>
              <td class="text-center font-weight-bold ms-2">Total</td>
              <td v-for="num in 10 " :key="num" class="text-center ms-2 bg-grey-lighten-1">
                {{ Math.floor((Math.random() * 9) + 1) }}
              </td>
            </tr>

          </tbody>
        </v-table>

      </v-card>

      <h3 class="pl-2 pb-2 mt-10">Poverty Incedence: (Family Income) Monthly</h3>


      <v-card>
        <v-table height="auto">
          <thead>
            <tr>
              <th class="text-center">
                Zone
              </th>
              <th class="text-center  ml-16">
                5000 - Below
              </th>
              <th class="text-center  ms-16">
                6,000 - 10,000
              </th>
              <th class="text-center  ms-16">
                11,000 - 20,000
              </th>
              <th class="text-center  ms-16">
                21,000 - 25,000
              </th>
              <th class="text-center  ms-16">
                26,000 - Above
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="index in 7" :key="index">
              <td class="text-center ms-2 ">
                {{ index }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 100) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 100) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 100) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 100) + 1) }}
              </td>
              <td class="text-center ms-2 ">
                {{ Math.floor((Math.random() * 100) + 1) }}
              </td>
            </tr>

            <tr>
              <td class="text-center font-weight-bold ms-2">Total</td>
              <td v-for="num in 5 " :key="num" class="text-center ms-2 bg-grey-lighten-1">
                {{ Math.floor((Math.random() * 120) + 1) }}
              </td>
            </tr>

          </tbody>
        </v-table>

      </v-card>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ageGroup: [
        {
          group: '> 0',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '1 - 4',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '5 - 9',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '10 - 14',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '15 - 19',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '20 - 24',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '25 - 29',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '30 - 34',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '35 - 39',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '40 - 44',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '45 - 49',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '50 - 54',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '55 - 59',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '60 - 64',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '65 - 69',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
        {
          group: '70 - Above',
          male: Math.floor((Math.random() * 300) + 1),
          female: Math.floor((Math.random() * 300) + 1),
          total: 10,
        },
      ],
    }
  },
}
</script>

<style>
.v-table .v-table__wrapper>table>thead>tr>th {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: #3a53a5;
  color: white;
}

.v-table .v-table__wrapper>table {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: #eeeeee;
}

</style>
