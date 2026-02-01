import { db } from '@/firebase/config'
import { doc, getDocs, setDoc, getDoc, addDoc, collection } from 'firebase/firestore'
import { auth } from '@/firebase/config'

const guardar = async (user, datos) => {
  try {
    const docRef = doc(db, 'usuarios', user.uid)
    await setDoc(docRef, datos)
    return {
      ok: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
    }
  }
}

const conseguir = async (user) => {
  try {
    const docRef = doc(db, 'usuarios', user.uid)
    const snoopDog = await getDoc(docRef)
    if (snoopDog.exists()) {
      return {
        ok: true,
        data: {
          id: snoopDog.id,
          ...snoopDog.data(),
        },
      }
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
    }
  }
}

const conseguirDocs = async () => {
  try {
    const docRef = collection(db, 'usuarios')
    const snoopDog = await getDocs(docRef)

    const datos = []
    snoopDog.forEach((dog) => {
      datos.push(dog.data())
    })

    return {
      ok: true,
      data: datos,
    }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

const anadirDoc = async (datos) => {
  try {
    const docRef = collection(db, 'culonuevo')
    const anadir = await addDoc(docRef, datos)
    return {
      ok: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
    }
  }
}

export const anadirFavoritos = async (favorito) => {
  const user = auth.currentUser
  const favoritosRef = collection(db, 'usuarios', user.uid, 'favoritos')
  await addDoc(favoritosRef, favorito)
  return {
    ok: true,
  }
}

export const obtenerFavoritos = async () => {
  const user = auth.currentUser

  const favRef = collection(db, 'usuarios', user.uid, 'favoritos')
  const snoopDog = await getDocs(favRef)

  const favoritos = snoopDog.docs.map((doc) => ({
    ...doc.data(),
    idDoc: doc.id,
  }))

  return {
    ok: true,
    favs: favoritos,
  }
}

export { guardar, anadirDoc, conseguir, conseguirDocs }
