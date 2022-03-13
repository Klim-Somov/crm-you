/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, database } from '../firebase'
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut
} from 'firebase/auth'
import { ref,  set } from 'firebase/database'
// import { getDatabase, ref, set  } from 'firebase/database'


Vue.use(Vuex)
export default new Vuex.Store({
   state: {
      user: null
   },
   mutations: {
 
   },
   actions: {
      async login({ commit }, user) { 
         const { email, password } = user
         
         try {
            await signInWithEmailAndPassword(auth, email, password)
         } catch (error) {
            switch (error.code) {
               case 'auth/user-not-found':
                  alert("User not found")
                  break
               case 'auth/wrong-password':
                  alert("Wrong password")
                  break
               default:
                  alert("Something went wrong")
            }
            throw error
         }
      },
      async logout({
         commit
      }) {

         await signOut(auth)
      },
      async register ({ dispatch }, { email, password, name }) {
         try {
            await createUserWithEmailAndPassword(auth, email, password)
            const uid = await dispatch('getUserid')
            await set(ref(database, `/users/${uid}/info` ), {
               bill: 10000,
               name: name
            })
            
            // await database.Reference(`/users/${uid}/info`).set({
            //    bill: 10000,
            //    name: name
            // }           
            // )
         } catch (error) {
            switch(error.code) {
              case 'auth/email-already-in-use':
                alert("Email already in use")
                break
              case 'auth/invalid-email':
                alert("Invalid email")
                break
              case 'auth/operation-not-allowed':
                alert("Operation not allowed")
                break
              case 'auth/weak-password':
                alert("Weak password")
                break
              default:
                alert("Something went wrong")      
            }
            throw error
         }        
      },

      getUserid() { 
         const user = auth.currentUser;          
         return user ? user.uid : null 
      }
   }
})