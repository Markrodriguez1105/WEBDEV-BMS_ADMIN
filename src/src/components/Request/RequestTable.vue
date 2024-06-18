<template>
    <v-table height="80vh" fixed-header>
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
                <td>{{ item.date_request }}</td>
                <td>{{ fullName(item) }}</td>
                <td>{{ item.document_type }}</td>
                <td>{{ item.payment_status }}</td>
            </tr>
        </tbody>
    </v-table>
</template>
<script>
export default {
    props: {
        docs: {
            type: Array,
        }
    },
    data() {
        return {
        }
    },
    methods: {
        RowClick(item){
            this.$emit('selectedRow', item);
        },
        fullName(item) {
            const { lname, fname, mname, suffix } = item;
            const middleInitial = mname ? `${mname.charAt(0)}.` : '';
            return `${lname}, ${fname} ${middleInitial} ${suffix}`.trim();
        },
    }
}
</script>
<style scoped>
.row{
    cursor: pointer;
}
.row:hover{
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}
</style>