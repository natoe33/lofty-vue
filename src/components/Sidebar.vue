<template>
  <div>
    <div :class="['sidebar', isSidebarActive  ? '' : 'sidebar-hidden']">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <p>Components menu</p>
          <button class="btn btn-sm btn-link" @click="sidebarToggle()">
            <i class="material-icons-outlined">close</i>
          </button>
        </div>
        <div class="sidebar-body">
          <ul>
            <NavItem v-for="listing in data" :listing="listing.listing" :link="listing.link" />
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

<script setup>
import NavItem from "./NavItem.vue";
const response = await fetch('http://192.168.4.97:8090/api/listings', {
  mode: 'cors'
})
const data = await response.json()

</script>

<script>
export default {
  name: "Sidebar",
  components: {
    NavItem
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      default: null
    },
    sidebarToggle: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isDisabled: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>