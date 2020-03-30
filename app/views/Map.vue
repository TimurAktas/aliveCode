<template>
    <GridLayout rows="auto,*" columns="*" backgroundColor="#343434">
        <TopNavigation row="0" />
        <MapView
            width="100%"
            height="100%"
            row="1"
            :zoom="zoom"
            :latitude="origin.latitude"
            :longitude="origin.longitude"
            v-if="allowExecution"
            @mapReady="mapReady"
            @coordinateLongPress="locationSelected"
        />
    </GridLayout>
</template>

<script>
import TopNavigation from '../components/navigation/TopNavigation'
import MapStyle from '../map-style.json'

import * as permissions from 'nativescript-permissions'
import * as platform from 'platform'

export default {
    created(){
        console.log("MAP - Bin in Created!!")
    },
    beforeMount(){
        console.log("MAP - Bin in BEFORE MOUNTED!!")
    },
    mounted(){
        console.log("MAP - Bin in MOUNTED!!")
    },
    components:{
        TopNavigation
    },
    data(){
        return{
            origin: { latitude: 51.51494, longitude: 7.466 },
            destination: { latitude: 51.51494, longitude: 7.466 },
            journeyDetails: "Journey: Not started yet!",
            allowExecution: false,
            journeyStarted: false,
            mapView: null,
            zoom: 20,
            APIKEY: "AIzaSyAaJYHio6ZGvLKJyRxu8gfeupZIq6L45WY"
        }
    },
    created() {
        /* dont run the android permissions routine for iOS */
        if (platform.isIOS) {
            this.allowExecution = true;
            return;
        }
        /* list of permissions needed */
        let permissionsNeeded = [
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION
        ];
        /* showing up permissions dialog */
        permissions
            .requestPermissions(permissionsNeeded, "Give it to me!")
            .then(() => this.allowExecution = true)
            .catch(() => this.allowExecution = false);
        },
    methods:{
        mapReady(args){
            console.log("Map ist geladen")
            this.mapView = args.object;
            this.mapView.setStyle(MapStyle)
        }
    }
}
</script>

<style>
Button {
  font-size: 9;
  background-color: #474747;
  color:white;
  width:25%;
}
ActionBar {
  background-color: #474747;
  color:white;
}
Page {
  background-color: #474747;
}
TextView {
  border-bottom-color: transparent;
  color:white;
  border-bottom-width: 1;
  padding: 15;
}
</style>