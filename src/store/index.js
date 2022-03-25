/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

import { auth, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ref,
  set,
  onValue,
  push,
  get,
  child,
  getDatabase,
  update,
} from "firebase/database";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    info: {},
    categories: [],
  },
  getters: {
    info: (s) => s.info,
    categories: (s) => s.categories,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    setCats(state, snap) {
      state.categories = snap;
    },
    clearInfo(state) {
      state.info = {};
    },
    setError(state, error) {
      state.error = error;
    },
  },

  actions: {
    async updateCategory({ dispatch, commit }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUserid");
        await update(ref(database, `/users/${uid}/categories/${id}`), {
          title,
          limit,
        });
      } catch (error) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ dispatch, commit }) {
      const uid = await dispatch("getUserid");
      //   const cats =  ref(database, `/users/${uid}/categories`);
      //  return  onValue(cats, (snapshot) => {
      //   const snap =  Object.keys(snapshot.val()).map((key) => ({...snapshot.val()[key],id: key, }));
      //   commit("setCats", snap);
      // });
      const dbRef = ref(database);
      try {
         await get(child(dbRef, `/users/${uid}/categories`))
         .then((snapshot) => {
          const cats = snapshot.val();
          const snap = Object.keys(cats).map((key) => ({
            ...cats[key],
            id: key,
          }));
          commit("setCats", snap);
        });
      } catch (error) {
        console.log("error");
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUserid");

        const category = await push(ref(database, `/users/${uid}/categories`), {
          title,
          limit,
        });

        return {
          title,
          limit,
          id: category.key,
        };
      } catch (error) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCurrency() {
      // получаем ключ из файла .env
      const key = process.env.VUE_APP_FIXER;
      const res = fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      return await (await res).json();
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserid");
        const userInfo = ref(database, `/users/${uid}/info`);
        onValue(userInfo, (snapshot) => {
          const info = snapshot.val();
          commit("setInfo", info);
        });
      } catch (e) {
        console.log("hi");
      }
    },
    async login({ commit }, user) {
      const { email, password } = user;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }
        throw error;
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("clearInfo");
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUserid");
        await set(ref(database, `/users/${uid}/info`), {
          bill: 10000,
          name: name,
        });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }
        throw error;
      }
    },
    getUserid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
  },
});
