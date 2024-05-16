<template>
    <v-table height="400" fixed-header>
        <thead class="header">
            <tr>
                <th class="text-left">
                    Date Recorded
                </th>
                <th class="text-left">
                    Full Name
                </th>
                <th class="text-left">
                    Document Type
                </th>
                <th class="text-left">
                    Payment Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in document" :key="item.documend_id" style="cursor: pointer;" @click="">
                <td>{{ item.document_recorded }}</td>
                <td>{{ item.fname + " " + item.mname.charAt(0) + " " + item.lname }}</td>
                <td>{{ item.document_type }}</td>
                <td>{{ item.payment_status }}</td>
            </tr>
        </tbody>
    </v-table>
</template>
<script>
export default {
    data() {
    return {
        document: [
            {
                document_id: "22-10118",
                document_recorded: "01-01-2023",
                fname: "Mark Anthony",
                mname: "Amican",
                lname: "Rodriguez",
                category: "Certificate",
                document_type: "Indegency",
                payment_status: "Pending",
            },
            {
                document_id: "22-10119",
                document_recorded: "02-14-2023",
                fname: "Jane",
                mname: "Marie",
                lname: "Doe",
                category: "License",
                document_type: "Business",
                payment_status: "Paid",
            },
            {
                document_id: "22-10120",
                document_recorded: "03-22-2023",
                fname: "John",
                mname: "Paul",
                lname: "Smith",
                category: "Permit",
                document_type: "Building",
                payment_status: "Pending",
            },
            {
                document_id: "22-10121",
                document_recorded: "04-15-2023",
                fname: "Emily",
                mname: "Rose",
                lname: "Johnson",
                category: "Certificate",
                document_type: "Residency",
                payment_status: "Paid",
            },
            {   
                document_id: "22-10122",
                document_recorded: "05-05-2023",
                fname: "Michael",
                mname: "James",
                lname: "Brown",
                category: "License",
                document_type: "Professional",
                payment_status: "Pending",
            },
            {
                document_id: "22-10118",
                document_recorded: "01-01-2023",
                fname: "Mark Anthony",
                mname: "Amican",
                lname: "Rodriguez",
                category: "Certificate",
                document_type: "Indegency",
                payment_status: "Pending",
            },
            {
                document_id: "22-10119",
                document_recorded: "02-14-2023",
                fname: "Jane",
                mname: "Marie",
                lname: "Doe",
                category: "License",
                document_type: "Business",
                payment_status: "Paid",
            },
            {
                document_id: "22-10120",
                document_recorded: "03-22-2023",
                fname: "John",
                mname: "Paul",
                lname: "Smith",
                category: "Permit",
                document_type: "Building",
                payment_status: "Pending",
            },
            {
                document_id: "22-10121",
                document_recorded: "04-15-2023",
                fname: "Emily",
                mname: "Rose",
                lname: "Johnson",
                category: "Certificate",
                document_type: "Residency",
                payment_status: "Paid",
            },
            {   
                document_id: "22-10122",
                document_recorded: "05-05-2023",
                fname: "Michael",
                mname: "James",
                lname: "Brown",
                category: "License",
                document_type: "Professional",
                payment_status: "Pending",
            },
            {
                document_id: "22-10118",
                document_recorded: "01-01-2023",
                fname: "Mark Anthony",
                mname: "Amican",
                lname: "Rodriguez",
                category: "Certificate",
                document_type: "Indegency",
                payment_status: "Pending",
            },
            {
                document_id: "22-10119",
                document_recorded: "02-14-2023",
                fname: "Jane",
                mname: "Marie",
                lname: "Doe",
                category: "License",
                document_type: "Business",
                payment_status: "Paid",
            },
            {
                document_id: "22-10120",
                document_recorded: "03-22-2023",
                fname: "John",
                mname: "Paul",
                lname: "Smith",
                category: "Permit",
                document_type: "Building",
                payment_status: "Pending",
            },
            {
                document_id: "22-10121",
                document_recorded: "04-15-2023",
                fname: "Emily",
                mname: "Rose",
                lname: "Johnson",
                category: "Certificate",
                document_type: "Residency",
                payment_status: "Paid",
            },
            {   
                document_id: "22-10122",
                document_recorded: "05-05-2023",
                fname: "Michael",
                mname: "James",
                lname: "Brown",
                category: "License",
                document_type: "Professional",
                payment_status: "Pending",
            }
        ]
    }
},
}
</script>
<style scoped>

</style>