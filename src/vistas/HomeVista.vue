<template>
  <router-link to="/tareas">Workspace</router-link>
  <button @click="cerrar_sesion">Cerrar Sesion</button>
  
  <select v-model="filtro">
    <option value="" selected disabled hidden>Selecciona una opción</option>
    <option value="todas">Todas</option>
    <option value="realizadas">Realizadas</option>
    <option value="norealizadas">No realizadas</option>
  </select>

  <div v-if="cargando" class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>

  <div v-else id="contenedor">
    <div id="contenido" v-for="(i, index) in filtrar" :key="index">
      <div id="datos">
        <p>Id:{{ i.id }}</p>
        <p>Tarea:{{ i.todo }}</p>
        <p v-if="i.completed">Realizada</p>
        <p v-else>No Realizada</p>
      </div>
      <button id="boton" v-if="!i.completed" @click="favorito(i)"> Añadir Favorito</button>
    </div>
  </div>
</template>

<style scoped lang="sass">
$primary: #42b883
$bg-normal: #f4f7f6
$bg-loading: #1a1a1a

.main-wrapper
  min-height: 100vh
  transition: background-color 0.6s ease
  background-color: $bg-normal
  padding: 20px

  &.is-loading
    background-color: $bg-loading

.sk-folding-cube
  margin: 150px auto
  width: 120px
  height: 120px
  position: relative
  transform: rotateZ(45deg)

  .sk-cube
    float: left
    width: 50%
    height: 50%
    position: relative
    transform: scale(1.1)
    
    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: $primary
      animation: sk-foldCubeAngle 2.4s infinite linear both
      transform-origin: 100% 100%

  .sk-cube2
    transform: scale(1.1) rotateZ(90deg)
    &:before
      animation-delay: 0.3s

  .sk-cube3
    transform: scale(1.1) rotateZ(180deg)
    &:before
      animation-delay: 0.6s

  .sk-cube4
    transform: scale(1.1) rotateZ(270deg)
    &:before
      animation-delay: 0.9s

@keyframes sk-foldCubeAngle
  0%, 10%
    transform: perspective(300px) rotateX(-180deg)
    opacity: 0
  25%, 75%
    transform: perspective(300px) rotateX(0deg)
    opacity: 1
  90%, 100%
    transform: perspective(300px) rotateY(180deg)
    opacity: 0


</style>

<script setup>
import { api } from '@/stores/peticion'
import { onMounted, ref, watch } from 'vue'
import { anadirFavoritos } from '@/services/tareas'
import { logOut } from '@/services/autentication'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const tareas = api()


const cerrar_sesion = async() => {
    const resultado = await logOut()
    if(resultado.ok) router.push('/login')
}

onMounted(async() => {
    await tareas.getData()
    filtrar.value = tareas.lista_tareas
})

const favorito = async (itemFavorito) => {
  try {
    const response = await anadirFavoritos(itemFavorito)
    if (response.ok) toast.success('Añadido a favoritos')
  } catch (error) {
    toast.error('Error')
  }
}
const filtro = ref('')
const filtrar = ref([])
const cargando = ref(false) 

watch(filtro, (nuevoValor) => {
  cargando.value = true 
  setTimeout(() => {
    if (nuevoValor === 'todas') {
      filtrar.value = tareas.lista_tareas
    } else if (nuevoValor === 'realizadas') {
      filtrar.value = tareas.lista_tareas.filter(tarea => tarea.completed === true)
    } else if (nuevoValor === 'norealizadas') {
      filtrar.value = tareas.lista_tareas.filter(tarea => tarea.completed === false)
    } 
    cargando.value = false 
  }, 2000) 
})
</script>