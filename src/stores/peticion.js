import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";


export const api = defineStore('counter',()=>{
    const lista_tareas = ref([])
    const getData = async()=>{
        const resultado = await axios.get("https://dummyjson.com/todos")
        lista_tareas.value = resultado.data.todos
    }
    return{lista_tareas,getData}
})