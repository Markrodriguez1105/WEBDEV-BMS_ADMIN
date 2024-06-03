<template>
    <div>
      <h1 class="centered-heading">
        <span class="line"></span>
        Report
        <span class="line"></span>
      </h1>
      <RequestReport />
    </div>
  </template>
  
  <script setup>
  import RequestReport from '@/components/Report/RequestReport.vue'
  </script>
  
  <style scoped>
  .centered-heading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 0 35px;
  }
  
  .line {
    flex: 1;
    height: 3px;
    background-color: black; 
  }
  </style>
  