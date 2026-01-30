import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase/config'
import { ref } from 'vue'

const user = ref(null)

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
})

//HOW TO USE:
//   Crear funcion registrar async
//          const res = await doRegister(email.value, password.value)
//          if(res.ok) >>>>>>> EL REGISTRO FUNCIONO!
//              y ya hacemos las pirulas necesarias
const doRegister = async (email, password) => {
  try {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password)
    return {
      ok: true,
      user: credenciales,
    }
  } catch (error) {
    console.log(error)
  }
}

//HOW TO USE:
//   Crear funcion logear
//          const res = await doLogin(email.value, password.value)
//          if(res.ok) >>>>>>> EL REGISTRO FUNCIONO!
//              y ya hacemos las pirulas necesarias
const doLogin = async (email, password) => {
  try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password)
    return {
      ok: true,
      user: credenciales,
    }
  } catch (error) {
    console.log(error)
  }
}
// HOW TO USE:
//     crear funcion salir async
//         await logout() y ya
// if res.ok => ya hacemos cosas
const logOut = async () => {
  try {
    await signOut(auth)
    return {
      ok: true,
    }
  } catch (error) {
    console.log(error)
  }
}

//HOW TO USE:
export const enviarEmailVerificacion = async (usuarioActual = null) => {
  try {
    const usuario = usuarioActual || auth.currentUser
    if (usuario.emailVerified) {
      console.log('email ya verificado')
      return {
        ok: true,
        mensaje: 'email ya verificado',
      }
    }
    await sendEmailVerification(usuario, { url: window.location.origin + '/perfil' })
    return {
      ok: true,
      mensaje: 'email de verificación enviado, verifique su email',
    }
  } catch (error) {
    console.log(error)

    console.log('Ha habido un problema al enviar el correo de verificación')
  }
}

export const estaAuntenticado = () => {
  return user.value !== null
}
export const ObtenerUsuario = () => {
  return user.value
}

export { doLogin, doRegister, logOut, user }
