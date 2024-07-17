<template>
    <v-dialog activator="parent" scrollable persistent max-width="500" transition="dialog-transition">
        <template v-slot:default="{ isActive }">
            <v-toolbar color="primary" class="pl-9 pr-4">
                <v-icon>mdi-card-text-outline</v-icon>
                <v-toolbar-title>Process</v-toolbar-title>
                <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
            </v-toolbar>
            <v-card class="pa-6" rounded="0">
                <v-form ref="form" @submit.prevent="save(isActive)">
                    <v-row>
                        <v-col>
                            <v-alert type="info" variant="tonal" prominent density="compact">
                                <h4>Note</h4>
                                <p style="font-size: .8rem;">User will receive a message about the approval of their
                                    request.</p>
                            </v-alert>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex align-center justify-center">
                        <v-col cols="8" class="d-flex">
                            <v-btn icon="mdi-account-search-outline" flat size="small"></v-btn>
                            <v-text-field hide-details readonly v-model="selectedRow.full_name" density="compact"
                                label="Name" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field hide-details readonly v-model="selectedRow.document_type" density="compact"
                                label="Document Type" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider class="my-5"></v-divider>
                    <v-row>
                        <v-col class="d-flex flex-column align-center justify-center">
                            <h4>Select Status</h4>
                            <v-btn-toggle v-model="doc_status.doc_status" divided mandatory variant="outlined"
                                rounded="xl" class="d-flex w-100 justify-center">
                                <v-btn color="success" value="Approved"
                                    :prepend-icon="doc_status.doc_status == 'Approved' ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                                    width="30%">Approved</v-btn>
                                <v-btn color="yellow-darken-1" value="Pending" width="30%">Pending</v-btn>
                                <v-btn color="error" value="Declined"
                                    :prepend-icon="doc_status.doc_status == 'Declined' ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"
                                    width="30%">Declined</v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea v-model="doc_status.remarks" rows="2" auto-grow color="black" label="Remarks"
                                variant="outlined"
                                :rules="[v => doc_status.doc_status != 'Declined' || !!v || 'Required']"
                                hint="Required when the status is declined." persistent-hint></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="ga-3 my-3">
                        <v-col cols="12">
                            <h4>Send Message Through:</h4>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn-group divided>
                                <v-btn :disabled="!selectedRow.email" :readonly="gmailBtnClicked"
                                    :color="selectedRow.email ? 'red-lighten-1' : ''" flat :prepend-icon="btnGmail.icon"
                                    @click="sendGmail()" :loading="btnGmail.loading">{{
                                        btnGmail.text }}</v-btn>
                                <v-btn v-if="selectedRow.email && !gmailBtnClicked"
                                    :color="selectedRow.email ? 'red-lighten-1' : ''" flat variant="outlined" icon
                                    id="editGmail">
                                    <v-icon>mdi-pencil</v-icon>
                                    <RequestComposeMessage :contact="selectedRow.email"
                                        :doc_status="doc_status.doc_status" messageType="gmail" :subject="subject"/>
                                </v-btn>
                                <v-tooltip activator="#editGmail" location="top">Compase Gmail</v-tooltip>
                            </v-btn-group>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn-group divided>
                                <v-btn :disabled="!selectedRow.phone_num"
                                    :color="selectedRow.phone_num ? 'blue-darken-1' : ''" flat
                                    prepend-icon="mdi-message-text-outline">SMS</v-btn>
                                <v-btn :disabled="!selectedRow.phone_num"
                                    :color="selectedRow.phone_num ? 'blue-darken-1' : ''" flat variant="outlined"
                                    id="editSms" icon>
                                    <v-icon>mdi-pencil</v-icon>
                                    <RequestComposeMessage :contact="selectedRow.phone_num"
                                        :doc_status="doc_status.doc_status" messageType="sms" />
                                </v-btn>
                                <v-tooltip activator="#editSms" location="top">Compose SMS</v-tooltip>
                            </v-btn-group>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn :color="btnSave.color" flat id="editSms" block type="submit"
                                :loading="btnSave.loading">{{ btnSave.text }}</v-btn>
                        </v-col>
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
        selectedRow: {
            type: Object,
            required: true,
        },
        getReq: {
            type: Function,
        },
    },
    data() {
        return {
            gmailBtnClicked: false,

            doc_status: [],

            btnGmail: {
                loading: false,
                icon: 'mdi-gmail',
                text: 'Gmail'
            },
            btnSave: {
                loading: false,
                text: 'Save',
                color: 'primary',
            },
            payment: {
                document_fee: '',
                stamp_fee: 25,
            }
        }
    },
    methods: {
        async save(isActive) {
            await this.$refs.form.validate();
            if (await this.$refs.form.isValid) {
                if (this.doc_status.doc_status != 'Pending') {
                    this.btnSave.loading = true;
                    if (await this.isExist()) {
                        axios.post('http://localhost/bms/src/php/Request/update.php', {
                            action: 'updateDocStatus',
                            certification_id: this.selectedRow.certification_id,
                            doc_status: this.doc_status.doc_status == 'Approved' ? 1 : 0,
                            remarks: this.doc_status.remarks ? this.doc_status.remarks : null,
                        }).then(response => {
                            if (response.data) {
                                this.btnSave.loading = false;
                                this.btnSave.color = 'success';
                                this.btnSave.text = 'Saved';
                                setTimeout(() => {
                                    isActive.value = !response.data;
                                    this.getReq();
                                }, 1000);
                            }
                        })
                    } else {
                        axios.post('http://localhost/bms/src/php/Request/insert.php', {
                            action: 'insertDocStatus',
                            certification_id: this.selectedRow.certification_id,
                            doc_status: this.doc_status.doc_status == 'Approved' ? 1 : 0,
                            remarks: this.doc_status.remarks ? this.doc_status.remarks : null,
                        }).then(response => {
                            if (response.data) {
                                this.btnSave.loading = false;
                                this.btnSave.color = 'success';
                                this.btnSave.text = 'Saved';
                                setTimeout(() => {
                                    isActive.value = !response.data;
                                    this.getReq();
                                }, 1000);
                            }
                        })
                    }
                } else {
                    axios.post('http://localhost/bms/src/php/Request/delete.php', {
                        action: 'deleteDocStatus',
                        certification_id: this.selectedRow.certification_id,
                    }).then(response => {
                        if (response.data) {
                            this.btnSave.loading = false;
                            this.btnSave.color = 'success';
                            this.btnSave.text = 'Saved';
                            setTimeout(() => {
                                isActive.value = !response.data;
                                this.getReq();
                            }, 1000);
                        }
                    })
                }
            }
        },
        async isExist() {
            const result = await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
                action: 'statusExist',
                certification_id: this.selectedRow.certification_id,
            })

            return result.data;
        },
        getCurrentDate() {
            const today = new Date();
            return today.toISOString().split('T')[0];
        },
        async sendGmail() {
            await this.$refs.form.validate();
            if (await this.$refs.form.isValid) {
                this.btnGmail.loading = true;
                Email.send({
                    Host: "smtp.elasticemail.com",
                    Username: "markanthony.rodriguez@unc.edu.ph",
                    Password: "24FA3C50230BA8A336EE127394AF9E214229",
                    To: this.selectedRow.email,
                    From: "markanthony.rodriguez@unc.edu.ph",
                    Subject: this.subject,
                    Body: this.messageDraft,
                }).then((message) => {
                    if (message == 'OK') {
                        this.btnGmail.loading = false;
                        this.btnGmail.icon = 'mdi-check';
                        this.btnGmail.text = 'Sent';
                        this.gmailBtnClicked = true;
                    } else {
                        this.btnGmail.loading = false;
                        this.btnGmail.icon = 'mdi-close';
                        this.btnGmail.text = 'Failed';
                    }
                });
                setTimeout(() => {
                    this.btnGmail.loading = false;
                    this.btnGmail.icon = 'mdi-close';
                    this.btnGmail.text = 'Failed';
                }, 5000);
            }
        }
    },
    computed: {
        formatDate() {
            return new Date(this.selectedRow.date_request).toLocaleDateString();
        },
        messageDraft() {

            return `Dear ${this.selectedRow.full_name},

<p>I hope this email finds you well.</p>

<p>We are pleased to inform you that your recent request has been <strong>${this.doc_status.doc_status.toUpperCase()}.</strong></p>

<p>Please find the details of your request below:</p>

<ul>
    <li>Request Type: Certification</li>
    <li>Document Type: ${this.selectedRow.document_type}</li>
    <li>Reference No.: ${this.selectedRow.certification_id}</li>
    <li>Approval Date: ${this.getCurrentDate()}</li>
    <li>Remarks: ${this.doc_status.remarks ? this.doc_status.remarks : 'N/A'}</li>
</ul>

<p>For the Payment:</p>
<ul>
    <li>Payment Method: Onsite</li>
    <li>Document Fee: ${this.payment.document_fee}</li>
    <li>Stamp Fee: ${this.payment.stamp_fee}</li>
    <li><strong>Total Fee: ${this.payment.document_fee + this.payment.stamp_fee}</strong></li>
</ul>
<i><strong>Note:</strong> Online Transaction are not allowed</i>

<p>${this.doc_status.doc_status == 'Approved' ? 'To claim your ' + this.selectedRow.document_type : 'To Approve your ' + this.selectedRow.document_type}, please visit the Barangay Hall. Our office is open from 8:00 AM to 5:00 PM, Monday to Friday. Please bring a valid ID and a copy of this email for verification purposes.</p>

<p>If you have any further questions or need additional information, please do not hesitate to contact us.</p>

<p>Thank you for your cooperation.</p>

<p>Best regards,</p>

<p>Mark Anthony A. Rodriguez<br>
Barangay Secretary<br>
<a href="mailto:markanthony.rodriguez@unc.edu.ph">markanthony.rodriguez@unc.edu.ph</a><br>
Barangay Bonifacio, San Fernando, Camarines Sur</p>`

        },
        subject(){
            return `Certification Request ${this.doc_status.doc_status}`;
        }
    },
    async mounted() {

        await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
            action: 'getPrice',
            document_id: this.selectedRow.document_id
        }).then(response => {
            this.payment.document_fee = parseInt(response.data.cost);
        });

        if (await this.isExist()) {
            this.doc_status = await this.isExist();
        } else {
            this.doc_status.doc_status = this.selectedRow.doc_status;

        }

    }
}
</script>
