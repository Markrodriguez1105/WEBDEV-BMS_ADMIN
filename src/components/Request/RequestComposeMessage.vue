<template>
    <v-dialog activator="parent" max-width="400px" transition="dialog-transition">
        <template v-slot:default="{ isActive }">
            <v-card class="pa-5">
                <v-form ref="form">
                    <v-row class="align-center mb-3">
                        <v-col>
                            <h3>Compose {{ messageType.toUpperCase() }} Message</h3>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn flat icon="mdi-close" @click="isActive.value = !isActive.value"></v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-text-field v-model="to" density="compact" readonly variant="outlined"
                                label="Send To"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-if="messageType == 'gmail'">
                        <v-col>
                            <v-text-field v-model="subject" variant="outlined" label="Send To"
                                :rules="[v => !!v || 'Required']"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-textarea v-model="message" rows="5" auto-grow color="black" label="Message"
                                variant="outlined" :rules="[v => !!v || 'Required']"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-btn :color="btnFormat.color" :readonly="btnClicked" flat block @click="send()"
                                :loading="btnFormat.loading">{{ btnFormat.text }}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>

export default {
    props: {
        contact: {
            type: String,
            required: true,
        },
        doc_status: {
            type: String,
            required: true,
        },
        messageType: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            to: '',
            message: '',
            subject: `TESTING: Certification Request ${this.doc_status}`,

            btnClicked: false,
            btnFormat: {
                loading: false,
                color: 'primary',
                text: 'Send',
            },
        }
    }, methods: {
        send() {
            this.$refs.form.validate();
            if (this.$refs.form.isValid) {
                this.btnFormat.loading = true;
                if (this.messageType == 'gmail') {
                    Email.send({
                        Host: "smtp.elasticemail.com",
                        Username: "markanthony.rodriguez@unc.edu.ph",
                        Password: "24FA3C50230BA8A336EE127394AF9E214229",
                        To: this.contact,
                        From: "markanthony.rodriguez@unc.edu.ph",
                        Subject: this.subject,
                        Body: this.message,
                    }).then((message) => {
                        if (message == 'OK') {
                            this.btnFormat.loading = false;
                            this.btnFormat.color = 'success';
                            this.btnFormat.text = 'Sent';
                            this.btnClicked = true;
                        } else {
                            this.btnFormat.loading = false;
                            this.btnFormat.color = 'error';
                            this.btnFormat.text = 'Failed';
                        }
                    });
                } else if (this.messageType == 'sms') {
                    this.btnFormat.loading = false;
                    this.btnFormat.color = 'warning';
                    this.btnFormat.text = 'Not Available';
                }
            }
        },
    }, mounted() {
        this.to = this.contact;
    }
}
</script>