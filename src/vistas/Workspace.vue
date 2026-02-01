<template>
  <div class="contenedor_volver"> 
    <router-link to="/" class="volver">Volver</router-link>
    <h1 class="favorito">Favoritos</h1>
  </div>
  <div class="contenedor">
    <div v-for="(i, index) in lista_tareas" :key="index" class="for">
      <div id="datos">
        <p class="id">Id: {{ i.id }}</p>
        <p class="tarea">Tarea: {{ i.todo }}</p>
        <p v-if="i.completed" class="realizada">Realizada</p>
        <p v-else class="norealizada">No Realizada</p>
      </div>
    </div>
  </div>

  <button @click="cerrar_sesion" class="cerrar">Cerrar Sesión</button>
</template>

<script setup>
import { logOut, user } from '@/services/autentication'; 
import { useRouter } from 'vue-router';
import { obtenerFavoritos } from '@/services/tareas';
import { onActivated, ref, onMounted, watch } from 'vue';

const lista_tareas = ref([]) 

const devolver = async () => {
  try {
    const resultados = await obtenerFavoritos()
    if (resultados.ok && resultados.favs && user.value) {
      const miUid = user.value.uid
      lista_tareas.value = resultados.favs.filter(tarea => String(tarea.userId) === String(miUid))
    }
  } catch (error) {
    console.log(error)
  }
}

watch(user, (val) => {
  if (val) devolver()
}, { immediate: true })

onActivated(()=> {
  devolver()
})

onMounted(() => {
  devolver()
})

const router = useRouter()
const cerrar_sesion = async () => {
  const resultado = await logOut()
  if (resultado.ok) {
    router.push('/login')
  }
}
</script>

<style scoped lang="sass">

.contenedor
  display: flex
  flex-wrap: wrap
  gap: 10px
  padding: 10px

  .for
    flex: 30%
    background: #f0fff4
    border-radius: 15px
    padding: 20px
    box-sizing: border-box
    border: 2px solid #9ae6b4
    &:hover
      transform: scale(1.05)
      box-shadow: 0 10px 25px rgba(0,0,0,0.2)
    #datos
      display: flex
      flex-direction: column
      gap: 10px

      .id
        color: #38a169
        font-weight: bold

      .tarea
        font-size: 18px
        font-weight: 600

      .realizada
        color: green
        font-weight: bold

      .norealizada
        color: #e53e3e
        font-weight: bold
.cerrar
  margin: 40px auto
  display: block
  padding: 14px 35px
  background: #e53e3e
  color: white
  font-size: 16px
  font-weight: bold
  border: none
  border-radius: 30px
  cursor: pointer
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease

  &:hover
    background: #c53030
    transform: scale(1.05)
    box-shadow: 0 8px 18px rgba(0,0,0,0.25)

  &:active
    transform: scale(0.95)
.contenedor_volver
  margin: 30px 5px
  display: flex           
  align-items: center      
  justify-content: center  
  gap: 20px                

  .favorito
    margin: 0              
    font-size: 32px
  .volver
   
    margin: 10px
    padding: 10px 25px
    background: #38a169
    color: white
    text-decoration: none
    font-weight: bold
    border-radius: 20px
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease

    &:hover
      background: #2f855a
      transform: scale(1.05)
      box-shadow: 0 6px 15px rgba(0,0,0,0.25)

</style>