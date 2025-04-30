import DonationForm from './test.vue';

<!--Render-->
<template>
  <div class="app-wrapper">
    <div class="outer-container">
     <DonationForm />
     <IndiePledgeInfo/>
    </div>
  </div>
</template>

<!-- Busines Logic-->
<script>
  import DonationForm from './components/DonationForm.vue'; // Adjust path if needed
  import IndiePledgeInfo from './components/IndiePledgeInfo.vue';
  export default {
    components: {
      DonationForm,
      IndiePledgeInfo
    }
  }
</script>


<!--Style Sheet-->
<style src="./assets/style.css"></style>


