<template>
    <li class="sidebar-item">
        <router-link to="{{link}}">
            {{listing}}
        </router-link>
    </li>
</template>
<script>
export default {
  name: "NavItem",
  props: {
    listing: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  }
}
</script>