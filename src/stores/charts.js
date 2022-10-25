import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => ({
    title: null,
    chartData: [],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    },
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
      state.loading = true;
      state.title = "Combined Values";
      // debugger;
      await fetch("https://api.nateflateau.com/api/daily_values")
        .then((response) => response.json())
        .then((data) => {
          state.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "rent",
                data: data.map(this.getValueArray).reverse(),
                backgroundColor: "#f87979",
              },
            ],
          };
          // this.chartOptions = {
          //   responsive: true,
          //   maintainAspectRatio: false,
          //   plugins: {
          //     title: {
          //       display: true,
          //       text: this.title,
          //     },
          //   },
          // };
          state.loading = false;
        })
        .catch((error) => (state.error = error));
    },
    async fetchListingLimit(id, address, limit) {
      // console.log(`fetching listings - id: ${id} limit: ${limit}`);
      state.loading = true;
      state.title = address;
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
          // console.log(data);
          state.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "rent",
                data: data.map(this.getRentArray).reverse(),
                backgroundColor: "#f87979",
              },
            ],
          };
          state.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: state.title,
              },
            },
          };
          state.loading = false;
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
