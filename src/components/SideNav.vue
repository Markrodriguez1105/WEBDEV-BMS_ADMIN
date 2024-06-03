<template>
  <v-toolbar app>
    <v-app-bar-nav-icon class="hidden-lg-and-up" variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Barangay Management System</v-toolbar-title>
  </v-toolbar>
  <v-navigation-drawer app expand-on-hover rail v-model="drawer">
    <v-list>
      <v-list-item prepend-avatar="../assets/images/logo.png" title="Barangay Bonifacio"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list v-for="list in lists" :key="list.text">
      <v-list-item class="navigationsIcons" :prepend-icon="list.icon" :title="list.text" :to="list.route" min-height="50"></v-list-item>
    </v-list>
    
    <v-divider></v-divider>

    <v-list>
      <v-list-item class="navigationsIcons" prepend-icon="mdi-arrow-left-box" title="Log out" min-height="50" to="/Login"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.navigationsIcons:hover {
  background-color: #3A53A5;
  color: white;
}
</style>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      lists: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-home-city', text: 'Barangay Information', route: '/BarangayInfo' },
        { icon: 'mdi-home-plus', text: 'Household Profiling', route: '/Household' },
        { icon: 'mdi-account-plus', text: 'Resident Profiling', route: '/Resident' },
        { icon: 'mdi-store-plus', text: 'Business Record', route: '/Business' },
        { icon: 'mdi-file-document-plus', text: 'Requested Document', route: '/Request' },
        { icon: 'mdi-comment-alert', text: 'Report', route: '/Report' },
        { icon: 'mdi-credit-card-outline', text: 'Treasury', route: '/Treasury' },
      ]
    }
  },
}
</script>