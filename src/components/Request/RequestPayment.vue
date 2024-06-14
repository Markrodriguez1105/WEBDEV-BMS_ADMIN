<template>
    <v-dialog max-width="600" persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn width="100%" persistent prepend-icon="mdi-cash" variant="tonal" v-bind="activatorProps" flat
                text="Payment"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card class="pa-5" prepend-icon="mdi-cash" title="Payment">
                <v-form @submit.prevent class="pa-10 d-flex flex-column ga-2">
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>

</script>