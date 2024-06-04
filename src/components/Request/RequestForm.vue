<template>
    <v-dialog max-width="600" persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn width="100%" :prepend-icon="icon" variant="flat" v-bind="activatorProps" color="surface-variant"
                :text="titleBox"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card class="pa-5" :prepend-icon="icon" :title="titleBox">
                <v-form @submit.prevent class="ma-7 d-flex flex-column ga-2">
                    <div v-if="!payment">
                        <v-row>
                            <v-combobox v-model="doc.resident_id" label="Resident Name *"
                                :rules="[v => !!v || 'Required', v => names.includes(v) || 'Not Resident']"
                                :items="names" item-title="name" item-value="id" variant="outlined"></v-combobox>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="doc.email" clearable label="Email *" :rules="[v => !!v || 'Required', v => /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(v)
                                || 'Invalid Email']" variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="doc.phone_num" clearable label="Phone Number *"
                                :rules="[v => !!v || 'Required', v => v.length == 11 && /[0-9-]+/.test(v) || 'Invalid Phone Number']"
                                variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-combobox v-model="doc.document_type" label="Document Type *" :items="documents"
                                item-title="description" item-value="document_id"
                                :rules="[v => !!v || 'Required', v => documents.includes(v) || 'Not a Document']"
                                variant="outlined"></v-combobox>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="doc.purpose" clearable label="Purpose*"
                                :rules="[v => !!v || 'Required']" variant="outlined"></v-text-field>
                        </v-row>
                    </div>
                    <div v-else>
                        <v-row>
                            <div class="w-100 pb-5">
                                <v-btn append-icon="mdi-chevron-right" :color="isRegistered.color"
                                    :text="isRegistered.text" variant="tonal" block></v-btn>
                            </div>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="doc.document_cost" clearable prefix="₱" label="Document Cost *"
                                type="Number" :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'No letters']"
                                variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="doc.stamp_fee" clearable prefix="₱" label="Stamp Fee *" type="Number"
                                :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'No letters']"
                                variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="totalAmount" clearable prefix="₱" label="Total Cost *" type="Number"
                                :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'No letters']"
                                variant="outlined"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="doc.fee" clearable prefix="₱" label="Fee *" type="Number"
                                :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'No letters']"
                                variant="outlined"></v-text-field>
                        </v-row>
                    </div>
                    <v-row class="d-flex justify-end ma-0 pa-0 ga-2">
                        <v-col v-if="payment">
                            <h3>Change: ₱ {{ totalChange }}</h3>
                        </v-col>

                        <v-btn v-if="payment" size="large" text="Back" @click="payment = false"
                            prepend-icon="mdi-arrow-left" flat></v-btn>
                        <v-btn v-else size="large" text="Cancel" @click="cancel(isActive)" prepend-icon="mdi-close"
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
                        <v-btn v-if="payment || selectedRow" color="primary" size="large" text="Submit" type="submit"
                            prepend-icon="mdi-content-save-check" variant="flat" @click="submit()"></v-btn>
                        <v-btn v-else :disabled="!doc.resident_id.id > 0" size="large" text="Next" type="submit"
                            prepend-icon="mdi-arrow-right" variant="flat" @click="payment = true, cedulaValidate()"></v-btn>
                    </v-row>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>
import axios from 'axios';


export default {
    props: {
        getReq: {
            type: Function,
            required: true
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
            resident_id: '',
            email: '',
            phone_num: '',
            document_type: '',
            purpose: '',
            document_cost: '',
            stamp_fee: '',
            total: '',
            fee: '',
        },
        names: [],
        documents: [],
    }),
    methods: {
        submit() {
            axios.post('http://localhost/bms_php/insert.php', {
                action: 'insert',
                certification: this.doc.certification_id,
                resident_id: this.doc.resident_id.id,
                email: this.doc.email,
                phone_num: this.doc.phone_num,
                document_type: this.doc.document_type.document_id,
                purpose: this.doc.purpose,
            }).then(response => {
                console.log(response.data);
            });

            axios.post('http://localhost/bms_php/insert.php', {
                action: 'insertPayment',
                certification: this.doc.certification_id,
                document_cost: this.doc.document_cost,
                stamp_fee: this.doc.stamp_fee,
                fee: this.doc.fee,
            }).then(response => {
                console.log(response.data);
            });

            this.getReq();
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
            axios.post('http://localhost/bms_php/fetch.php', {
                action: 'getAll',
            }).then(response => {
                this.names = response.data;
            })
        },
        getDocuments() {
            axios.post('http://localhost/bms_php/fetch.php', {
                action: 'getDocs',
            }).then(response => {
                this.documents = response.data;
            })
        },
        cedulaValidate(){
            axios.post('http://localhost/bms_php/fetch.php', {
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
        this.genDocId();
        this.setForm();
        this.getResident();
        this.getDocuments();
    }
}
</script>