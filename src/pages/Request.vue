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
                    <v-btn :disabled="user.position_id != 3" height="100%" width="100%"
                        prepend-icon="mdi-file-document-edit" variant="flat" color="primary">New Request
                        <RequestForm :getReq="getReq" icon="mdi-file-document-edit" titleBox="New Request" />
                    </v-btn>
                </div>
                <v-list v-model:selected="navSelected">
                    <v-list-item color="primary" class="navigationsIcons" variant="text" rounded min-height="20"
                        @click="getReq()" value="all">
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
                            @click="filtered = getFilterPayment('Pending')" value="pending">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-clock</v-icon>
                                    <p>Pending</p>
                                </div>
                                <span>{{ getFilterPayment("Pending").length }}</span>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="filtered = getFilterPayment('Paid')" value="paid">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-cash-check</v-icon>
                                    <p>Paid</p>
                                </div>
                                <span>{{ getFilterPayment("Paid").length }}</span>
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
                            @click="filtered = getFilterRelease('Not Released')" value="not_released">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-clock-outline</v-icon>
                                    <p>Not Released</p>
                                </div>
                                <span>{{ getFilterRelease("Not Released").length }}</span>
                            </div>
                        </v-list-item>
                        <v-list-item class="navigationsIcons" rounded min-height="20" color="primary"
                            @click="filtered = getFilterRelease('Released')" value="released">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-check-outline</v-icon>
                                    <p>Released</p>
                                </div>
                                <span>{{ getFilterRelease("Released").length }}</span>
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
                            @click="filtered = getByCategory(item.document_type)" :value="item.document_type"
                            v-for="item in documentTypeList" :key="item.document_type">
                            <div class="d-flex justify-space-between align-center">
                                <div class="d-flex ga-2 align-center">
                                    <v-icon>mdi-file-document-outline</v-icon>
                                    <p>{{ item.document_type }}</p>
                                </div>
                                <span>{{ getByCategory(item.document_type).length }}</span>
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
                <v-btn color="success" @click="show()">Test</v-btn>
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
            filtered: [],
            previous: ['all'],
        }
    },
    methods: {
        show() {
            console.log();
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
            this.filtered = [];
            const response = await this.fetchPhp('fetchAll');
            setTimeout(() => {
                if (response) {
                    console.log(response);
                    this.document = response;
                    this.filtered = this.document;
                }
                this.loaded = false;
            }, 1000);
        },
        async getArchive() {
            this.loaded = true;
            this.filtered = [];
            const response = await this.fetchPhp('getArchive');
            setTimeout(() => {
                if (response) {
                    this.filtered = response;
                }
                this.loaded = false;
            }, 1000);
        },
        getByCategory(type) {
            return this.document.filter(item => {
                return item.document_type == type;
            });
        },
        getFilterRelease(type) {
            return this.document.filter(doc =>
                doc.isReleased.toLowerCase() == type.toLowerCase()
            );
        },
        getFilterPayment(type) {
            return this.document.filter(doc =>
                doc.payment_status.toLowerCase() == type.toLowerCase()
            );

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
                    this.filtered = this.getFilterRelease("Not Released");
                    break;
                case "released":
                    this.filtered = this.getFilterRelease("Released");
                    break;
                case "paid":
                    this.filtered = this.getFilterPayment("Paid");
                    break;
                case "pending":
                    this.filtered = this.getFilterPayment("Pending");
                    break;
                default:
                    this.filtered = this.getByCategory(this.navSelected.toLocaleString());
                    break;
            }
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
        this.reload();
    },
    watch: {
        navSelected(newVal) {
            if (this.navSelected.length == 0) {
                this.navSelected = this.previous
            } else {
                this.previous = newVal;
            }
        }
    },
}
</script>