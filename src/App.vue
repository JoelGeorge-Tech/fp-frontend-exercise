<!--Render-->
<template>
  <div class="app-wrapper">
    <div class="outer-container">
      <div class="donation-container">
        <div class="header"> 
          <h2>Support us from the US</h2>
        </div>
        <div class="donation-form">
          <div class="input-group">
            <label for="amount">Amount (USD)</label>
            <input
              type="number"
              id="amount"
              v-model.number="amount"
              placeholder="Enter amount in USD"
              min=0
            >
          </div>
          <div class="input-group">
            <label for="amount">Estimate (GBP)</label>
            <input
              type="number"
              id="estimateBox"
              v-model.number="estimate"
              placeholder="£"
              disabled="true"
            >
          </div>
          <button class="pledge-button" @click="calculateConversion">
            Calculate
          </button>
        </div>
      </div> 
     <div class="indie-pledge-container">
      <header>Indie pledge</header>
      <div class="location">London, United Kingdom</div> 
      <p>We're finding solutions to the world's most pressing problems through evidence-led and thoughtful approaches to impact.</p>
    </div>
  </div>
</div>
</template>

<!-- Busines Logic-->
<script>
  export default {
    data() {
      return {
        amount: null,
        estimate: null,
      }
    },
    methods: {
      setAmount(value) {
        this.amount = value;
      },
      async calculateConversion() {
        // Early return for null, undefined, or invalid amounts
        if (this.amount === null || this.amount === undefined || isNaN(this.amount) || this.amount <= 0) {
          this.estimate = null;
          return;
        }

        try {
          const response = await fetch('https://founderspledge.github.io/fp-interview-exercise-api/currency.json');
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          this.currencyData = await response.json();
          if (!this.currencyData) {
            throw new Error('Invalid currency data');
          }

          this.conversionRate = this.currencyData.quotes.USDGBP;
          this.estimate = (this.amount * this.conversionRate).toFixed(2);
        } catch (err) {
          this.estimate = null;
          console.error('Error fetching currency data:', err);
        }
      }
    }
  }
</script>


<!--Style Sheet-->
<style src="./assets/style.css"></style>


