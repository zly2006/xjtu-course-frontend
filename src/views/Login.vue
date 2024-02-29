<script lang="ts" setup>
import { ref } from 'vue';
import { useAppStore } from '@/store/app';
import { toast } from 'vuetify-sonner';

const username = ref('');
const password = ref('');
const loggingIn = ref(false);

const login = () => {
  loggingIn.value = true;
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      loggingIn.value = false
      toast('登录失败，请检查您的账号密码是否正确', {
        cardProps: {
          color: 'error'
        }
      })
    }
  }).then(data => {
    useAppStore().setCredentials(username.value, password.value);
    useAppStore().token = data.access_token;
    location.href = '/'
  });
};
</script>

<template>
  <v-form>
    <v-container class="login-form">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2>使用西安交通大学账号登录</h2>
          <p>
            登录即意味着您的账号密码将被本站保存，您的密码不会被用于除您手动操作外的任何用途。
          </p>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="username"
            label="Username"
            required
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            label="Password"
            required
            hide-details
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            :block="true"
            color="primary"
            @click="login"
            :loading="loggingIn"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>
