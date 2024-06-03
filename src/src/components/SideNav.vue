<template>
  <v-toolbar app>
    <v-app-bar-nav-icon class="hidden-lg-and-up" variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ header }}</v-toolbar-title>
  </v-toolbar>
  <v-navigation-drawer app expand-on-hover rail v-model="drawer">
    <v-list>
      <v-list-item prepend-avatar="../assets/images/logo.png" :title="user.description"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <div v-for="list in lists" :key="list.text" class="my-2">
        <v-list-item v-if="list.access.includes(parseInt(user.position_id))" class="navigationsIcons"
          :prepend-icon="list.icon" :title="list.text" :to="list.route" min-height="50"
          @click="getHeader(list.text), overlay = !overlay"></v-list-item>
      </div>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item class="navigationsIcons" prepend-icon="mdi-arrow-left-box" title="Log out" min-height="50"
        to="/Landing" @click="logout()"></v-list-item>
      <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="primary" size="100" indeterminate></v-progress-circular>
        <img class="logo" src="/src/assets/images/logo.png" alt="logo.png">
      </v-overlay>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.navigationsIcons:hover {
  background-color: #3A53A5;
  color: white;
}

.logo {
  position: absolute;
  opacity: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  /* animation: spin 2s linear infinite; */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
export default {
  emits: ['logout'],
  props: {
    login: {
      type: Boolean,
    },
    user: {
      type: Object,
    }
  },
  data() {
    return {
      overlay: false,
      header: 'Barangay Management System',
      drawer: true,
      rail: true,
      lists: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/', access: [1, 2, 3, 4, 5, 6, 7, 8] },
        { icon: 'mdi-home-city', text: 'Barangay Information', route: '/BarangayInfo', access: [1, 2, 3, 4, 5, 6, 7, 8] },
        { icon: 'mdi-home-plus', text: 'Household Profiling', route: '/Household', access: [1, 2, 3, 4, 5, 6, 7, 8] },
        { icon: 'mdi-account-plus', text: 'Resident Profiling', route: '/Resident', access: [1, 2, 3, 4, 5, 6, 7, 8] },
        { icon: 'mdi-store-plus', text: 'Business Record', route: '/Business', access: [1, 2, 3, 4, 5, 6, 7] },
        { icon: 'mdi-file-document-plus', text: 'Requested Document', route: '/Request', access: [1, 3, 4] },
        { icon: 'mdi-comment-alert', text: 'Report', route: '/Report', access: [1, 3] },
        { icon: 'mdi-credit-card-outline', text: 'Treasury', route: '/Treasury', access: [1, 4] },
      ]
    }
  },
  methods: {
    getHeader(value) {
      this.header = value;
    },
    logout() {
      this.$emit('logout', null);
    }
  },
  watch: {
    overlay(val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 2000)
    },
  },
}
</script>