<template>
  <button @click="cerrar_sesion">Cerrar Sesion</button>
  <div id="contenedor">
    <div id="contenido" v-for="(i, index) in tareas.lista_tareas" :key="index">
        <div id="datos">
            <p>Id:{{ i.id }}</p>
            <p>Tarea:{{ i.todo }}</p>
            <p>Realizada:{{ i.completed }}</p>
            <p>Usuario:{{ i.userId }}</p>
        </div>
        <button id="boton" @click="favorito({
            id: i.id,
            todo: i.todo,
            completed: i.completed,
            userId: i.userId
        })">Añadir Favoritos</button>
    </div>
  </div>
</template>

<script setup>
import { api } from '@/stores/peticion';
import { onMounted } from 'vue';
import { anadirFavoritos } from '@/services/tareas';
import { logOut } from '@/services/autentication';
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

const cerrar_sesion = async() => {
    const resultado = await logOut()
    if(resultado.ok){
        router.push('/login')
    }
}

const tareas = api()

onMounted(async() => {
    await tareas.getData()
})

const favorito = async (itemFavorito) => {
  try {
    console.log('Favorito a guardar:', itemFavorito)
    const response = await anadirFavoritos(itemFavorito)
    if (response.ok) {
        toast.success('Añadido a favoritos correctamente', {
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
    } else {
      console.log('Respuesta no exitosa:', response)
    }
  } catch (error) {
    toast.error('Error al añadir al favorito', {
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
    console.log(error)
  }
}
</script>