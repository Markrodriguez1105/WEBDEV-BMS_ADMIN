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
                            :rules="[v => !!v || 'Required', v => names.includes(v) || 'Not Resident']"
                            :items="names" item-title="name" item-value="id" variant="outlined"></v-combobox>
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
                        <v-combobox v-model="doc.document_type" label="Document Type*"
                            :items="items" :rules="[v => !!v || 'Required', v => items.includes(v) || 'Not a Document']"
                            variant="outlined"></v-combobox>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="doc.purpose" clearable label="Purpose*" :rules="[v => !!v || 'Required']"
                            variant="outlined"></v-text-field>
                    </v-row>
                    <v-card-actions class="d-flex justify-end ma-0 pa-0">
                        <v-btn size="large" width="50%" text="Cancel" @click="isActive.value = false"
                            prepend-icon="mdi-close"></v-btn>
                        <v-btn size="large" width="50%" text="Submit" type="submit" varient="flat"
                            prepend-icon="mdi-content-save-check" variant="flat" color="surface-variant"
                            @click="submit()"></v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>

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
        doc: {
            resident_id: '',
            email: '',
            phoneNum: '',
            documentType: '',
            purpose: '',
        },
        names: [
            { name: 'Mark Anthony A. Rodrigues', id: '22-10118' },
            { name: 'Jovel Portuguez', id: '22-10119' },
            { name: 'Kyle Josh Pornillos', id: '22-10120' },
            { name: 'Jesse Keene Tapan', id: '22-10121' },
            { name: 'Graham Russell Gonzales', id: '22-10122' },
        ],
        items: [
            'Indigency',
            'Clearance',
            'Certification'
        ]
    }),
    methods: {
        submit() {
            console.log(this.doc);
        },
        setForm() {
            if (this.selectedRow) {
                this.doc = this.selectedRow
                this.doc.resident_id = this.fullName(this.selectedRow);
            } else {
                this.doc = {
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
        }
    },
    mounted() {
        this.setForm();
    }
}
</script>