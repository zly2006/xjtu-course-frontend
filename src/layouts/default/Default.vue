<script lang="ts" setup>
import DefaultView from './View.vue'
import { VSonner } from 'vuetify-sonner';
import { useAppStore } from '@/store/app';

const theme = useAppStore().theme
function toggleTheme() {
  useAppStore().setTheme(theme === 'light' ? 'dark' : 'light')
  location.reload()
}
function logout() {
  useAppStore().setCredentials('', '')
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <template #prepend>
        <v-btn icon="mdi-home" title="Home" href="/" />
      </template>
      <template #append>
        <v-btn
          text="Login"
          variant="plain"
          href="/login"
          v-if="!useAppStore().xjtuId"
        />
        <p v-else> 登录学号 {{ useAppStore().xjtuId }}
          <v-btn
            text="Logout"
            variant="plain"
            @click="logout"
          />
        </p>
        <v-btn :icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'" @click="toggleTheme" title="Toggle Theme" />
        <v-btn icon="mdi-github" title="Github" href="https://github.com/zly2006/reden-is-what-we-made" />
      </template>
    </v-app-bar>

    <VSonner position="top-center" :expand="true"/>
    <DefaultView />
    <v-footer class="d-flex flex-column">
      <v-row>
        <v-col class="text-center">
          <p>
            西交课程助手
          </p>
          <p>
            Copyright (c) {{ new Date().getFullYear()}},
            <a href="https://github.com/zly2006">zly2006</a>,
            licensed under AGPL License
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
