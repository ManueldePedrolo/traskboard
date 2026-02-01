<template>
  <div class="contenedor">
    <h1 class="saludo">Bienvenido al Register</h1>
    <form @submit.prevent="registrar" class="formulario">

      <label>Email</label>
      <input type="email" id="email" v-model="email" class="email"/>
      
      <label>Contraseña</label>
      <input type="password" id="password" v-model="password" class="password"/>
      
      <label>Repetir Contraseña</label>
      <input type="password" id="Comprobarpassword" v-model="Comprobarpassword" class="password"/>
      
      <button class="boton">Registrar</button>

    </form>

    <router-link to="/login" class="registro">¿Ya estás registrado? Loguéate</router-link>

  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
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

<style scoped lang="sass">



$blanco: #ffffff

.contenedor
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 100vh
  background-color: #f4f7f6
  padding: 20px
  box-sizing: border-box

  .saludo
    color: #2c3e50
    font-size: 1.8rem
    margin-bottom: 2rem
    text-align: center
    font-family: sans-serif

  .formulario
    background: #ffffff
    padding: 2.5rem
    border-radius: 15px
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1)
    width: 100%
    max-width: 400px
    display: flex
    flex-direction: column
    box-sizing: border-box

    label
      color: #2c3e50
      font-weight: bold
      font-size: 0.9rem
      margin-bottom: 5px
      font-family: sans-serif

    input
      width: 100%
      padding: 12px
      border: 1px solid #ddd
      border-radius: 8px
      font-size: 1rem
      margin-bottom: 1.2rem
      transition: all 0.3s ease
      box-sizing: border-box

      &:focus
        border-color: #42b883
        outline: none

    .boton
      width: 100%
      background-color: #42b883
      color: #ffffff
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
    color: #2c3e50
    text-decoration: none
    font-size: 1rem
    font-family: sans-serif

    &:hover
      color: #42b883

@media (max-width: 480px)
  .contenedor
    padding: 10px
    .saludo
      font-size: 1.5rem
    .formulario
      padding: 1.5rem
      box-shadow: none
</style>
