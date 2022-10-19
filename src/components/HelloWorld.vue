<script>
import BarChart from "./BarChart.vue";

export default {
  components: {
    BarChart,
  },
  props: {
    msg: String
  },
  data() {
    return {
      loaded: false,
      dailyValues: []
    }
  },
  setup() {
    const labels = ["A", "B", "C"];
    const values = [1, 2, 3];
    let chartData = {
      labels: labels,
      datasets: [
        {
          label: "values",
          data: values,
        },
      ],
    }
    return {
      chartData
    }
  },
  methods: {
    async getDailyValues() {
      await fetch("http://192.168.4.99:8090/api/daily_values")
      .then(response => response.json())
      .then(data => {
        console.log('res data');
        console.log(data);
        this.labels = data.map(this.getDateArray).reverse();
        this.values = data.map(this.getValueArray).reverse();
        this.chartData = {
          labels: this.labels,
          datasets: [
            {
              label: "rent",
              data: this.values,
            }
          ]
        };
        this.loaded = true
      })
      .catch(err => {
        console.error(err);
      })
    },
    getDateArray(array) {
      return array.date_formatted;
    },
    getValueArray(array) {
      return array.sum;
    }
  },
  mounted() {
    this.getDailyValues();
  }
};
</script>

<template>
  <div class="greetings">
    <h1>Lofty Daily Income</h1>
    <BarChart ref="bar" :chart-data="this.chartData" v-if="loaded" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
.greetings {
  float: left;
  padding-left: 2rem;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
