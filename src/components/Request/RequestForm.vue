<template>
    <v-dialog activator="parent" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-toolbar color="primary" class="pl-9 pr-4">
                <v-icon>{{ icon }}</v-icon>
                <v-toolbar-title>{{ titleBox }}</v-toolbar-title>
                <v-btn @click="cancel(isActive)" icon="mdi-close"></v-btn>
                <v-dialog v-model="discardOverlay" persistent max-width="500px" transition="dialog-transition">
                    <v-card class="pa-3" rounded="0">
                        <v-alert title="System Warning"
                            text="Are you sure you want to cancel this transaction? Any data you have entered will not be saved and will be lost."
                            type="warning" variant="outlined">
                            <v-card-actions class="pa-0">
                                <v-spacer></v-spacer>
                                <v-btn variant="tonal" text="Cancel" @click="discardOverlay = false"></v-btn>
                                <v-btn text="Discard"
                                    @click="setForm(), isActive.value = false, discardOverlay = false"></v-btn>
                            </v-card-actions>
                        </v-alert>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-card class="pa-3" rounded="0">
                <v-form ref="form" @submit.prevent="submit(isActive)" class="ma-7 d-flex flex-column ga-2">
                    <v-row>
                        <v-combobox class="input" v-model="doc.resident" label="Resident Name *"
                            :readonly="btnSubmit.disable" :disabled="selectedRow != null"
                            :rules="[v => !!v || 'Required', v => residents.includes(v) || 'Not Resident']"
                            :items="residents" item-title="name" variant="solo-filled"></v-combobox>
                    </v-row>
                    <v-row>
                        <v-text-field :disabled="!isResident" :readonly="btnSubmit.disable" v-model="doc.email"
                            clearable label="Email *" :rules="[v => !v || /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(v)
                                || 'Invalid Email']" variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :disabled="!isResident" :readonly="btnSubmit.disable" v-model="doc.phone_num"
                            clearable label="Phone Number *"
                            :rules="[v => !!v || 'Required', v => (/^09\d{9}$/.test(v) || /^\+639\d{9}$/.test(v)) || 'Invalid Phone Number']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-combobox :disabled="!isResident || selectedRow != null" :readonly="btnSubmit.disable"
                            v-model="doc.document_type" label="Document Type *" :items="documents"
                            item-title="description" item-value="document_id"
                            :rules="[v => !!v || 'Required', v => documents.includes(v) || 'Not a Document']"
                            variant="outlined"></v-combobox>
                    </v-row>
                    <v-row>
                        <v-text-field :disabled="!isResident" :readonly="btnSubmit.disable" v-model="doc.purpose"
                            clearable label="Purpose *" :rules="[v => !!v || 'Required']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :disabled="!isResident" :readonly="btnSubmit.disable" v-model="doc.date_release"
                            type="date" label="Release Date *" :rules="[v => !!v || 'Required']" variant="outlined"
                            :min="getCurrentDate()"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-btn :loading="btnSubmit.loading" :disabled="!isResident" :readonly="btnSubmit.disable"
                            :color="btnSubmit.color" size="large" :text="btnSubmit.title" type="submit"
                            :prepend-icon="btnSubmit.icon" variant="flat" block></v-btn>
                    </v-row>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>
<style scoped>
.input .v-messages__message {
    text-align: right;
}
</style>
<script>
import axios from 'axios';

export default {
    props: {
        getReq: {
            type: Function,
        },
        selectedRow: {
            type: Object,
        },
        titleBox: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            require: true,
        },
    },
    data: () => ({
        discardOverlay: false,
        doc: {
            certification_id: '',
            resident: {
                id: '',
                name: '',
            },
            email: '',
            phone_num: '',
            document_type: {
                document_id: '',
                description: ''
            },
            purpose: '',
            date_release: '',
        },
        btnSubmit: {
            disable: false,
            icon: 'mdi-content-save',
            loading: false,
            title: 'Submit',
            color: 'primary'
        },
        residents: [],
        documents: [],
    }),
    methods: {
        async submit(isActive) {
            await this.$refs.form.validate();
            if (await this.$refs.form.isValid) {
                this.btnSubmit.loading = true;
                this.btnSubmit.disable = true;
                if (this.selectedRow) {
                    axios.post('http://localhost/bms/src/php/Request/update.php', {
                        action: 'updateReq',
                        certification_id: this.selectedRow.certification_id,
                        email: this.doc.email,
                        phone_num: this.doc.phone_num,
                        document_id: this.doc.document_type.document_id,
                        purpose: this.doc.purpose,
                        release_date: this.doc.date_release,
                    }).then(response => {
                        setTimeout(() => {
                            if (response.data) {
                                this.btnSubmit.loading = false;
                                this.btnSubmit.icon = 'mdi-check'
                                this.btnSubmit.color = 'success';
                                this.btnSubmit.title = 'Updated';
                                setTimeout(() => {
                                    isActive.value = false;
                                    this.setForm();
                                    this.getReq();
                                }, 500);
                            } else {
                                this.btnSubmit.loading = false;
                                this.btnSubmit.icon = 'mdi-close'
                                this.btnSubmit.color = 'error';
                                this.btnSubmit.title = 'Failed';
                            }
                        }, 1000);
                    });
                } else {
                    this.doc.certification_id = this.generateId();
                    axios.post('http://localhost/bms/src/php/Request/insert.php', {
                        action: 'insert',
                        certification: this.doc.certification_id,
                        id: this.doc.resident.id,
                        email: this.doc.email,
                        phone_num: this.doc.phone_num,
                        document_type: this.doc.document_type.document_id,
                        purpose: this.doc.purpose,
                        release_date: this.doc.date_release,
                    }).then(response => {
                        setTimeout(() => {
                            if (response.data) {
                                this.btnSubmit.loading = false;
                                this.btnSubmit.icon = 'mdi-check'
                                this.btnSubmit.color = 'success';
                                this.btnSubmit.title = 'Submited';
                                setTimeout(() => {
                                    this.setForm();
                                    this.getReq();
                                    isActive.value = false;
                                }, 500);
                            } else {
                                this.btnSubmit.loading = false;
                                this.btnSubmit.icon = 'mdi-close'
                                this.btnSubmit.color = 'error';
                                this.btnSubmit.title = 'Failed';
                            }
                        }, 1000)
                    }).catch(error => {
                        console.error(error);
                        this.btnSubmit.loading = false;
                        this.btnSubmit.icon = 'mdi-close'
                        this.btnSubmit.color = 'error';
                        this.btnSubmit.title = 'Failed';
                    })
                }
            }
        },
        async setForm() {
            if (this.selectedRow) {
                this.doc.certification_id = this.selectedRow.certification_id;
                this.doc.resident = this.residents.find(person => person.id == this.selectedRow.resident_id);

                this.doc.email = this.selectedRow.email;
                this.doc.phone_num = this.selectedRow.phone_num;

                this.doc.document_type = this.documents.find(doc => doc.document_id == this.selectedRow.document_id);

                this.doc.purpose = this.selectedRow.purpose;
                this.doc.date_release = this.selectedRow.release_date;


                this.btnSubmit = {
                    icon: 'mdi-pencil',
                    loading: false,
                    title: 'Update',
                    color: 'primary',
                }

            } else {
                this.doc = {
                    certification_id: '',
                    resident: '',
                    email: '',
                    phoneNum: '',
                    document_type: null,
                    purpose: '',
                    date_release: '',
                }

                this.btnSubmit = {
                    icon: 'mdi-content-save',
                    loading: false,
                    title: 'Submit',
                    color: 'primary'
                }
            }

        },
        fullName(item) {
            const { lname, fname, mname, suffix } = item;
            const middleInitial = mname ? `${mname.charAt(0)}.` : '';
            return `${lname}, ${fname} ${middleInitial} ${suffix}`.trim();
        },
        cancel(isActive) {
            if (Object.values(this.doc).some(value => value) && !this.selectedRow) {
                this.discardOverlay = true;
            } else {
                isActive.value = false;
            }
        },
        generateId() {
            let dublication = false;
            let uniqueId = '';
            do {
                let min = 1;
                let max = 99999;
                let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
                let id = 'CTFT' + new Date().getFullYear().toString().substring(2, 4) + "-" + randomInt;

                const result = axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                    action: 'checkIdDublication',
                    id: id,
                });
                dublication = result.data;
                uniqueId = id;
            } while (dublication);

            return uniqueId;

        },
        async getResident() {
            await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getResident',
            }).then(response => {
                this.residents = response.data;
            })
        },
        async getDocuments() {
            await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getDocs',
            }).then(response => {
                this.documents = response.data;
            })
        },
        cedulaValidate() {
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'cedulaValidate',
                id: this.doc.resident.id,
            }).then(response => {
                if (!response.data) {
                    this.isRegistered.color = 'error';
                    this.isRegistered.text = 'Cedula Not Registered';
                } else {
                    this.isRegistered.color = 'success';
                    this.isRegistered.text = 'Cedula Registered';
                }
            })
        },
        getCurrentDate() {
            const today = new Date();
            return today.toISOString().split('T')[0];
        }
    },
    computed: {
        totalAmount() {
            return this.doc.total = parseInt(this.doc.document_cost) + parseInt(this.doc.stamp_fee);
        },
        totalChange() {
            return Number.isNaN(parseInt(this.doc.fee) - parseInt(this.doc.total)) ? 0 : parseInt(this.doc.fee) - parseInt(this.doc.total);
        },
        isResident() {
            const result = this.residents.includes(this.doc.resident) || this.selectedRow ? true : false;
            return result;
        }
    },
    async mounted() {
        await this.getResident();
        await this.getDocuments();
        this.setForm();
    }
}
</script>
<style></style>
