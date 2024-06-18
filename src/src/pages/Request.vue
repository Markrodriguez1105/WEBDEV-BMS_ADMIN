<template>
    <div class="ma-3">
        <v-row class="d-flex justify-space-between">
            <v-col cols="auto" class="d-flex justify-start ga-3">
                <RequestForm :user="user" :getReq="getReq()" icon="mdi-account-multiple-plus" titleBox="New Request" />
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
    <!-- <div v-else>
        <v-main class="d-flex align-center justify-center" style="min-height: 80vh;">
            <v-alert title="System Warning" prominent max-width="50%"
                text="Restricted Access to this Page, this page is accessible by Secretary Only."
                type="warning" variant="tonal">
            </v-alert>
        </v-main>
    </div> -->
</template>
<script>
import axios from 'axios';

export default {
    props: {
        user: {
            type: Object,
        }
    },
    data() {
        return {
            search: '',
            selectedRow: null,
            showOnlyDocumentType: 'All',
            document: [],
        }
    },
    methods: {
        showSelectedRow(item) {
            this.selectedRow = item;
        },
        selectedDocumentType(item) {
            this.showOnlyDocumentType = item;
        },
        getReq() {
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getReq',
            }).then(response => {
                this.document = response.data;
            })
        }
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
    },
    mounted() {
        this.getReq();
    }
}

</script>