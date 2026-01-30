<template>
  <div id="contenedor">
    <div id="contenido" v-for="(i, index) in tareas.lista_tareas" :key="index">
        <div id="datos">
            <p>Id:{{ i.id }}</p>
            <p>Tarea:{{ i.todo }}</p>
            <p>Realizada:{{ i.completed }}</p>
            <p>Usuario:{{ i.userId }}</p>
        </div>
        <button @click="anadir">Agregar tarea</button>
    </div>
  </div>
</template>

<script setup>
import { api } from '@/stores/peticion';
import { onMounted } from 'vue';

const tareas = api()
onMounted(async()=>{
    await tareas.getData()
})
</script>

<style>

</style>
