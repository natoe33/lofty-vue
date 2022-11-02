import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => ({
    title: null,
    limit: 30,
    id: null,
    address: null,
    state: "",
    listings: [],
    chartData: [],
    lineData: [],
    lastQuery: "",
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          max: 1,
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
      this.lastQuery = "daily_values";
      // debugger;
      await fetch("https://api.nateflateau.com/api/daily_values", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: this.limit,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.chartData = {
            labels: data.map(this.getDateArray).reverse(),
            datasets: [
              {
                label: "All Listings",
                data: data.map(this.getValueArray).reverse(),
                backgroundColor: "#9483ff",
              },
            ],
          };
          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
          };
          this.lineData = Object.assign(
            this.chartData.labels.map((k, i) => ({
              [k]: this.chartData.datasets[0].data[i],
            }))
          );
          this.loading = false;
        })
        .catch((error) => this.$patch({ error: error }));
    },
    async fetchListingLimit(id, address) {
      // console.log(`fetching listings - id: ${id} limit: ${limit}`);
      this.loading = true;
      this.title = address;
      this.id = id;
      this.address = address;
      this.lastQuery = "listing_limit";
      // await fetch(`https://api.nateflateau.com/api/listing_values`, {
      await fetch(`http://192.168.4.97:8090/api/listing_values`, {
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
                label: this.title,
                data: data.map(this.getRentArray).reverse(),
                backgroundColor: "#9483ff",
              },
            ],
          };
          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
          };
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async fetchStateValues(state) {
      console.log(state);
      this.loading = true;
      this.title = state;
      this.state = state;
      this.address = this.id = null;
      this.lastQuery = "state_values";

      //await fetch(`https://api.nateflateau.com/api/state_values`, {
      await fetch(`http://192.168.4.97:8090/api/state_values`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: this.state,
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
                label: this.state,
                data: data.map(this.getValArray).reverse(),
                backgroundColor: "#9483ff",
              },
            ],
          };
          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
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
    getValArray(array) {
      return array.val;
    },
    getQuantityArray(array) {
      return array.quantity;
    },
    updateLimit(num) {
      this.limit = num;
      // lastQuery values: [state_values, listing_limit, daily_values]
      if (this.lastQuery == "daily_values") {
        this.fetchDailyValues();
      } else if (this.lastQuery == "listing_limit") {
        this.fetchListingLimit(this.id, this.address);
      } else if (this.lastQuery == "state_values") {
        this.fetchStateValues(this.state);
      }
      return this.limit;
    },
  },
});
