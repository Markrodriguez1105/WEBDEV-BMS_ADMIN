<template>
  <v-app>
    <v-main v-if="access">
      <SideNav @logout="login($event)" />
      <v-content>
        <router-view />
      </v-content>
    </v-main>
    <v-main v-else>
      <Landing @login="login($event)" />
    </v-main>
  </v-app>
</template>
<script>

export default{
  data(){
    return{
      access: false,
    }
  },
  methods: {
    login(value){
      this.access = value;
    },
    logout(value){
      this.access = value;
    }
  }
}
</script>
