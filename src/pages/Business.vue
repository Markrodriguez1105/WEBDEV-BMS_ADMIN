<template>
  <div class="business-title">
      <div class="title-line"></div>
      <h1 class="title-text">Business Profiling</h1>
      <div class="title-line"></div>
    </div>
  <BusinessForm />
</template>

<script setup>
import BusinessForm from '@/components/Business/BusinessFormTemplate.vue'

</script>

<style scoped>
.business-title {
    display: flex;
    align-items: center;
  }
  
  .title-line {
    flex-grow: 1;
    height: 0;
    border-top: 4px solid #000; /* Adjust color as needed */
    margin-left: 10px; /* Adjust spacing as needed */
    margin-right: 10px;
  }
  
  .title-text {
    margin: 0 20px; /* Adjust spacing as needed */
  }
</style>
