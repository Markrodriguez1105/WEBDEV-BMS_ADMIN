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
      access: false,
      user: {
        admin_id: '',
        postion_id: '',
        description: '',
        first_name: '',
        middle_name: '',
        last_name: '',
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
