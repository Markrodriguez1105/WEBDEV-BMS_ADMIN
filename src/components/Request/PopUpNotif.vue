<template>
    <v-card class="d-flex align-end justify-center flex-wrap text-center pl-10 pr-5 py-2 flex-column" elevation="5" rounded>
        <h4>{{ name }}</h4>
        <p>{{ type }}</p>
    </v-card>
</template>
<script>

export default {
    props: {
        name: {
            type: String,
            default: 'No Name'
        },
        type: {
            type: String,
            default: 'No Type'
        }

    },
    data() {
        return {
        }
    }
}
</script>