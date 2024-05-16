<template>
    <div class="ma-3">
        <h1>Request Document</h1>
        <v-row class="ma-0" color="primary">
            <v-col>
                <v-btn width="150" size="x-large" rounded="lg" color="primary" flat>New</v-btn>
            </v-col>
            <v-col class="d-flex flex-wrap ga-3">
                <v-combobox clearable label="Filter" :items="['2024', '2023', '2022', '2021', '2020', '2019']"
                    variant="solo-filled" flat placeholder="Year"></v-combobox>
                <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat class="h-auto"></v-text-field>
            </v-col>
        </v-row>
        <div class="d-flex flex-wrap list-view">
            <div class="table">
                <RequestTable />
            </div>
            <SideProfile />
        </div>
    </div>
</template>
<script setup>
import RequestTable from '@/components/Request/RequestTable.vue'
import SideProfile from '@/components/Request/SideProfile.vue'

</script>
<style>
.search {
    padding: 0 2em 0 2em;
    border: solid .1rem black;
    border-radius: 1em;
}
.table{
    width: 80%;
}
</style>