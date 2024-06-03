<template>
    <v-dialog max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn width="100%" :prepend-icon="icon" variant="flat" v-bind="activatorProps" color="surface-variant"
                :text="titleBox"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card class="pa-5" :prepend-icon="icon" :title="titleBox">
                <v-form @submit.prevent class="pa-10 d-flex flex-column ga-2">
                    <v-row>
                        <v-combobox v-model="doc.resident_id" label="Resident Name*"
                            :rules="[v => !!v || 'Required', v => names.includes(v) || 'Not Resident']" :items="names"
                            item-title="name" item-value="id" variant="outlined"></v-combobox>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="doc.email" clearable label="Email*" :rules="[v => !!v || 'Required', v => /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(v)
                            || 'Invalid Email']" variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="doc.phone_num" clearable label="Phone Number*"
                            :rules="[v => !!v || 'Required', v => v.length == 11 && /[0-9-]+/.test(v) || 'Invalid Phone Number']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-combobox v-model="doc.document_type" label="Document Type*" :items="documents"
                            item-title="description" item-value="document_id"
                            :rules="[v => !!v || 'Required', v => documents.includes(v) || 'Not a Document']"
                            variant="outlined"></v-combobox>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="doc.purpose" clearable label="Purpose*" :rules="[v => !!v || 'Required']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-btn-group class="d-flex justify-end ma-0 pa-0 ga-2">

                        <v-btn size="large" text="Cancel" @click="cancel(isActive)" prepend-icon="mdi-close"></v-btn>
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
                        <v-btn-group divided color="primary">
                            <v-btn size="large" text="Submit" type="submit" prepend-icon="mdi-content-save-check"
                                variant="flat" @click="submit()"></v-btn>
                            <v-btn size="small" icon>
                                <v-icon icon="mdi-menu-down"></v-icon>
                                <v-menu activator="parent" location="bottom end" transition="fade-transition"
                                    width="150">
                                    <v-btn-group density="comfortable" variant="tonal">
                                        <RequestPayment @click="isActive.value = false" />
                                    </v-btn-group>
                                </v-menu>
                            </v-btn>
                        </v-btn-group>
                    </v-btn-group>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>
import axios from 'axios';


export default {
    props: {
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
        discardOverlay: false,
        doc: {
            resident_id: '',
            email: '',
            phone_num: '',
            document_type: '',
            purpose: '',
        },
        names: [],
        documents: [],
    }),
    methods: {
        submit() {
            axios.post('http://localhost/bms_php/insert.php', {
                action: 'insert',
                certification: this.genDocId(),
                resident_id: this.doc.resident_id.id,
                email: this.doc.email,
                phone_num: this.doc.phone_num,
                document_type: this.doc.document_type.document_id,
                purpose: this.doc.purpose,
            }).then(response => {
                console.log(response.data);
            })
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

            return id;
            // axios.get('http://localhost/bms_php/fetch.php', {
            //     action: 'getId',
            //     id: id,
            // }).then( response => {
            //     if (response.data) {
            //         console.log(response.data);
            //         this.doc.certification_id = id;
            //     }
            // })
            // }while(this.doc.certification_id);
        },
        getResident() {
            axios.post('http://localhost/bms_php/fetch.php', {
                action: 'getAll',
            }).then(response => {
                this.names = response.data;
            })
        },
        getDocuments(){
            axios.post('http://localhost/bms_php/fetch.php', {
                action: 'getDocs',
            }).then(response => {
                this.documents = response.data;
            })
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