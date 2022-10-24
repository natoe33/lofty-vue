import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => ({
    title: null,
    chartData: [],
    chartOptions: [],
    loading: true,
    error: null,
  }),
  getters: {
    getChartData: (state) => {
      return state.chartData;
    },
    getChartOptions: (state) => {
      return state.chartOptions;
    },
  },
  actions: {
    async fetchDailyValues() {
      this.loading = true;
      // debugger;
      await fetch("https://api.nateflateau.com/api/daily_values")
        .then((response) => response.json())
        .then((data) => {
          this.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "rent",
                data: data.map(this.getValueArray).reverse(),
              },
            ],
          };
          this.loading = false;
          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
          };
        })
        .catch((error) => (this.error = error));
    },
    async fetchListingLimit(id, limit) {
      console.log(`fetching listings - id: ${id} limit: ${limit}`);
      this.loading = true;
      await fetch(`https://api.nateflateau.com/api/listing_values`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing: id,
          limit: limit,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "rent",
                data: data.map(this.getRentArray).reverse(),
              },
            ],
          };
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDateArray(array) {
      return array.date_formatted;
    },
    getValueArray(array) {
      return array.sum;
    },
    getRentArray(array) {
      return array.value;
    },
  },
});
