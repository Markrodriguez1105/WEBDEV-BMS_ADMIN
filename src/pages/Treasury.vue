<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1
          style="
            text-align: center;
            font-size: 32px;
            margin-top: 5px;
            color: #3a53a5;
          "
        >
          Cedula
        </h1>
      </v-col>
    </v-row>
  </div>

  <!--IMPORT-->
    <Cedula /> 

  </template>

<script setup>
  import Cedula from '@/components/Treasury/Cedula.vue'
  import regions from '@/assets/region.json';
 
  </script>