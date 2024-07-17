<template>
    <div class="ma-3 position-relative">
        <v-row class="align-center" no-gutters>
            <v-col>
                <h1><v-icon color="teriary">mdi-file-sign</v-icon> Certification Issuance</h1>
            </v-col>
            <v-col cols="3" class="d-flex align-center">
                <v-text-field v-model="search" label="Search Name" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line>
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" class="d-flex flex-column ga-2">
                <div style="height: 7vh; width: 10rem;">
                    <v-btn :disabled="user.position_id != 3" height="100%" width="100%" id="activator-target"
                        prepend-icon="mdi-file-document-edit" variant="flat" color="primary">New Request
                    </v-btn>
                    <RequestForm :getReq="getReq" icon="mdi-file-document-edit" titleBox="New Request" />
                </div>
                <v-list mandatory v-model:selected="navSelected">
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20"
                        @click="getReq()" value="all">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-text-box-multiple-outline</v-icon>
                                <p>All Requests</p>
                            </div>
                            <span>{{ countAllDocument }}</span>
                        </div>
                    </v-list-item>
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20" @click="getApproved()"
                        value="approved">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-thumb-up-outline</v-icon>
                                <p>Approved</p>
                            </div>
                        </div>
                    </v-list-item>
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20" @click="getPending()"
                        value="pending">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-file-clock-outline</v-icon>
                                <p>Pending</p>
                            </div>
                        </div>
                    </v-list-item>
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20" @click="getDeclined()"
                        value="declined">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-thumb-down-outline</v-icon>
                                <p>Declined</p>
                            </div>
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
                            @click="getFilterPayment(0)" value="not paid">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-clock</v-icon>
                                    <p>Not Paid</p>
                                </div>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="getFilterPayment(1)" value="paid">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-check</v-icon>
                                    <p>Paid</p>
                                </div>
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
                            @click="document = getFilterRelease(0)" value="not_released">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-clock-outline</v-icon>
                                    <p>Not Released</p>
                                </div>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="document = getFilterRelease(1)" value="released">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-check-outline</v-icon>
                                    <p>Released</p>
                                </div>
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
                            @click="getByCategory(item.document_id)" :value="item.document_id"
                            v-for="item in document_type" :key="item.document_type">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-outline</v-icon>
                                    <p>{{ item.document_type }}</p>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list-group>
                    <!-- <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20" @click="getArchive()"
                        value="archive">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-archive-outline</v-icon>
                                <p>Archive</p>
                            </div>
                        </div>
                    </v-list-item> -->
                    <!-- <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20" value="setting" @click="show()">
                        <div class="d-flex justify-space-between align-center">
                            <div class="d-flex ga-2 align-center">
                                <v-icon size="small">mdi-cog</v-icon>
                                <p>Setting</p>
                            </div>
                        </div>
                    </v-list-item> -->
                </v-list>
            </v-col>
            <v-col>
                <v-card>
                    <RequestTable :getReq="getReq" :loaded="loaded" :reload="reload" :docs="filteredDocuments" />
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<style scoped>
.popUp {
    display: flex;
    flex-direction: column;
    gap: .3rem;
    position: absolute;
    z-index: 999;
    right: 0;
}

.popUp> :nth-child(2) {
    font-size: .8rem !important;
    align-self: flex-end;
}

.popUp> :nth-child(3) {
    font-size: .5rem !important;
    align-self: flex-end;
}

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
    components: {

    },
    props: {
        user: {
            type: Object,
        }
    },
    data() {
        return {
            navSelected: ['all'],
            search: '',
            selectFilter: '1',
            loaded: false,
            document: [],
            countAllDocument: '',
            document_type: [],
            previous: ['all'],
        }
    },
    methods: {
        show() {
            console.log(this.$refs);
        },
        async fetchPhp(action) {
            try {
                const response = await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                    action: action,
                });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getReq() {
            this.loaded = true;
            const response = await this.fetchPhp('fetchAll');
            this.document = [];

            setTimeout(() => {
                if (response) {
                    this.document = response;
                }
                this.loaded = false;
            }, 1000);
        },
        async getCountDocuments() {
            const response = await this.fetchPhp('getCountDocuments');
            this.countAllDocument = response;
        },
        async getArchive() {
            this.loaded = true;
            this.document = [];
            const response = await this.fetchPhp('getArchive');

            setTimeout(() => {
                if (response) {
                    this.document = response;
                }
                this.loaded = false;
            }, 1000);
        },
        async getByCategory(document_id) {
            this.loaded = true;
            this.document = [];

            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getByCategory',
                document_id: document_id,
            }).then(response => {
                setTimeout(() => {
                    if (response.data) {
                        this.document = response.data;
                    }
                    this.loaded = false;
                }, 1000);
            });
        },
        async getApproved() {
            this.loaded = true;
            this.document = [];

            await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getApprove',
            }).then(response => {
                setTimeout(() => {
                    if (response.data) {
                        this.document = response.data;
                    }
                    this.loaded = false;
                }, 1000);
            });
        },
        async getDeclined() {
            this.loaded = true;
            this.document = [];

            await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getDeclined',
            }).then(response => {
                setTimeout(() => {
                    if (response.data) {
                        this.document = response.data;
                    }
                    this.loaded = false;
                }, 1000);
            });
        },
        async getPending() {
            this.loaded = true;
            this.document = [];

            await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getPending',
            }).then(response => {
                setTimeout(() => {
                    if (response.data) {
                        this.document = response.data;
                    }
                    this.loaded = false;
                }, 1000);
            });
        },
        getFilterPayment(status) {
            this.loaded = true;
            this.document = [];

            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getFilterPayment',
                status: status,
            }).then(response => {
                setTimeout(() => {
                    if (response.data) {
                        this.document = response.data;
                    }
                    this.loaded = false;
                }, 1000);
            });
        },
        getFilterRelease(status) {
            this.loaded = true;
            this.document = [];

            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getFilterRelease',
                status: status,
            }).then(response => {
                setTimeout(() => {
                    if (response.data) {
                        this.document = response.data;
                    }
                    this.loaded = false;
                }, 1000);
            });
        },
        reload() {
            switch (this.navSelected.toLocaleString()) {
                case "all":
                    this.getReq();
                    break
                case "archive":
                    this.getArchive();
                    break;
                case "not_released":
                    this.getFilterRelease("Not Released");
                    break;
                case "released":
                    this.getFilterRelease("Released");
                    break;
                case "paid":
                    this.getFilterPayment("1");
                    break;
                case "not paid":
                    this.getFilterPayment("0");
                    break;
                case "approved":
                    this,this.getApproved();
                    break;
                case "pending":
                    this.getPending();
                    break;
                case "declined":
                    this.getDeclined();
                    break;
                default:
                    this.getByCategory(this.navSelected.toLocaleString());
                    break;
            }
            this.getCountDocuments();
            this.documentTypeList();
        },
        async documentTypeList() {
            const response = await this.fetchPhp('getDocumentType');
            this.document_type = response;
        },
    },
    computed: {
        filteredDocuments() {
            let filteredDocs = this.document;

            if (this.search) {
                filteredDocs = filteredDocs.filter(doc =>
                    doc.full_name.toLowerCase().includes(this.search.toLowerCase())
                );
            }
            return filteredDocs;
        },
    },
    mounted() {
        this.reload();
    },
}
</script>