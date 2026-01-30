<template>
  <div>
    <h1>Bienvenido al Register</h1>
    <form @submit.prevent="registrar">
      <input type="email" id="email" v-model="email" placeholder="email" />
      <input type="password" id="password" v-model="password" placeholder="contraseña" />
      <input
        type="password"
        id="Comprobarpassword"
        v-model="Comprobarpassword"
        placeholder="contraseña"
      />
      <button>Registrar</button>
    </form>
    <router-link to="/login">¿Estas logeado?</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { doRegister, enviarEmailVerificacion } from '@/services/autentication'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const email = ref('')
const password = ref('')
const Comprobarpassword = ref('')
const valido = computed(() => {
  return Comprobarpassword.value === password.value
})
const registrar = async () => {
  if (!valido.value) {
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
    return
  }
  const response = await doRegister(email.value, password.value)

  if (response.ok) {
    await enviarEmailVerificacion(response.user.user)
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
    router.push('/login')
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
}
</script>

<style></style>
