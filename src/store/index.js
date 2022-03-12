/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({

   state: {
      user: null
    },
    mutations: {
  
      SET_USER (state, user) {
        state.user = user
      },

      CLEAR_USER (state) {
        state.user = null
      }
    },
    actions: {
      async login ({ commit }, user) {
        const { email, password } = user
  
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
         switch(error.code) {
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
    }
})