<template>
        <h1>Favoritos</h1>
    <div v-for="(i, index) in lista_fav" :key="index">
        <div>
            <img :src="i.image" alt="">
        </div>
        <div>
            <h1>Nombre:{{ i.name }}</h1>
            <h1>Género:{{ i.gender }}</h1>
            <h1>Especie:{{ i.species }}</h1>
            <h1>Estado:{{ i.status }}</h1>
    
        </div>

    </div>
    <button @click="devolver">Anadir</button>
    <button @click="cerrar_sesion">Cerrar Sesion</button>


</template>

<script setup>
import { logOut } from '@/services/autentication';
import { useRouter } from 'vue-router'
import { obtenerFavoritos } from '@/services/tareas';
import { ref } from 'vue';

const lista_tareas = ref([])
const devolver = async()=>{
  try{

    const resultados = await obtenerFavoritos()
    console.log(resultados)
    if(resultados.ok){
      lista_tareas.value = resultados.favs
    }else{
      alert('Putero')
    }
  }catch(error){
    console.log(error)
  }
}


const router = useRouter()
const cerrar_sesion = async() =>{
        const resultado = await logOut()
        if(resultado.ok){
            router.push('/login')
        }

    }
</script>

<style>

</style>