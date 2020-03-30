import { setBoolean, setString, setNumber } from "tns-core-modules/application-settings/application-settings";

const firebase = require("nativescript-plugin-firebase");
const firebaseApi = require("nativescript-plugin-firebase/app");

const state = {
    currentUser: null,
}

const getters = {
    currentUser: state => state.currentUser,
}

const actions = {
    async loginUserWithEmailAndPasswort({commit, dispatch}, data) {
        return new Promise((resolve, reject)=>{
            firebase.login(
                {
                  type: firebase.LoginType.PASSWORD,
                  passwordOptions: {
                    email: data.email,
                    password: data.password
                  }
                })
                .then(async res => {
                    await dispatch('getCurrentUserData', res)
                    resolve()
                })
                .catch(error => {
                    console.log("STORE- LOGIN ERRRO: ", error)
                    reject(error)
                }
            )  
        })
    },
    async getCurrentUserData({commit},res){
        const userDoc = await firebaseApi.firestore().collection("users").doc(res.uid);
        return new Promise((resolve, reject) =>{
            userDoc.get().then(doc => {
                if (doc.exists) {
                    commit('SET_CURRENTUSER', doc)
                    console.log(`Document data: ${JSON.stringify(doc.data())}`);
                    console.log("CURRENTUSER-STATE: ", state.currentUser)
                    resolve()
                } else {
                    console.log("No such document!");
                    reject()
                }
              });
        })
        
       
    },
    createUserWithEmailandPassword({commit}, data){
        return new Promise((resolve) => {
            firebase.createUser({
                email: data.email,
                password: data.password
            }).then( user => {
                const citiesCollection = firebaseApi.firestore().collection("users");
                
                citiesCollection.doc(user.uid).set({
                    surname: data.surname,
                    lastname: data.lastname,
                    email: user.email,
                    gender: data.male,
                    interests: data.interests,
                    age: data.age,
                }).then(()=>{
                    console.log("User erfolgreich erstellt", user)
                    resolve()
                })
            },
            errorMessage => {
                console.log("User konnte nicht erstellt werde: ", errorMessage)
            });
        })
    },
}
const mutations = {
    SET_CURRENTUSER: (state, payload) => {
        var user = payload.data()
        setString("username", user.name)
        setNumber("age", 24),
        setNumber("friends", 420),
        setNumber("meets", 2300),
        setNumber("likes", 32)
        setNumber("locationX", 51.51494)
        setNumber("locationY", 7.466)
        setBoolean("isLogged", true)    

        state.currentUser = user
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}