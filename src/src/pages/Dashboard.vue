<template>
    <div class="ma-5">
        <v-row>
            <v-col>
                <Summary />
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
import Summary from '@/components/Dashboard/Summary.vue';

export default {
    data() {
        return {
            
        }
    },
}
</script>