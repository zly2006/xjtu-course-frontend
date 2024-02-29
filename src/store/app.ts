// Utilities
import { defineStore } from 'pinia'
import { da } from 'vuetify/locale';

type AppStore = {
  theme: 'light' | 'dark'
  xjtuId: string
  xjtuPassword: string
  token?: string
}

function getState(): AppStore {
  const stroe = localStorage.getItem('xjtu-course')
  if (stroe) {
    const token = sessionStorage.getItem('xjtu-token') || undefined
    const data = JSON.parse(stroe) as AppStore
    data.token = token
    return data
  }
  return {
    theme: 'light',
    xjtuId: '',
    xjtuPassword: '',
  }
}

export const useAppStore = defineStore('xjtu-course', {
  state: getState,
  actions: {
    save() {
      localStorage.setItem('xjtu-course', JSON.stringify({
        theme: this.theme,
        xjtuId: this.xjtuId,
        xjtuPassword: this.xjtuPassword,
      }))
    },
    async getToken() {
      if (!this.token) {
        await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.xjtuId,
            password: this.xjtuPassword
          })
        }).then(res => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(res)
          }
        }).then(data => {
          this.token = data.access_token
          sessionStorage.setItem('xjtu-token', this.token!)
        })
      }
      return this.token
    },
    removeToken() {
      this.token = undefined
      sessionStorage.removeItem('xjtu-token')
    },
    setCredentials(id: string, password: string) {
      this.xjtuId = id
      this.xjtuPassword = password
      this.save()
    },
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      this.save()
    },
  }
})
