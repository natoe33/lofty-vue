import { defineStore } from "pinia";

export const useListingStore = defineStore({
  id: "listing",
  state: () => ({
    states: [],
    byState: {},
  }),
  getters: {
    getStates: (state) => {
      return state.states;
    },
    getByState: (state) => {
      return state.byState;
    },
  },
  actions: {
    async fetchStates() {
      await fetch("https://api.nateflateau.com/api/states")
        .then((response) => response.json())
        .then((data) => {
          this.states = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async fetchListingByState() {
      await fetch("https://api.nateflateau.com/api/state_listings")
        .then((response) => response.json())
        .then((data) => {
          //this.byState[item["state"]] = { state: item["state"], data: data };
          this.byState = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
