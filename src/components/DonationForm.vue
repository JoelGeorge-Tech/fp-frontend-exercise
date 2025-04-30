<template>
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
</template>

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