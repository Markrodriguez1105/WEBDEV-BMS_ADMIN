<template>
    <div>
        <v-toolbar color="primary" class="px-15">
            <img style="width: 2.5rem;" src="/src/assets/images/logo.png" alt="Logo"></img>

            <v-toolbar-title>Barangay Management System</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn>About</v-btn>
            <v-btn>Support</v-btn>
            <v-btn>Link</v-btn>
        </v-toolbar>
        <v-card class="ga-10 ma-10 px-10 py-5" elevation="5" rounded="lg">
            <v-row class="justify-center">
                <v-col cols="2">
                    <v-img class="mx-auto my-6" max-width="200" src="/src/assets/images/logo.png"></v-img>
                </v-col>
                <v-col cols="4">
                    <div class="text-subtitle-1 text-medium-emphasis">Account</div>
                    <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                        variant="outlined"></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Password

                        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                            target="_blank">
                            Forgot login password?</a>
                    </div>

                    <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="visible = !visible"></v-text-field>

                    <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="submit()">
                        Log In
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="ga-10 ma-10 px-10 py-5" elevation="0" rounded="lg">
            <v-row>
                <v-col>
                    <img style="width: 100%; height: 200px; object-fit: cover; border-radius: 20px;"
                        src="/src/assets/images/bonifacio.jpg" alt="Bonifaio">
                </v-col>
                <v-col>
                    <h2>Barangay Bonifacio is located at Municipality of San Fernando, Camarines Sur, Philippines. It is
                        a government organization that handle the need of their citizen like health care, financial
                        assistant and certification.</h2>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="ga-10 ma-10 px-10 py-5" elevation="5" rounded="lg">
            <h1>Previous Event</h1>

            <v-row>
                <v-col>
                    <v-card>
                        <v-img src="/src/assets/images/blood.jpg" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white">Blood Donation</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-img src="/src/assets/images/CleanUpDrive.png" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white">Clean Up Drive</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-img src="/src/assets/images/feed.jpg" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white">Feeding Program</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-img src="/src/assets/images/blood.jpg" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white">Blood Donation</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-img src="/src/assets/images/CleanUpDrive.png" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white">Clean Up Drive</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-img src="/src/assets/images/feed.jpg" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white">Feeding Program</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>

export default {
    props: {
        login: {
            type: Boolean,
        }
    },
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        submit() {
            this.$emit('login', true);
        }
    },
}
</script>