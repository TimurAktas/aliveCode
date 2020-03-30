const firebase = require("nativescript-plugin-firebase");
const firebaseApi = require("nativescript-plugin-firebase/app");

const state = {
    meetsFromToday: [],
    newArray: [],
}

const getters = {
    meetsFromToday: state => state.meetsFromToday
}

const actions = {
    createNewMeet({commit},data){
        console.log("CREATE NEW MEET WITH DATA: ", data.title)
        return new Promise((resolve) => {
            firebase.getCurrentUser()
            .then(async user => {
                console.log("USER ID IN MEETS", user.uid)
                const meetsCollection = await firebaseApi.firestore().collection("meets");
    
                meetsCollection.add({
                    creatorId: user.uid,
                    title: data.title,
                    description: data.description,
                    privacy: data.privacy,
                    friends: data.friends,
                    location: data.location,
                    date: data.date,
                    category: data.category,
                    color: data.color
                }).then(docRef => {
                    console.log(`Meet created with auto-generated ID: ${docRef.id}`);
                    resolve(docRef.id)
                });
            })
            .catch(error => console.log("Trouble in paradise: " + error));
        })
    },
    getMeetsFromToday({commit}){
        const meetsDoc = firebaseApi.firestore().collection("meets");
        meetsDoc.get().then(querySnapshot => {
            querySnapshot.forEach( doc => {
                console.log("DOC DATA", doc.data())
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

                state.newArray.unshift({
                    creatorId: doc.data().creatorId,
                    title: doc.data().title,
                    description: doc.data().description,
                    privacy: doc.data().privacy,
                    friends: doc.data().friends,
                    location: doc.data().location,
                    date: doc.data().date,
                    category: doc.data().category,
                    color: doc.data().color
                }) 
            });  
            console.log("DAS IST NEW ARRAY", state.newArray)
            commit('SET_MEETS_FROM_TODAY')    
        }); 
    },
    getCreatedMeet({commit}, meetId){
        return new Promise((resolve) => {
            console.log("BIN IN GETCREATEDMEET")
            const meet = firebaseApi.firestore().collection("meets").doc(meetId);

            // note that the options object is optional, but you can use it to specify the source of data ("server", "cache", "default").
            meet.get().then(doc => {
            if (doc.exists) {
                console.log(`Document data: ${JSON.stringify(doc.data())}`);
                resolve(doc.data())
            } else {
                console.log("No such document!");
            }
            });

        })
    }
}

const mutations = {
    SET_MEETS_FROM_TODAY: (state ) => {
        setTimeout(function() {
            state.meetsFromToday = state.newArray
            state.newArray = []
        }, 1000);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}