<template>
    <v-row class="px-1 justify-space-between">
        <v-col class="d-flex">
            <v-btn flat :ripple="false" icon @click="getReq()" size="small">
                <v-icon>mdi-reload</v-icon>
                <v-tooltip activator="parent" location="bottom">Reload</v-tooltip>
            </v-btn>
            <v-divider vertical class="my-2"></v-divider>
            <v-btn v-if="selected.length > 0" icon variant="plain" size="small"
                @click="show()"><v-icon>mdi-archive-arrow-down-outline</v-icon><v-tooltip activator="parent"
                    location="bottom">Archive</v-tooltip>
            </v-btn>
            <v-btn v-if="selected.length > 0" icon variant="plain" size="small"
                @click="show()"><v-icon>mdi-delete-outline</v-icon><v-tooltip activator="parent"
                    location="bottom">Delete</v-tooltip>
            </v-btn>
        </v-col>
        <v-col cols="auto" class="d-flex">
            <v-divider vertical class="my-2"></v-divider>
            <v-btn icon variant="text" size="small"
                @click="collapseAll()"><v-icon>mdi-unfold-less-horizontal</v-icon><v-tooltip activator="parent"
                    location="bottom">Collapse All</v-tooltip>
            </v-btn>
        </v-col>
    </v-row>
    <v-data-table-virtual v-model="selected" show-select show-expand fixed-header :headers="headers" :items="docs"
        height="70vh" item-value="certification_id" loading-text="Loading... Please wait" :loading="loaded" :expanded="expanded">
        <template v-slot:item.payment_status="{ value }">
            <v-chip :color="paymentStatus(value)">
                {{ value }}
            </v-chip>
        </template>
        <template v-slot:item.isReleased="{ value }">
            <v-chip :color="isReleasedStatus(value)">
                {{ value }}
            </v-chip>
        </template>
        <template v-slot:item.date_request="{ value }">
            <td>{{ date(value).toLocaleDateString() }}</td>
        </template>

        <template v-slot:expanded-row="{ columns, item }">
            <tr style="background-color: rgba(0, 0, 0, .1);">
                <td></td>
                <td>
                    <p>Release Date</p>
                    <h4>{{ date(item.release_date).toLocaleDateString() }}</h4>
                </td>
                <td>
                    <p>Age</p>
                    <h4>{{ getAge(item.birth_date) }}</h4>
                </td>
                <td>
                    <p>Gender</p>
                    <h4>{{ item.gender }}</h4>
                </td>
                <td>
                    <p>Civil Status</p>
                    <h4>{{ item.civil_status }}</h4>
                </td>
                <td>
                    <p>Nationality</p>
                    <h4>{{ item.nationality }}</h4>
                </td>
                <td></td>
            </tr>
            <tr style="background-color: rgba(0, 0, 0, .1);">
                <td></td>
                <td>
                    <p>Phone Number</p>
                    <h4 style="cursor: pointer;" @click="copyToClipboard(item.phone_num)">{{ item.phone_num }}
                        <v-icon v-if="item.phone_num" size="x-small">mdi-content-copy</v-icon>
                    </h4>
                </td>
                <td>
                    <p>Email Address</p>
                    <h4 style="cursor: pointer;" @click="copyToClipboard(item.email)">{{ item.email }} <v-icon
                            v-if="item.email" size="x-small">mdi-content-copy</v-icon></h4>
                </td>
                <td>
                    <p>Remarks</p>
                    <h4>{{ item.remarks }}</h4>
                </td>
                <td>
                    <p>Purpose</p>
                    <h4>{{ item.purpose }}</h4>
                </td>
                <td :colspan="columns.length"></td>
            </tr>
            <tr style="background-color: rgba(0, 0, 0, .1);">
                <td :colspan="columns.length">
                    <div class="d-flex justify-end" v-if="item.archive == 1">
                        <v-btn icon variant="plain"><v-icon>mdi-file-restore-outline</v-icon>
                            <v-tooltip activator="parent" location="bottom">Restore</v-tooltip></v-btn>
                    </div>
                    <div class="d-flex justify-end" v-else>
                        <v-btn v-if="item.payment_status.toLowerCase() == 'paid'" icon variant="text">
                            <v-icon color="primary">mdi-printer</v-icon>
                            <v-tooltip activator="parent" location="bottom">Print</v-tooltip>
                        </v-btn>
                        <v-btn v-else icon variant="text"><v-icon>mdi-cash</v-icon><v-tooltip activator="parent"
                                location="bottom">Payment</v-tooltip></v-btn>

                        <v-divider vertical class="my-2"></v-divider>

                        <v-btn
                            v-if="item.isReleased.toLowerCase() == 'not released' && item.payment_status.toLowerCase() == 'paid'"
                            icon variant="plain"><v-icon>mdi-file-move-outline</v-icon>
                            <v-tooltip activator="parent" location="bottom">Release</v-tooltip></v-btn>
                        <v-btn icon variant="plain"><v-icon>mdi-pencil</v-icon><v-tooltip activator="parent"
                                location="bottom">Edit</v-tooltip></v-btn>
                        <v-btn icon variant="plain"><v-icon>mdi-archive-arrow-down-outline</v-icon>
                            <v-tooltip activator="parent" location="bottom">Archive</v-tooltip></v-btn>
                        <v-btn icon variant="plain"><v-icon>mdi-email-fast-outline</v-icon>
                            <v-tooltip activator="parent" location="bottom">Send Message</v-tooltip></v-btn>
                    </div>
                </td>
            </tr>
        </template>
    </v-data-table-virtual>
    <!-- <v-progress-linear v-else :indeterminate="loaded" color="primary"></v-progress-linear> -->
</template>
<script>
import axios from 'axios';

export default {
    props: {
        docs: {
            type: Array,
        },
        loaded: {
            type: Boolean,
        },
        getReq: {
            type: Function,
        }
    },
    data() {
        return {
            selected: [],
            expanded: [],
            headers: [
                { title: 'Date Requested', align: 'start', width: 200, key: 'date_request' },
                { title: 'Name', align: 'start', width: 300, key: 'full_name' },
                { title: 'Document Type', align: 'start', width: 200, key: 'document_type' },
                { title: 'Payment Status', align: 'start', width: 200, key: 'payment_status' },
                { title: 'Release Status', align: 'start', width: 200, key: 'isReleased' },
            ]
        }
    },
    methods: {
        fullName(item) {
            const { lname, fname, mname, suffix } = item;
            const middleInitial = mname ? `${mname.charAt(0)}.` : '';
            return `${lname}, ${fname} ${middleInitial} ${suffix}`.trim();
        },
        date(date) {
            return new Date(date);
        },
        paymentStatus(payment) {
            if (payment.toLowerCase() == 'paid') {
                return 'green';
            } else {
                return 'red';
            }
        },
        isReleasedStatus(value) {
            if (value.toLowerCase() == 'released') {
                return 'green';
            } else {
                return 'red';
            }
        },
        getAge(birth_date) {
            const today = new Date();
            const birthDate = new Date(birth_date);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        copyToClipboard(text) {
            navigator.clipboard.writeText(text);
        },
        show() {
            console.log(this.selected);
        },
        collapseAll() {
            this.expanded = [];
        },
        toggleExpand(certification_id) {
            if (this.expanded === certification_id) {
                this.expanded = null; // Collapse if clicking on the same row
            } else {
                this.expanded = certification_id; // Expand the clicked row
            }
        },
    },
    watch: {
        loaded(newVal) {
            if (newVal) {
                this.selected = [];
                this.expanded = [];
            }
        },
    },
}
</script>