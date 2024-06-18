<template>
  <v-app>
    <v-main v-if="user.admin_id">
      <SideNav @logout="login($event)" :user="user"/>
      <div>
        <router-view :user="user" />
      </div>
    </v-main>
    <v-main v-else>
      <Landing @login="login($event)" />
    </v-main>
  </v-app>
</template>
<script>

export default {
  data() {
    return {
      user: {
        admin_id: '3',
        position_id: '3',
        description: 'Secretary',
        first_name: 'Mark Anthony',
        middle_name: 'Amican',
        last_name: 'Rodriguez',
        suffix: '',
      },
    }
  },
  methods: {
    login(value) {
      this.user = value;
    },
    logout(value) {
      this.access = value;
    }
  }
}
</script>
