<template>
<!-- https://blog.colorffy.com/posts/how-to-create-an-animated-sidebar-with-vue-3 -->
  <div>
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <p>Components menu</p>
          <button class="btn btn-sm btn-link">
            X
          </button>
        </div>
        <div class="sidebar-body">
          <ul>
            <li class="sidebar-item">
              <router-link to="/">
                <i class="material-icons-outlined">code</i>
                Sidebar
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