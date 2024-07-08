<template>
    <v-dialog max-width="600" persistent activator="parent">
        <template v-slot:default="{ isActive }">
            <v-toolbar color="primary" class="pl-9 pr-4">
                <v-icon>mdi-cash</v-icon>
                <v-toolbar-title>Payment</v-toolbar-title>
                <v-btn icon="mdi-close" @click="setForm(), isActive.value = false"></v-btn>
            </v-toolbar>
            <v-card class="pa-3" rounded="0">
                <v-form ref="form" @submit.prevent="submit()" class="ma-7 d-flex flex-column ga-2">
                    <v-row>
                        <v-btn class="mb-4" append-icon="mdi-chevron-right" :color="isRegistered ? 'success' : 'error'"
                            :text="isRegistered ? 'Cedula Registered' : 'Cedula Not Registered'" variant="tonal"
                            block></v-btn>
                    </v-row>
                    <v-row>
                        <v-text-field :readonly="btnSubmit.disable" v-model="payment.document_cost" prefix="₱"
                            label="Document Cost *" type="Number"
                            :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'Invalid Number']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :readonly="btnSubmit.disable" v-model="payment.stamp_fee" prefix="₱"
                            label="Stamp Fee *" type="Number"
                            :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'Invalid Number']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field readonly v-model="totalAmount" prefix="₱" label="Total Cost" type="Number"
                            :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'Invalid Number']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :readonly="btnSubmit.disable" v-model="payment.fee" prefix="₱" label="Fee *"
                            type="Number"
                            :rules="[v => !!v || 'Required', v => /^\d+$/i.test(v) || 'Invalid Number', v => v >= payment.total || 'Insufficient Fee']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-row class="d-flex justify-end">
                        <v-btn :color="btnSubmit.color" :loading="btnSubmit.loading" :readonly="btnSubmit.disable"
                            size="large" :text="btnSubmit.title" block type="submit" :prepend-icon="btnSubmit.icon"
                            variant="flat"></v-btn>
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
        reload: {
            type: Function,
        },
        selectedRow: {
            type: Object,
        },
    },
    data() {
        return {
            isRegistered: false,
            discardOverlay: false,

            payment: {
                document_cost: '',
                stamp_fee: '25',
                total: '',
                fee: '',
            },

            btnSubmit: {
                disable: false,
                icon: 'mdi-cash-fast',
                loading: false,
                title: 'Pay',
                color: 'primary'
            },
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.isValid && this.isRegistered) {
                axios.post('http://localhost/bms/src/php/Request/insert.php', {
                    action: 'insertPayment',
                    certification: this.selectedRow.certification_id,
                    document_cost: this.payment.document_cost,
                    stamp_fee: this.payment.stamp_fee,
                    fee: this.payment.fee,
                }).then(response => {
                    this.btnSubmit.loading = true;
                    this.btnSubmit.disable = true;
                    setTimeout(() => {
                        if (response.data) {
                            this.btnSubmit.loading = false;
                            this.btnSubmit.title = 'Paid';
                            this.btnSubmit.color = 'success';
                            this.btnSubmit.icon = 'mdi-cash-check';
                            setTimeout(() => {
                                this.reload();
                            }, 1000);
                        } else {
                            this.btnSubmit.loading = false;
                            this.btnSubmit.title = 'Failed';
                            this.btnSubmit.color = 'error';
                            this.btnSubmit.icon = 'mdi-cash-remove';
                            this.btnSubmit.disable = false;
                        }
                    }, 500);
                });
            }
        },
        setForm() {
            this.getDocuments();
            this.payment.stamp_fee = 25;
            this.payment.fee = null;
        },
        getDocuments() {
            axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'getDocs',
            }).then(response => {
                const result = response.data;
                this.payment.document_cost = result.find(value => value.document_id == this.selectedRow.document_id).cost;
            })
        },
        async cedulaValidate() {
            await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'cedulaValidate',
                id: this.selectedRow.resident_id,
            }).then(response => {
                this.isRegistered = response.data;
            })
        }
    },
    computed: {
        totalAmount() {
            return this.payment.total = this.payment.total = parseInt(this.payment.document_cost) + parseInt(this.payment.stamp_fee);
        },
    },
    mounted() {
        this.setForm();
        this.cedulaValidate();
    }
}
</script>