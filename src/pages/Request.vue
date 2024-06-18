<template>
    <div class="ma-3">
        <v-row class="align-center" no-gutters>
            <v-col>
                <h1><v-icon color="teriary">mdi-file-sign</v-icon> Certification Issuance</h1>
            </v-col>
            <v-col cols="3" class="d-flex align-center">
                <v-text-field v-model="search" label="Search Name" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line>
                </v-text-field>
                <v-menu activator="menu-activator">
                    <v-list>
                        <v-list-item value="Release">
                            <v-list-item-title>Released</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" class="d-flex flex-column ga-2">
                <div style="height: 7vh; width: 10rem;">
                    <RequestForm :user="user" :getReq="getReq" icon="mdi-file-document-edit" titleBox="New Request" />
                </div>
                <v-list>
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20"
                        @click="getReq()" value="All">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-text-box-multiple-outline</v-icon>
                                <p>All Requests</p>
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

                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="getFilterPayment('Pending')" value="pending">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-clock</v-icon>
                                    <p>Pending</p>
                                </div>
                                <span>{{ getCountPayment("Pending") }}</span>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="getFilterPayment('Paid')" value="paid">
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
                            @click="getFilterRelease('Not Released')" value="notReleased">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-clock-outline</v-icon>
                                    <p>Not Released</p>
                                </div>
                                <span>{{ getCountRelease("Not Released") }}</span>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="getFilterRelease('Released')" value="released">
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

                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="getFilterDoc(item.document_type)" :value="item.document_type"
                            v-for="item in documentTypeList" :key="item.document_type">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-outline</v-icon>
                                    <p>{{ item.document_type }}</p>
                                </div>
                                <span>{{ getCountDoc(item.document_type) }}</span>
                            </div>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item color="primary" variant="text" rounded min-height="20" @click="getArchive()"
                        value="archive">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-archive-outline</v-icon>
                                <p>Archive</p>
                            </div>
                        </div>
                    </v-list-item>
                    <v-list-item color="primary" variant="text" rounded min-height="20" value="setting">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-cog</v-icon>
                                <p>Setting</p>
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
    background-color: #ededed;
    font-weight: bold;
}

.search {
    background-color: #ededed;
    border-radius: 1rem;
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
            selectFilter: '1',
            loaded: false,
            document: [],
            filtered: [],
        }
    },
    methods: {
        selectedDocumentType(item) {
            this.showOnlyDocumentType = item;
        },
        getReq() {
            this.loaded = true;
            this.filtered = [];
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getReq',
            }).then(response => {
                setTimeout(() => {
                    this.document = response.data;
                    this.filtered = this.document;
                    this.loaded = false;
                }, 1000);
            });
        },
        getCountDoc(type) {
            let count = 0;
            this.document.forEach(doc => {
                if (doc.document_type == type) {
                    count++;
                }
            });
            return count;
        },
        getCountRelease(status) {
            let count = 0;
            this.document.forEach(doc => {
                if (doc.isReleased == status) {
                    count++;
                }
            });
            return count;
        },
        getFilterRelease(type) {
            this.loaded = true;
            this.filtered = [];
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getReq',
            }).then(response => {

                setTimeout(() => {
                    this.document = response.data;
                    let filteredDocs = this.document;

                    filteredDocs = filteredDocs.filter(doc =>
                        doc.isReleased.toLowerCase() == type.toLowerCase()
                    );

                    this.filtered = filteredDocs;
                    this.loaded = false;
                }, 500);
            });

        },
        getCountPayment(status) {
            let count = 0;
            this.document.forEach(doc => {
                if (doc.payment_status == status) {
                    count++;
                }
            });
            return count;
        },
        getFilterPayment(type) {
            this.loaded = true;
            this.filtered = [];
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getReq',
            }).then(response => {

                setTimeout(() => {
                    this.document = response.data;
                    let filteredDocs = this.document;

                    filteredDocs = filteredDocs.filter(doc =>
                        doc.payment_status.toLowerCase() == type.toLowerCase()
                    );

                    this.filtered = filteredDocs;
                    this.loaded = false;
                }, 500);
            });

        },
        getFilterDoc(type) {
            this.loaded = true;
            this.filtered = [];
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getReq',
            }).then(response => {

                setTimeout(() => {
                    this.document = response.data;
                    let filteredDocs = this.document;

                    filteredDocs = filteredDocs.filter(doc =>
                        doc.document_type.toLowerCase() == type.toLowerCase()
                    );

                    this.filtered = filteredDocs;
                    this.loaded = false;
                }, 500);
            });

        },
        getArchive() {
            this.loaded = true;
            this.filtered = [];
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getArchive',
            }).then(response => {

                setTimeout(() => {
                    let filteredDocs = response.data;

                    filteredDocs = filteredDocs.filter(doc =>
                        doc.archive == 1
                    );

                    this.filtered = filteredDocs;
                    this.loaded = false;
                }, 500);
            });
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
            let filteredDocs = this.filtered;

            if (this.search) {
                filteredDocs = filteredDocs.filter(doc =>
                    doc.full_name.toLowerCase().includes(this.search.toLowerCase())
                );
            }

            return filteredDocs;
        },
    },
    mounted() {
        this.getReq();
        // this.filteredDocuments();
    }
}
</script>