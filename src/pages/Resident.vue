<template>
  <v-card height="auto">
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
      class="mt-2"
    >
      <v-tab :value="1">Residents</v-tab>
      <v-tab :value="2">tally Sheet</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        :key="1"
        :value="1"
      >
        <v-container fluid>
          <v-row>
            <v-col
              :key="1"
              cols="12"
              md="12"
            >
            <residentTable />
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>

      <v-window-item
      :key="2"
      :value="2"
    >
      <v-container fluid>
        <v-row>
          <v-col
            :key="2"
            cols="12"
            md="15"
          >
          <TallySheet />
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import ResidentTable from '../components/Dashboard/Summary.vue'
import TallySheet from '../components/Dashboard/Summary.vue'

export default {
  components: {
    ResidentTable,
    TallySheet
  },
    data: () => ({
      tab: 1,
    }),
  }
</script>
