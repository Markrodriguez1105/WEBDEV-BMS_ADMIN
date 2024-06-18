<template>
    <v-row>
        <v-col class="d-flex flex-column ga-5">
            <v-text-field v-if="selectedRow.payment_status == 'Pending'" hide-details density="compact"
                label="Payment Status" v-model="selectedRow.payment_status" variant="solo" single-line readonly
                bg-color="red"></v-text-field>
            <v-text-field v-else hide-details density="compact" label="Payment Status"
                v-model="selectedRow.payment_status" variant="solo" single-line readonly
                bg-color="green"></v-text-field>
            <v-text-field hide-details density="compact" label="Document ID" v-model="selectedRow.certification_id"
                variant="outlined" readonly></v-text-field>
            <v-text-field hide-details density="compact" label="Name" v-model="fullName" variant="outlined"
                readonly></v-text-field>
            <v-text-field hide-details density="compact" label="Email" v-model="selectedRow.email" variant="outlined"
                readonly></v-text-field>
            <v-text-field hide-details density="compact" label="Phone Number" v-model="selectedRow.phone_num"
                variant="outlined" readonly></v-text-field>
            <v-text-field hide-details density="compact" label="Address" v-model="selectedRow.address"
                variant="outlined" readonly></v-text-field>
            <v-text-field hide-details density="compact" label="Document Type" v-model="selectedRow.document_type"
                variant="outlined" readonly></v-text-field>
            <v-text-field hide-details density="compact" label="Purpose" v-model="selectedRow.purpose"
                variant="outlined" readonly></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn width="100%" color="primary" flat>
                Action
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item v-if="selectedRow.payment_status == 'Pending'">
                            <RequestPayment :selectedRow="selectedRow" titleBox="Payment" icon="mdi-cash" />
                        </v-list-item>
                        <v-list-item v-if="selectedRow.payment_status != 'Pending'">
                            <v-btn class="w-100" flat color="primary">Print</v-btn>
                        </v-list-item>
                        <v-list-item v-if="selectedRow.payment_status == 'Pending'">
                            <RequestForm icon="mdi-account-multiple-plus" titleBox="Edit Info"
                                :selectedRow="selectedRow" />
                        </v-list-item>
                        <v-list-item>
                            <v-btn class="w-100" variant="outlined" @click="">Remove</v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        selectedRow: {
            type: Object
        }
    },
    data() {
        return {
        }
    },
    computed: {
        fullName() {
            const { lname, fname, mname, suffix } = this.selectedRow;
            const middleInitial = mname ? `${mname.charAt(0)}.` : '';
            return `${lname}, ${fname} ${middleInitial} ${suffix}`.trim();
        }
    }
}
</script>