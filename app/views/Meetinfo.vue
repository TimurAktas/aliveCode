<template>
    <Page backgroundColor="#343434">
        <ActionBar backgroundColor="#343434">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Label style="font-size:20" :text="meetData.title" class="action-label"></Label>
                
            </StackLayout>
        </ActionBar>

       
        <GridLayout rows="20,auto,20,*" columns="">
            <StackLayout row="1" class="miniMap" >
              <MapView
                    width="100%"
                    height="100%"
                    :zoom="zoom"
                    :latitude="origin.latitude"
                    :longitude="origin.longitude"
                    v-if="allowExecution"
                    @mapReady="mapReady"
                    @coordinateLongPress="locationSelected"
                />
            </StackLayout>
                
            <StackLayout row="3">
           
     
                <StackLayout orientation="horizontal">
                    <Label :style="meetInfoFontColor" class="fas circleBtn-lbl" :text="'\uf3c5'"></Label>
                    <Label :style="meetInfoFontColor"  :text="meetData.location" textWrap="true" />
                </StackLayout>
                <StackLayout orientation="horizontal">
                    <Label :style="meetInfoFontColor" class="far circleBtn-lbl" :text="'\uf3c1'"></Label>
                    <Label :style="meetInfoFontColor"  :text="meetData.privacy" textWrap="true" />
                </StackLayout>
                <StackLayout orientation="horizontal">
                    <Label :style="meetInfoFontColor" class="far circleBtn-lbl" :text="'\uf017'"></Label>
                    <Label :style="meetInfoFontColor"  :text="meetData.date" textWrap="true" />
                </StackLayout>
                <Label color="white" text="Details" textWrap="true" />
                
                <TextView :style="meetInfoFontColor" :text="meetData.description" editable="false" />
                <StackLayout orientation="horizontal">
                    <Label color="white" text="Teilnehmer" textWrap="true" />
                  
                </StackLayout>
              
                
                <Label :style="meetInfoFontColor" :text="friend" v-for="(friend,index) in meetData.friends" :key=index textWrap="true" />
                <Button text="Alle anzeigen" class="aliveBtn-1" @tap="as" />
                
            </StackLayout>
        </GridLayout>
    </Page>
</template>


<script>
import MapStyle from '../map-style.json'
import * as platform from 'platform'

export default {
    props: ['meetData'],
    created() {

        },
    data(){
        return {
            origin: { latitude: 51.51494, longitude: 7.466 },
            destination: { latitude: 51.51494, longitude: 7.466 },
            journeyDetails: "Journey: Not started yet!",
            allowExecution: true,
            journeyStarted: false,
            mapView: null,
            zoom: 13,
            APIKEY: "AIzaSyAaJYHio6ZGvLKJyRxu8gfeupZIq6L45WY",
        }
    },
    methods:{
        mapReady(args){
            console.log("Map ist geladen")
            this.mapView = args.object;
            this.mapView.setStyle(MapStyle)
        }
    },
    computed:{
        meetInfoFontColor: function() {
            return{
                color: this.meetData.color,
                fontSize: "16em"
            }
        }
    }
}
</script>

<style scoped>
.aliveBtn-1{
    width: 90%;
    height: 40;
    font-size: 16em;
}

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

.miniMap{
    height: 130;
    width: 96%;
    border-radius: 20%;
}

</style>