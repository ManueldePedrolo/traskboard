<template>
  <div>
    <h1>Bienvenido al Login</h1>
    <form @submit.prevent="login">
      <input type="email" id="email" v-model="email" placeholder="email" />
      <input type="password" id="password" v-model="password" placeholder="contraseña" />

      <button>Enviar Datos</button>
    </form>
    <router-link to="/register">¿Estas registrado?</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { doLogin, enviarEmailVerificacion } from '@/services/autentication'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  const response = await doLogin(email.value, password.value)
  const usuario = response?.user?.user
  const respuestamail = enviarEmailVerificacion(usuario)
  if (respuestamail) {
    if (response.ok) {
      toast.success('La informacion correcta', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false,
      })
      router.push('/')
    } else {
      toast.error('No coinciden las constraseña', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false,
      })
    }
  } else {
    toast.error('Debes verificar el', {
      position: 'top-right',
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: true,
      rtl: false,
    })
  }
}
</script>

<style></style>
