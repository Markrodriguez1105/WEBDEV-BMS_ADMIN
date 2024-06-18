<template>
    <div class="ma-5">
        <v-row align="center" justify="center">
            <v-col>
                <v-card class="mx-auto justify-center align-center d-flex flex-column" height="150" link
                    color="primary">
                    <h3>Population</h3>
                    <h1 style="font-size: 3rem;">{{ population }}</h1>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto justify-center align-center d-flex flex-column" height="150" link
                    color="primary">
                    <h3>Household</h3>
                    <h1 style="font-size: 3rem;">{{ household }}</h1>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto justify-center align-center d-flex flex-column" height="150" link
                    color="primary">
                    <h3>Businesses</h3>
                    <h1 style="font-size: 3rem;">{{ businesses }}</h1>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto justify-center align-center d-flex flex-column" height="150" link
                    color="primary">
                    <h3>Blotter</h3>
                    <h1 style="font-size: 3rem;">{{ blotter }}</h1>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto justify-center align-center d-flex flex-column" height="150" link
                    color="primary">
                    <h3>Voters</h3>
                    <h1 style="font-size: 3rem;">{{ voters }}</h1>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h2>Recent Transaction</h2>
                <Table />
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            population: '5342',
            household: '1234',
            businesses: '443',
            blotter: '35',
            voters: '4234',
            
        }
    }
}
</script>