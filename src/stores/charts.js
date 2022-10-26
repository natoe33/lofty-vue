import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => ({
    title: null,
    limit: 30,
    chartData: [],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "",
        },
      },
    },
    loading: false,
    error: null,
  }),
  getters: {
    getChartData: (state) => {
      return state.chartData;
    },
    getChartOptions: (state) => {
      return state.chartOptions;
    },
    getDateLimit: (state) => state.limit,
  },
  actions: {
    async fetchDailyValues() {
      this.loading = true;
      this.title = "Combined Values";
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
                backgroundColor: "#f87979",
              },
            ],
          };
          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: this.title,
              },
            },
          };
          this.loading = false;
        })
        .catch((error) => this.$patch({ error: error }));
    },
    async fetchListingLimit(id, address) {
      // console.log(`fetching listings - id: ${id} limit: ${limit}`);
      this.loading = true;
      this.title = address;
      await fetch(`https://api.nateflateau.com/api/listing_values`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing: id,
          limit: this.limit,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          this.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "rent",
                data: data.map(this.getRentArray).reverse(),
                backgroundColor: "#f87979",
              },
            ],
          };
          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: this.title,
              },
            },
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
    updateLimit(num) {
      return (this.limit = num);
    },
  },
});
