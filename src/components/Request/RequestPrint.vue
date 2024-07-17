<template>
    <v-dialog activator="parent" max-width="800px" transition="dialog-transition">
        <template v-slot:default="{ isActive }">
            <v-toolbar color="primary" class="pl-9 pr-4">
                <v-icon>mdi-printer</v-icon>
                <v-toolbar-title>Print Preview</v-toolbar-title>
                <v-btn @click="isActive.value = false" icon="mdi-close"></v-btn>
            </v-toolbar>
            <v-card>
                <div class="mx-9 my-9" id="print">
                    <v-row class="justify-center align-center">
                        <v-col cols="auto">
                            <img src="/src/assets/images/sflogo.png" alt="San Fernando Logo" class="logo">
                        </v-col>
                        <v-col cols="5">
                            <p class="text-center" style="font-size: small;">REPUBLIC OF THE PHILIPPINES</p>
                            <p class="text-center" style="font-size: small;">PROVINCE OF CAMARINES SUR</p>
                            <p class="text-center" style="font-size: small;">MUNICIPALITY OF SAN FERNANDO</p>
                            <p class="text-center" style="font-weight: bold;">BARANGAY BONIFACIO (POB.)</p>
                            <p class="text-center" style="font-weight: bold;">OFFICE OF THE PUNONG BARANGAY</p>
                        </v-col>
                        <v-col cols="auto">
                            <img src="/src/assets/images/logo.png" alt="San Fernando Logo" class="logo">
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h1 class="text-center" style="background-color: yellow;">BARANGAY {{
                                info.description.toUpperCase() }}</h1>
                        </v-col>
                    </v-row>
                    <v-row class="py-3">
                        <v-col cols="5">
                            <div class="d-flex flex-column ga-5">
                                <div v-for="i in officials" :key="i.official_id">
                                    <p class="text-center" style="font-weight: bold;">{{
                                        officialFullname(i).toUpperCase()
                                        }}</p>
                                    <p class="text-center">{{ i.description }}</p>
                                </div>
                            </div>
                        </v-col>
                        <div class="divider"></div>
                        <v-col>
                            <p style="font-weight: bold;">TO WHOM IT MAY CONCERN:</p>
                            <p style="text-indent: 40px; text-align: justify;">This is to certify that as per record,
                                the
                                person whose name and signature appearing herein has requested a {{
                                    info.description.toUpperCase() }} from this office with the
                                following detail/s;</p>
                            <div class="list">
                                <p>Last Name:</p>
                                <p style="font-weight: bold;">{{ info.last_name }}</p>
                                <p>Age:</p>
                                <p style="font-weight: bold;">{{ info.age }}</p>
                                <p>First Name:</p>
                                <p style="font-weight: bold;">{{ info.first_name }}</p>
                                <p>Gender:</p>
                                <p style="font-weight: bold;">{{ info.gender }}</p>
                                <p>Middle Name:</p>
                                <p style="font-weight: bold;">{{ info.middle_name }}</p>
                                <p>Civil Status:</p>
                                <p style="font-weight: bold;">{{ info.civil_status }}</p>
                                <p>Suffix:</p>
                                <p style="font-weight: bold;">{{ info.suffix }}</p>
                                <p>Nationality:</p>
                                <p style="font-weight: bold;">{{ info.nationality }}</p>
                                <p style="grid-column-start: 1; grid-column-end: 1;">Address:</p>
                                <p style="font-weight: bold; grid-column-start: 2; grid-column-end: 5;">Bonifacio, San
                                    Fernando, Camarines Sur</p>
                                <p style="grid-column-start: 1; grid-column-end: 1;">Purpose:</p>
                                <p style="font-weight: bold; grid-column-start: 2; grid-column-end: 5;">{{ info.purpose
                                    }}
                                </p>
                                <p style="grid-column-start: 1; grid-column-end: 1;">Remarks:</p>
                                <p style="font-weight: bold; grid-column-start: 2; grid-column-end: 5;">{{ info.remarks
                                    }}
                                </p>
                            </div>
                            <p style="text-indent: 40px; text-align: justify;">This document is issued upon the
                                requested of
                                the above subject for the purpose stated.</p>
                            <div class="py-5">
                                <p class="text-center" style="font-weight: bold;">{{ fullname.toUpperCase() }}</p>
                                <p class="text-center">Signiture Over Printed Name of Claimant</p>
                            </div>
                            <div class="px-5 d-flex">
                                <div>
                                    <p class="text-center" style="font-weight: bold;">{{
                                        officialFullname(findOfficial("Secretary")).toUpperCase() }}</p>
                                    <p class="text-center">Secretary</p>
                                </div>
                            </div>
                            <div class="px-5 d-flex justify-end">
                                <div>
                                    <p class="text-center" style="font-weight: bold;">{{
                                        officialFullname(findOfficial("Punong Barangay")).toUpperCase() }}</p>
                                    <p class="text-center">Punong Barangay</p>
                                </div>
                            </div>
                            <div class="payment-section pt-3">
                                <div class="thumb-section"
                                    style="grid-column-start: 4; grid-column-end: 5; grid-row-start: 1; grid-row-end: 3;">
                                    <p style="font-size: .8rem;">Application's Thumb Mark</p>
                                    <div>
                                        <span>Left</span>
                                        <div></div>
                                        <span>Right</span>
                                    </div>
                                    <p style="font-size: .8rem;">No Valid Without Seal</p>
                                </div>
                                <div
                                    style="grid-column-start: 1; grid-column-end: 4; grid-row-start: 1; grid-row-end: 2;">
                                    <p>DATE ISSUED: {{ new Date(info.date_paid).toLocaleDateString() }}</p>
                                    <p>(6)Six Months Validity</p>
                                    <p style="font-size: .6rem; font-style: italic;">Validity of the {{ info.description
                                        }}
                                        from the Date
                                        of Issuance</p>
                                </div>
                                <div
                                    style="grid-column-start: 1; grid-column-end: 4; grid-row-start: 2; grid-row-end: 5; display: grid; grid-template-columns: 1fr .7fr;">
                                    <p style="font-weight: 500; grid-column-start: 1; grid-column-end: 3;">Paid Under
                                        the
                                        Following:</p>
                                    <p>Date Issued:</p>
                                    <p>{{ new Date(info.date_paid).toLocaleDateString() }}</p>
                                    <p>OR Number:</p>
                                    <p>{{ info.certification_id }}</p>
                                    <p>Document Fee:</p>
                                    <p>{{ info.document_cost }}.00</p>
                                    <p>Document Stamp:</p>
                                    <p>{{ info.stamp_fee }}.00</p>
                                    <p style="font-weight: 500; grid-column-start: 1; grid-column-end: 3;">Cedula
                                        Details:
                                    </p>
                                    <p>CTC Date Issued:</p>
                                    <p>{{ new Date(info.date_issued).toLocaleDateString() }}</p>
                                    <p>CTC Amount Paid:</p>
                                    <p>{{ info.total }}.00</p>
                                    <p>CTC No:</p>
                                    <p>{{ info.cedula_num }}</p>
                                    <p>CTC Place Issued:</p>
                                    <p>Bonifacio, San Fernando, Camarines Sur</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>
<style scoped>
.logo {
    width: 6rem;
}

.list {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr .9fr 1fr;
    gap: .3rem;
}

.thumb-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.thumb-section>div {
    width: 150px;
    height: 100px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    opacity: 50%;
}

.thumb-section>div>span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.thumb-section>div>div {
    width: 1px;
    height: 100%;
    background-color: black;
}

.payment-section {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
}

/* .details{
    display: grid;
    grid-template-columns: 1fr 1fr;
} */

.divider {
    background-color: black;
    width: 2px;
}
</style>

<script>
import axios from 'axios';


export default {
    props: {
        certification_id: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            info: '',
            officials: [],
        }
    },
    methods: {
        print() {
            // this.$htmlToPaper('printMe');
        },
        officialFullname(item) {
            return `${item.first_name} ${item.middle_name.charAt(0)}. ${item.last_name} ${item.suffix}`;
        },
        findOfficial(position) {
            return this.officials.find(item => item.description == position);
        }
    },
    computed: {
        fullname() {
            return `${this.info.first_name} ${this.info.middle_name.charAt(0)}. ${this.info.last_name} ${this.info.suffix}`;
        },
    },
    async mounted() {
        await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
            action: 'printDetails',
            certification_id: this.certification_id,
        }).then(response => {
            if (response) {
                this.info = response.data;
            }
        })

        await axios.post('http://localhost/bms/src/php/Request/fetch.php', {
            action: 'getOfficials',
            certification_id: this.certification_id,
        }).then(response => {
            if (response) {
                this.officials = response.data;
            }
        })
    }
}
</script>