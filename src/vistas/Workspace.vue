<template>
  <h1>Favoritos</h1>
  <div v-for="(i, index) in lista_tareas" :key="index">
    <div id="datos">
      <p>Id: {{ i.id }}</p>
      <p>Tarea: {{ i.todo }}</p>
      <p>Realizada: {{ i.completed }}</p>
      <p>Usuario: {{ i.userId }}</p>
    </div>
  </div>
  
  <button @click="devolver">Añadir</button>
  <button @click="cerrar_sesion">Cerrar Sesión</button>
</template>

<script setup>
import { logOut } from '@/services/autentication';
import { useRouter } from 'vue-router';
import { obtenerFavoritos } from '@/services/tareas';
import { ref } from 'vue';

const lista_tareas = ref([]) 

const devolver = async () => {
  try {
    const resultados = await obtenerFavoritos()
    console.log(resultados)
    if (resultados.ok) {
    
      lista_tareas.value = resultados.favs
    } else {
      alert('Error al obtener favoritos')
    }
  } catch (error) {
    console.log(error)
  }
}

const router = useRouter()
const cerrar_sesion = async () => {
  const resultado = await logOut()
  if (resultado.ok) {
    router.push('/login')
  }
}
</script>

<style>
</style>