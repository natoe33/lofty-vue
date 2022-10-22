import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => ({
    title: null,
    chartData: [],
    loading: true,
    error: null,
  }),
  getters: {
    getChartData: (state) => {
      return state.chartData;
    },
  },
  actions: {
    async fetchDailyValues() {
      this.loading = true;
      // debugger;
      await fetch("http://192.168.4.99:8090/api/daily_values")
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
        })
        .catch((error) => (this.error = error));
    },
    async fetchListingLimit(id, limit) {
      this.loading = true;
      await fetch(`http://192.168.4.99:8090/api/listing_values`, {
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
          this.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "rent",
                data: data.map(this.getRentArray).reverse(),
              },
            ],
          };
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
