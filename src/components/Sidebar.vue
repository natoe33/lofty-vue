<template>
  <div>
    <div :class="['sidebar', isSidebarActive ? '' : 'sidebar-hidden']">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <p>Components menu</p>
          <button class="btn btn-sm btn-link" @click="sidebarToggle()">
            <i class="material-icons-outlined">close</i>
          </button>
        </div>
        <div class="sidebar-body">
          <ul>
            <li class="sidebar-item" v-for="listing in listings" :key="listing.listing">
              <router-link to="/">
                <i class="material-icons-outlined">
                  home
                </i>
                {{listing.listing}}
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link to="/">
                <i class="material-icons-outlined">code</i>
                Sidebar
              </router-link>
            </li>
            <li class="sidebar-item disabled">
              <router-link to="/" :disabled="isDisabled">
                <i class="material-icons-outlined">code</i>
                Buttons
              </router-link>
            </li>
          </ul>
        </div>
        <div class="sidebar-footer">
          <a href="https://blog.colorffy.com" target="_blank" rel="noopener">
            By: blog.colorffy.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  props: {
    isSidebarActive: {
      type: Boolean,
      default: null,
    },
    sidebarToggle: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      isDisabled: true,
      listings: [],
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    async getData() {
      console.log('fetching data');
      //try {
      let response = await fetch("http://192.168.4.97:8090/api/listings");
      //let response = await fetch("/api/listings");
      this.listings = await response.json();
      console.log(this.listings);
      //} catch (error) {
      //  console.error(error);
      //}
    },
  },
  created() {
    console.log('created()');
    this.getData();
  },
};
</script>
