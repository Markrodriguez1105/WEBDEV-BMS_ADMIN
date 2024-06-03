<template>
    <v-card class="w-100 d-flex gap-3 flex-column align-center p-5">
        <v-col>
            <h5>Name</h5>
            <v-row>
                <v-responsive max-width="100%">
                    <v-text-field class="m-2" :rules="[rules.required]" variant="outlined" clearable hide-details="auto"
                        label="First name"></v-text-field>
                </v-responsive>
                <v-responsive max-width="100%">
                    <v-text-field class="m-2" clearable variant="outlined" hide-details="auto"
                        label="Middle name"></v-text-field>
                </v-responsive>
                <v-responsive max-width="100%">
                    <v-text-field class="m-2" :rules="[rules.required]" variant="outlined" clearable hide-details="auto"
                        label="Last name"></v-text-field>
                </v-responsive>
                <v-responsive max-width="10%">
                    <v-text-field class="m-2" clearable variant="outlined" hide-details="auto"
                        label="Suffix"></v-text-field>
                </v-responsive>
            </v-row>
        </v-col>
        <v-col>
            <h5>Contact</h5>
            <v-row>
                <v-responsive max-width="100%">
                    <v-text-field class="m-2" :rules="[rules.required]" variant="outlined" clearable hide-details="auto"
                        label="Email"></v-text-field>
                </v-responsive>
                <v-responsive max-width="100%">
                    <v-text-field class="m-2" clearable variant="outlined" hide-details="auto"
                        label="Phone Number"></v-text-field>
                </v-responsive>
            </v-row>
        </v-col>
        <v-col>
            <h5>Document</h5>
            <v-row>
                <v-combobox class="m-2" ref="country" :items="['Barangay Certification', 'Barangay Permit']" clearable
                    :rules="[rules.required]" label="Category" variant="outlined" placeholder="Select..."
                    required></v-combobox>
                <v-combobox class="m-2" ref="country" :items="['Business Permit', 'Indidency', 'Clearance']" clearable
                    :rules="[rules.required]" label="Document Type" variant="outlined" placeholder="Select..."
                    required></v-combobox>
            </v-row>
        </v-col>
        <v-btn class="w-25" color="success">Submit</v-btn>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        rules: {
            required: value => !!value || 'Input Required',
        },
        cat: ['Barangay Certification', 'Barangay Permit']
    }),
}
</script>
<style>
</style>