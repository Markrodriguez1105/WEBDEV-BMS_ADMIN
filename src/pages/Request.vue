<template>
    <div class="ma-3">
        <v-row class="align-center">
            <v-col>
                <h1><v-icon color="teriary">mdi-file-sign</v-icon> Certification Issuance</h1>
            </v-col>
            <v-col cols="3">
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="solo-filled"
                    flat hide-details single-line></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" class="d-flex flex-column ga-2">
                <div style="height: 7vh; width: 80%;">
                    <RequestForm :user="user" :getReq="getReq" icon="mdi-file-document-edit" titleBox="New Request" />
                </div>
                <v-list v-model="selectFilter">
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20" value="1">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-text-box-multiple-outline</v-icon>
                                <p>All Request</p>
                            </div>
                            <span>{{ document.length }}</span>
                        </div>
                    </v-list-item>
                    <v-list-group>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" class="navigationsIcons" rounded min-height="20" opened="false">
                                <div class="d-flex justify-space-between align-center">
                                    <div class="d-flex ga-2 align-center">
                                        <v-icon size="small">mdi-cash</v-icon>
                                        <p>Payment</p>
                                    </div>
                                </div>
                            </v-list-item>
                        </template>

                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary" value="pending">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-clock</v-icon>
                                    <p>Pending</p>
                                </div>
                                <span>{{ getCountPayment("Pending") }}</span>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary" value="paid">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-check</v-icon>
                                    <p>Paid</p>
                                </div>
                                <span>{{ getCountPayment("Paid") }}</span>
                            </div>
                        </v-list-item>
                    </v-list-group>
                    <v-list-group>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" class="navigationsIcons" rounded min-height="20" opened="false">
                                <div class="d-flex justify-space-between align-center">
                                    <div class="d-flex ga-2 align-center">
                                        <v-icon size="small">mdi-file-move-outline</v-icon>
                                        <p>Release</p>
                                    </div>
                                </div>
                            </v-list-item>
                        </template>

                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            value="notReleased">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-clock-outline</v-icon>
                                    <p>Not Released</p>
                                </div>
                                <span>{{ getCountRelease("Not Released") }}</span>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary" value="released">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-check-outline</v-icon>
                                    <p>Released</p>
                                </div>
                                <span>{{ getCountRelease("Released") }}</span>
                            </div>
                        </v-list-item>
                    </v-list-group>
                    <v-list-group>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" class="navigationsIcons" rounded min-height="20" opened="false">
                                <div class="d-flex justify-space-between align-center">
                                    <div class="d-flex ga-2 align-center">
                                        <v-icon size="small">mdi-format-list-group</v-icon>
                                        <p>Categories</p>
                                    </div>
                                </div>
                            </v-list-item>
                        </template>

                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary" :value="item.document_type" v-for="item in documentTypeList" :key="item.document_type">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-outline</v-icon>
                                    <p>{{ item.document_type }}</p>
                                </div>
                                <span>{{ getCountDoc(item.document_type) }}</span>
                            </div>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item color="primary" variant="text" rounded min-height="20" value="archive">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-archive-outline</v-icon>
                                <p>Archive</p>
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col>
                <v-card>
                    <RequestTable :loaded="loaded" :getReq="getReq" :docs="filteredDocuments" />
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<style scoped>
.navigationsIcons:hover {
    background-color: #d3d3d3;
    font-weight: bold;
}
</style>
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
            selectFilter: 'pending',
            loaded: false,
            showOnlyDocumentType: 'All',
            document: [],
        }
    },
    methods: {
        selectedDocumentType(item) {
            this.showOnlyDocumentType = item;
        },
        getReq() {
            this.loaded = true;
            this.document = [];
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getReq',
            }).then(response => {
                setTimeout(() => {
                    this.document = response.data;
                    this.loaded = false;
                }, 1000);
            });
        },
        getCountDoc(type){
            let count = 0;
            this.document.forEach(doc => {
                if(doc.document_type == type){
                    count++;
                }
            });
            return count;
        },
        getCountRelease(status){
            let count = 0;
            this.document.forEach(doc => {
                if(doc.isReleased == status){
                    count++;
                }
            });
            return count;
        },
        getCountPayment(status){
            let count = 0;
            this.document.forEach(doc => {
                if(doc.payment_status == status){
                    count++;
                }
            });
            return count;
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

            if (this.search) {
                filteredDocs = filteredDocs.filter(doc =>
                    doc.fname.toLowerCase().includes(this.search.toLowerCase()) ||
                    doc.mname.toLowerCase().includes(this.search.toLowerCase()) ||
                    doc.lname.toLowerCase().includes(this.search.toLowerCase())
                );
            }

            return filteredDocs;
        }
    },
    mounted() {
        this.getReq();
    }
}

</script>