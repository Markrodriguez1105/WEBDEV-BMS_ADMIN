<template>
    <div class="ma-3">
        <v-row class="d-flex justify-space-between">
            <v-col cols="auto" class="d-flex justify-start ga-3">
                <RequestForm icon="mdi-account-multiple-plus" titleBox="New Request" />
            </v-col>
            <v-col class="d-flex ga-2 align-center" cols="4">
                <v-btn color="primary" flat>
                    {{ showOnlyDocumentType }}
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item @click="selectedDocumentType('All')">
                                <v-list-item-title>All</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-for="item in documentTypeList" :key="item.document_id"
                                :value="item.document_id" @click="selectedDocumentType(item.document_type)">
                                <v-list-item-title>{{ item.document_type }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <RequestTable :docs="filteredDocuments" @selectedRow="showSelectedRow($event)" />
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card height="auto">
                    <v-card-text v-if="selectedRow">
                        <SideProfile :selectedRow="selectedRow" />
                    </v-card-text>
                    <v-card-text v-else>
                        <h3>No Row Selected</h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            search: '',
            selectedRow: null,
            showOnlyDocumentType: 'All',
            document: [
                {
                    certification_id: "22-10118",
                    fname: "Mark Anthony",
                    mname: "Amican",
                    lname: "Rodriguez",
                    suffix: "",
                    phone_num: '09637752208',
                    email: 'markanthony.rodriguez@unc.edu.ph',
                    address: 'Zone 1, Bonifacio, San Fernando, Camarines Sur',
                    document_type: "Indegency",
                    date_request: "05-28-2024",
                    payment_status: "Paid",
                    purpose: 'Scholarship'
                },
            ]
        }
    },
    methods: {
        showSelectedRow(item) {
            this.selectedRow = item;
        },
        selectedDocumentType(item) {
            this.showOnlyDocumentType = item;
        },
    },
    computed: {
        documentTypeList() {
            const seen = new Set();
            return this.document.filter(item => {
                const isDuplicate = seen.has(item.document_type);
                seen.add(item.document_type);
                return !isDuplicate;
            });
        },
        filteredDocuments() {
            let filteredDocs = this.document

            if (this.showOnlyDocumentType !== 'All') {
                filteredDocs = filteredDocs.filter(doc => doc.document_type === this.showOnlyDocumentType);
            }

            if (this.search) {
                filteredDocs = filteredDocs.filter(doc =>
                    doc.fname.toLowerCase().includes(this.search.toLowerCase()) ||
                    doc.mname.toLowerCase().includes(this.search.toLowerCase()) ||
                    doc.lname.toLowerCase().includes(this.search.toLowerCase()) ||
                    doc.document_id.toLowerCase().includes(this.search.toLowerCase())
                );
            }

            this.selectedRow = null;

            return filteredDocs;
        }
    }
}

</script>