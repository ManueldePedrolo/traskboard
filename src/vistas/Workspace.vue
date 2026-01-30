<template>
      <button @click="cerrar_sesion">Cerrar Sesion</button>
</template>

<script setup>

import { logOut } from '@/services/autentication';
import { useRouter } from 'vue-router'
import { anadirFavoritos } from '@/services/tareas';
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