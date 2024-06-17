<template>
    <v-dialog max-width="600" persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn :disabled="user.position_id != 3" height="100%" width="100%" :prepend-icon="icon" variant="flat" v-bind="activatorProps" color="primary"
                :text="titleBox"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card class="pa-5" :prepend-icon="icon" :title="titleBox">
                <v-form @submit.prevent class="ma-7 d-flex flex-column ga-2">
                    <div v-if="!payment" class="d-flex flex-column ga-2">
                        <v-row>
                            <v-combobox class="input" v-model="doc.resident_id" label="Resident Name *"
                                :rules="[v => !!v || 'Required', v => residents.includes(v) || 'Not Resident']"
                                :items="residents" item-title="name" variant="solo-filled" ></v-combobox>
                        </v-row>
                        <v-row>
                            <v-text-field :disabled="!residents.includes(doc.resident_id)" v-model="doc.email" clearable label="Email *" :rules="[v => !v || /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(v)
                                || 'Invalid Email']" variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field :disabled="!residents.includes(doc.resident_id)" v-model="doc.phone_num" clearable label="Phone Number *"
                                :rules="[v => !v || (/^09\d{9}$/.test(v) || /^\+639\d{9}$/.test(v)) || 'Invalid Phone Number']"
                                variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-combobox :disabled="!residents.includes(doc.resident_id)" v-model="doc.document_type" label="Document Type *" :items="documents"
                                item-title="description" item-value="document_id"
                                :rules="[v => !!v || 'Required', v => documents.includes(v) || 'Not a Document']"
                                variant="outlined"></v-combobox>
                        </v-row>
                        <v-row>
                            <v-text-field :disabled="!residents.includes(doc.resident_id)" v-model="doc.purpose" clearable label="Purpose *"
                                :rules="[v => !!v || 'Required']" variant="outlined"></v-text-field>
                        </v-row>
                    </div>
                    <v-row class="d-flex justify-end ma-0 pa-0 ga-2">
                        <v-btn size="large" text="Cancel" @click="cancel(isActive)" prepend-icon="mdi-close"
                            flat></v-btn>
                        <v-dialog v-model="discardOverlay" persistent max-width="500px" transition="dialog-transition">
                            <v-card>
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
                        <v-btn :disabled="!residents.includes(doc.resident_id)" color="primary" size="large" text="Submit" type="submit"
                            prepend-icon="mdi-content-save-check" variant="flat" @click="submit()"></v-btn>
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
        user: {
            type: Object,
        }
    },
    data: () => ({
        payment: false,
        isRegistered: {
            color: 'success', text: 'Cedula Registered'
        },
        discardOverlay: false,
        doc: {
            certification_id: '',
            resident_id: {
                name: '',
                id: '',
            },
            email: '',
            phone_num: '',
            document_type: '',
            purpose: '',
            document_cost: '',
            stamp_fee: '',
            total: '',
            fee: '',
        },
        residents: [],
        documents: [],
    }),
    methods: {
        submit() {
            console.log(this.doc.resident_id);
            // axios.post('http://localhost/bms/src/php/Request/insert.php', {
            //     action: 'insert',
            //     certification: this.doc.certification_id,
            //     resident_id: this.doc.resident_id.id,
            //     email: this.doc.email,
            //     phone_num: this.doc.phone_num,
            //     document_type: this.doc.document_type.document_id,
            //     purpose: this.doc.purpose,
            // }).then(response => {
            //     console.log(response.data);
            // });

            // axios.post('http://localhost/bms/src/php/Request/insert.php', {
            //     action: 'insertPayment',
            //     certification: this.doc.certification_id,
            //     document_cost: this.doc.document_cost,
            //     stamp_fee: this.doc.stamp_fee,
            //     fee: this.doc.fee,
            // }).then(response => {
            //     console.log(response.data);
            // });

            // this.getReq();
        },
        setForm() {
            if (this.selectedRow) {
                this.doc = this.selectedRow
                this.doc.resident_id = this.fullName(this.selectedRow);
            } else {
                this.doc = {
                    certification_id: '',
                    resident_id: '',
                    email: '',
                    phoneNum: '',
                    documentType: '',
                    purpose: '',
                    document_cost: '',
                    stamp_fee: '',
                    total: '',
                    fee: '',
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
        genDocId() {
            // do {
            let min = 1;
            let max = 99999;
            let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            let id = 'CTFT' + new Date().getFullYear().toString().substring(2, 4) + "-" + randomInt;

            this.doc.certification_id = id;
        },
        getResident() {
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getAll',
            }).then(response => {
                this.residents = response.data;
            })
        },
        getDocuments() {
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getDocs',
            }).then(response => {
                this.documents = response.data;
            })
        },
        cedulaValidate(){
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'cedulaValidate',
                id: this.doc.resident_id.id,
            }).then(response => {
                if (!response.data) {
                    this.isRegistered.color = 'error';
                    this.isRegistered.text = 'Cedula Not Registered';
                } else {
                    this.isRegistered.color ='success';
                    this.isRegistered.text = 'Cedula Registered';
                }
            })
        }
    },
    computed: {
        totalAmount() {
            return this.doc.total = parseInt(this.doc.document_cost) + parseInt(this.doc.stamp_fee);
        },
        totalChange() {
            return Number.isNaN(parseInt(this.doc.fee) - parseInt(this.doc.total)) ? 0 : parseInt(this.doc.fee) - parseInt(this.doc.total);
        }
    },
    mounted() {
        this.genDocId();
        this.setForm();
        this.getResident();
        this.getDocuments();
    }
}
</script>