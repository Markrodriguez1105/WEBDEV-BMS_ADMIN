<!-- src/components/DatabaseConnection.vue -->
<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Database Connection Status</v-card-title>
            <v-card-text>
              <v-alert
                v-if="message"
                :type="alertType"
                dismissible
              >
                {{ message }}
              </v-alert>
              <v-btn @click="checkConnection">Check Connection</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import api from '@/services/api.js';
  export default {
    data() {
      return {
        message: '',
        alertType: 'info',
      };
    },
    methods: {
      async checkConnection() {
        try {
          const response = await api.testConnection();
          this.message = response.data.message;
          this.alertType = 'success';
        } catch (error) {
          this.message = 'Failed to connect to the database.';
          this.alertType = 'error';
        }
      },
    },
  };
  </script>
  