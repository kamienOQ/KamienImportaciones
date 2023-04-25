import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword,reauthenticateWithCredential , createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup , updateEmail,updatePassword} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseDB } from "./config";
import { FirebaseApp } from "./config";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc,getDocs,updateDoc } from 'firebase/firestore'
const db = getFirestore(FirebaseApp)

const googleProvider = new GoogleAuthProvider();
export const singInWithGoogle = async() => {
  
  try {
      
      const result = await signInWithPopup(FirebaseAuth, googleProvider );
      // const credentials = GoogleAuthProvider.credentialFromResult( result );
      const { displayName, email, photoURL, uid } = result.user;
      
      return {
          ok: true,
          // User info
          user: { displayName, email, photoURL, uid }
      };
      

  } catch (error) {
      
      const errorCode = error.code;
      const errorMessage = error.message;
  
      return {
          ok: false,
          errorMessage,
      };
  };

};

export const loginWithEmailPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = result.user;

    return {
      ok: true,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
      errorMessage = "Credenciales incorrectas. Por favor, verifica tu correo y contraseña e intenta de nuevo.";
    } else if (errorCode === "auth/invalid-email") {
      errorMessage = "El correo es inválido.";
    }

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async (email, password, displayName) => {

  try {
    const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { photoURL, uid } = result.user;

    await updateProfile( FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      user: {
        uid,
        email,
        displayName,
        photoURL,
      },
    };

  } catch (error) {
    console.log(error);

    return { ok: false, errorMessage: error.message };
  }

};

export const resetPasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail( FirebaseAuth, email );

    return {
      ok: true,
      success: true
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === "auth/user-not-found") {
      errorMessage = "Por favor, verifica tu correo e intenta de nuevo.";
    } else if (errorCode === "auth/invalid-email") {
      errorMessage = "El correo es inválido.";
    }

    return {
      ok: false,
      errorMessage,
    };
  }
}

export const resetPassword = async (oobCode, password) => {
  try {
    await confirmPasswordReset( FirebaseAuth, oobCode, password );

    return {
      ok: true,
      success: true
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === "auth/invalid-action-code") {
      errorMessage = "El enlace de restablecimiento de contraseña que se ha proporcionado es inválido, expirado o ya se ha utilizado.";
    }

    return {
      ok: false,
      errorMessage,
    };
  }
}

export const getUserInfo = async() =>{
  try{
    const usersRef = doc(db, "users" , FirebaseAuth.currentUser.uid)
    const docSnap = await getDoc(usersRef)
    return docSnap.data()
  }catch(error){
    console.log("Error a la hora de obtener información del usuario : " ,error)
  }
}
export const updateLoggedUser = async(newData) =>{
  try{
    const usersRef = doc(db, "users" , FirebaseAuth.currentUser.uid)
    await updateDoc(usersRef,newData)
  }catch(error){
    console.log("Error a la hora de Editar el usuario : " ,error)
  }
}
export const updateUserEmail = async(email) => {
  try {
    await updateEmail(FirebaseAuth.currentUser,email);
    console.log("Email changed successfully!");
  } catch (error) {
    console.error(error);
  }
}

export const updateUserPassword = async(password) => {
  try {
    await updatePassword(FirebaseAuth.currentUser,password);
    console.log("Password changed successfully!");
  } catch (error) {
    console.error(error);
  }
  }

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}


export const getCurrentUser = async() => {
  try{
    const currentUserId =FirebaseAuth.currentUser.uid;
    const userRef = doc(FirebaseDB, "users", currentUserId);
    const userSnapshot = await getDoc(userRef)
    const userData = userSnapshot.data()
    return userData
  }catch(error){
    console.log(error)
    return 0
  }
}
export const getAllUsers = async() =>{
  const users = await getDocs(collection(db, "users"))
  return users.docs.filter(doc => doc.data().habilitado === true && doc.id !== FirebaseAuth.currentUser.uid).map(doc =>({id: doc.id, ...doc.data()}))
};

export const updateUser = async(uid,newData) => {
  try{
    const usersRef = doc(db, "users" , uid)
    await updateDoc(usersRef,newData)
  }catch(error){
    console.log("Error a la hora de actualizar el usuario : " ,error)
  }
}; 

export const eliminateUser = async(uid,newData) => {
  
  try{
    const usersRef = doc(db, "users" , uid)
    await updateDoc(usersRef,newData)
  }catch(error){
    console.log("Error a la hora de eliminar el usuario : " ,error)
  }
};

