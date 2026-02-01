<template>
  <div class="header">
    <router-link to="/tareas" class="titulo">Workspace</router-link>
    <button @click="cerrar_sesion" class="boton">Cerrar Sesion</button>
    
    <select v-model="filtro" class="select">
      <option value="" selected disabled hidden>Selecciona una opción</option>
      <option value="todas">Todas</option>
      <option value="realizadas">Realizadas</option>
      <option value="norealizadas">No realizadas</option>
    </select>
  </div>

  <div v-if="cargando" class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>

  <div v-else id="contenedor">
    <div id="contenido" v-for="(i, index) in filtrar" :key="index">
      <div id="datos">
        <p id="id">Id:{{ i.id }}</p>
        <p id="tarea">Tarea:{{ i.todo }}</p>
        <p id="realizada" v-if="i.completed">Realizada</p>
        <p id="norealizada" v-else>No Realizada</p>
      </div>

      <template v-if="!i.completed">
        <button id="boton" v-if="!i.userId" @click="favorito(i)"> Agregar</button>

        <button id="boton" v-else-if="i.userId !== user?.uid" disabled style="background: #cbd5e0; cursor: not-allowed;"> Asignada</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { api } from '@/stores/peticion'
import { onMounted, ref, watch } from 'vue'
import { anadirFavoritos, obtenerFavoritos } from '@/services/tareas'
import { logOut, user } from '@/services/autentication' 
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const tareasStore = api()

const filtro = ref('')
const filtrar = ref([])
const cargando = ref(false) 

const sincronizarTareas = async () => {
    await tareasStore.getData() 
    const res = await obtenerFavoritos() 
    
    if (res.ok && res.favs) {
        tareasStore.lista_tareas = tareasStore.lista_tareas.map(tApi => {
            const yaAsignada = res.favs.find(f => String(f.id) === String(tApi.id))
            
            if (yaAsignada) {
                return { ...tApi, userId: yaAsignada.userId }
            } else {
                const { userId, ...tareaLimpia } = tApi
                return tareaLimpia
            }
        })
    } else {
        tareasStore.lista_tareas = tareasStore.lista_tareas.map(t => {
            const { userId, ...tareaLimpia } = t
            return tareaLimpia
        })
    }
    filtrar.value = tareasStore.lista_tareas
}

onMounted(async() => {
    await sincronizarTareas()
})

const favorito = async (itemFavorito) => {
  try {
    if (!user.value) return;

    const tareaConDuenio = {
      ...itemFavorito,
      userId: user.value.uid
    }
    
    const response = await anadirFavoritos(tareaConDuenio)
    if (response.ok) {
      toast.success('Añadido a favoritos')
      await sincronizarTareas()
    }
  } catch (error) {
    toast.error('Error')
  }
}

watch(filtro, (nuevoValor) => {
  cargando.value = true 
  setTimeout(() => {
    if (nuevoValor === 'todas') {
      filtrar.value = tareasStore.lista_tareas
    } else if (nuevoValor === 'realizadas') {
      filtrar.value = tareasStore.lista_tareas.filter(t => t.completed)
    } else if (nuevoValor === 'norealizadas') {
      filtrar.value = tareasStore.lista_tareas.filter(t => !t.completed)
    } 
    cargando.value = false 
  }, 2500) 
})

const cerrar_sesion = async() => {
    const resultado = await logOut()
    if(resultado.ok) router.push('/login')
}
</script>
<style scoped lang="sass">
.header
  display: flex         
  justify-content: center 
  align-items: center      
  gap: 15px                
  margin: 20px 0        
  width: 100%
  .titulo
    background: #38a169
    color: white
    padding: 10px 25px
    border-radius: 20px
    text-decoration: none
    font-weight: bold

    margin-right: 15px
    transition: 0.3s

    &:hover
      background: #2f855a
      transform: scale(1.05)

  .boton
    background: #e53e3e
    color: white
    border: none
    padding: 10px 25px
    border-radius: 25px
    font-weight: bold
    cursor: pointer
    margin-right: 15px
    transition: 0.3s

    &:hover
      background: #c53030
      transform: scale(1.05)

  .select
    padding: 10px 20px
    border-radius: 20px
    border: 2px solid #38a169
    font-weight: bold
    outline: none

    &:focus
      border-color: #2f855a

#contenedor
  display: flex
  flex-wrap: wrap
  gap: 20px
  margin-top: 30px
  justify-content: center

#contenido
  width: 400px
  background: #f0fff4
  border-radius: 15px
  padding: 20px
  box-sizing: border-box
  border: 2px solid #9ae6b4
  transition: 0.3s

  &:hover
    transform: scale(1.05)
    box-shadow: 0 10px 25px rgba(0,0,0,0.2)

#datos
  display: flex
  flex-direction: column
  gap: 10px
  margin-bottom: 15px

#id
  font-weight: bold
  color: #2f855a

#tarea
  font-size: 18px
  font-weight: 600

#realizada
  color: green
  font-weight: bold

#norealizada
  color: #e53e3e
  font-weight: bold

#boton
  background: #38a169
  color: white
  width: 100%
  padding: 10px
  border-radius: 20px
  border: none
  font-weight: bold
  cursor: pointer
  transition: 0.3s

  &:hover
    background: #2f855a


@media (max-width: 900px)
  #contenido
    flex: 0 0 50%

@media (max-width: 600px)
  #contenido
    flex: 0 0 100%

.main-wrapper
  min-height: 100vh
  transition: background-color 0.6s ease
  background-color: #f4f7f6
  padding: 20px

  &.is-loading
    background-color: #1a1a1a

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
      background-color: #42b883
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
