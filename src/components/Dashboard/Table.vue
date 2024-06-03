<template>
    <v-table height="60vh" fixed-header>
        <thead fixed-header>
            <tr>
                <th class="text-left">Date Request</th>
                <th class="text-left">Resident Name</th>
                <th class="text-left">Document type</th>
                <th class="text-left">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in docs" :key="item.document_id" @click="RowClick(item)" class="row">
                <td>{{ item.dateRequest }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.documentType }}</td>
                <td>{{ item.paymentStatus }}</td>
            </tr>
        </tbody>
    </v-table>
</template>
<style>
.row:nth-child(odd){
    background-color: aliceblue;
}
</style>
<script>
export default {
    data() {
        return {
            docs: [
                {
                    dateRequest: '2024-06-03',
                    name: 'Mark Anthony A. Rodriguez',
                    documentType: 'Indigency',
                    paymentStatus: 'Pending'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Maria Teresa D. Cruz',
                    documentType: 'Barangay Clearance',
                    paymentStatus: 'Paid'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'John Paul S. Reyes',
                    documentType: 'Residency Certificate',
                    paymentStatus: 'Pending'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Anna Mae G. Santos',
                    documentType: 'Indigency',
                    paymentStatus: 'Paid'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Joseph C. Marquez',
                    documentType: 'Business Permit',
                    paymentStatus: 'Pending'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Kimberly A. Lopez',
                    documentType: 'Barangay Clearance',
                    paymentStatus: 'Paid'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Michael T. De Leon',
                    documentType: 'Residency Certificate',
                    paymentStatus: 'Pending'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Andrea F. Bautista',
                    documentType: 'Indigency',
                    paymentStatus: 'Paid'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Kevin R. Lim',
                    documentType: 'Business Permit',
                    paymentStatus: 'Pending'
                },
                {
                    dateRequest: '2024-06-03',
                    name: 'Jessica L. Villanueva',
                    documentType: 'Barangay Clearance',
                    paymentStatus: 'Paid'
                }
            ],
        }
    },
}
</script>