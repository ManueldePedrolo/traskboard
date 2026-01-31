<template>
  <div class="contenedor">
    <h1 class="saludo">Bienvenido al Login</h1>
    <form @submit.prevent="login" class="formulario">
      <label>Email</label>
      <input type="email" id="email" v-model="email" class="email" />
      <label>Pasword</label>
      <input type="password" id="password" v-model="password" class="password" />

      <button class="boton">Enviar Datos</button>
    </form>
    <router-link to="/register" class="registro">¿Estas registrado?</router-link>
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

<style scope lang="sass">
$primario: #42b883
$oscuro: #2c3e50
$fondo: #f4f7f6
$blanco: #ffffff

.contenedor
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 100vh
  background-color: $fondo
  padding: 20px
  box-sizing: border-box

  .saludo
    color: $oscuro
    font-size: 1.8rem
    margin-bottom: 2rem
    text-align: center
    font-family: sans-serif

  .formulario
    background: $blanco
    padding: 2.5rem
    border-radius: 15px
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1)
    width: 100%
    max-width: 400px
    display: flex
    flex-direction: column
    box-sizing: border-box

    label
      color: $oscuro
      font-weight: bold
      font-size: 0.9rem
      margin-bottom: 5px
      font-family: sans-serif
      text-align: left

    input
      width: 100%
      padding: 12px
      border: 1px solid #ddd
      border-radius: 8px
      font-size: 1rem
      margin-bottom: 1.5rem
      transition: all 0.3s ease
      box-sizing: border-box

      &:focus
        border-color: $primario
        outline: none

    .boton
      width: 100%
      background-color: $primario
      color: $blanco
      border: none
      padding: 14px
      border-radius: 8px
      font-size: 1rem
      font-weight: bold
      cursor: pointer
      margin-top: 0.5rem
      transition: opacity 0.3s, transform 0.1s

      &:hover
        opacity: 0.9

      &:active
        transform: scale(0.98)

  .registro
    margin-top: 1.5rem
    color: $oscuro
    text-decoration: none
    font-size: 1rem
    font-family: sans-serif

    &:hover
      color: $primario

@media (max-width: 480px)
  .contenedor
    padding: 10px
    .saludo
      font-size: 1.5rem
    .formulario
      padding: 1.5rem
      box-shadow: none
</style>

