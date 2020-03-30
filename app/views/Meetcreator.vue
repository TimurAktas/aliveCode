<template>
<StackLayout class="mainGrid" >
  <ScrollView>
      <GridLayout rows="30,100,30,auto,30,60" columns="*,*" height="auto" >
        <GridLayout rows="*,*" columns="*" col="0" row="1" colSpan="2" >
            <TextField color="white" row="0" hint="Titel des Events..." :text="title" v-model="title"/>
            <TextField color="white" row="1" hint="Beschreibung des Event..." :text="description" v-model="description" />
        </GridLayout>

        <StackLayout col="0" row="3" >
          <StackLayout class="creatorBtn"  @tap="changePrivacy" >
            <Label  text="Privacy" textWrap="true" />
            <Label :text="privacy" textWrap="true" />
          </StackLayout>
           <StackLayout class="creatorBtn" @tap="openFriendpickerModal">
            <Label text="Friends" textWrap="true" />
            <Label :text="friends" textWrap="true" />
          </StackLayout>
           <StackLayout class="creatorBtn" @tap="openLocationpickerModal">
            <Label text="Location" textWrap="true" />
            <Label :text="location" textWrap="true" />
          </StackLayout>
           <StackLayout class="creatorBtn">
            <Label text="Foto/Video" textWrap="true" />
            <Label text="-" textWrap="true" />
          </StackLayout>
        </StackLayout>

        <StackLayout col="1" row="3" >
            <StackLayout class="creatorBtn" @tap="changeColor">
              <Label text="Color" textWrap="true" />
              <Label :text="color" textWrap="true" />
            </StackLayout>
            <StackLayout class="creatorBtn" @tap="openDateTimepickerModal">
              <Label text="Time" textWrap="true" />
              <Label :text="date" textWrap="true" />
            </StackLayout>
            <StackLayout class="creatorBtn">
              <Label text="Age" textWrap="true" />
               <Label text="-" textWrap="true" />
            </StackLayout>
             <StackLayout class="creatorBtn">
              <Label text="Kategorie" textWrap="true" />
              <Label :text="category" textWrap="true"  />
            </StackLayout>
        </StackLayout>
        <StackLayout col="0" row="5" colSpan="2"  v-if="!loading">
          <StackLayout class="aliveBtn-1" @tap="createNewMeet">
            <Label class="Btn-txt-1" text="Meet starten" textWrap="true" />
          </StackLayout>
        </StackLayout>
        <StackLayout col="0" row="5" colSpan="2" v-else >
          <Label color="white" text="Loading..." textWrap="true" />
        </StackLayout>
      </GridLayout>
    </ScrollView>
</StackLayout>
</template>

<script>
import Meetinfo from './Meetinfo'

import Friendpicker from '../components/meetcreator/Friendpicker'
import Locationpicker from '../components/meetcreator/Locationpicker'
import DateTimepicker from '../components/meetcreator/DateTimepicker'

export default {
    components:{
        Friendpicker,
        Locationpicker,
        DateTimepicker
    },
    data(){
        return{
            description: null,
            title: null,
            privacy: "Öffentlich",
            friends: null,
            location: null,
            date: null,
            category: 'Unterhaltung',
            color: "red",
            loading: false,
        }
    },
    methods:{
      changePrivacy(){
        if(this.privacy == "Öffentlich"){
          this.privacy = "Privat"
        }else{
          this.privacy = "Öffentlich"
        }
      },
      openFriendpickerModal(){
        this.$showModal(Friendpicker, {fullscreen:true, props: { selectedFriends: this.friends }})
          .then( selectedFriends => this.friends = selectedFriends)
      },
      openLocationpickerModal(){
        this.$showModal(Locationpicker, {fullscreen:true, props: { selectedLocation: this.location }})
          .then( selectedLocation => this.location = selectedLocation)
      },
      openDateTimepickerModal(){
        const dateTime = { date: this.date, time: this.time}
        this.$showModal(DateTimepicker, {fullscreen:true, props: { selectedDateTime: dateTime }})
          .then( selectedDateTime => {
            this.date = selectedDateTime
          })
      },
      changeColor(){
        var rndInt = Math.floor(Math.random() * 10); 
        console.log(rndInt)
        switch(rndInt){
          case 0: this.color = "red"; break;
          case 1: this.color = "blue"; break;
          case 2: this.color = "yellow"; break;
          case 3: this.color = "aqua"; break;
          case 4: this.color = "brown"; break;
          case 5: this.color = "Chartreuse"; break;
          case 6: this.color = "DarkCyan"; break;
          case 7: this.color = "DarkMagenta"; break;
          case 8: this.color = "DeepPink"; break;
          case 9: this.color = "GoldenRod"; break;
        }
      },
      createNewMeet(){
        if(this.title && this.description && this.privacy && this.friends && this.location && this.date && this.category){
          this.loading = true;
          var meet = { 
            title: this.title,
            description: this.description, 
            privacy: this.privacy,
            friends: this.friends,
            location: this.location,
            date: this.date,
            category: this.category,
            color: this.color
          }
          console.log("BEFORE DISPATCH: " ,meet)
          this.$store.dispatch("createNewMeet", meet).then(meetId =>{

            console.log("Meet erstellt! ", meet)
            this.$store.dispatch("getCreatedMeet", meetId).then(docData => {
              setTimeout(() => {
                this.loading = false;
                this.$navigateTo(Meetinfo, {props: {
                  meetData: docData
                }})
              }, 1000);
            })
          })
        }else{
          console.log("Du hast etwas noch nicht ausgefüllt!")
        }
      }
    }
}
</script>

<style scoped>
  .aliveBtn-1{
    height: 50;
    width: 300;
    border-radius: 30%;
    background: linear-gradient(to right, #7131A1,#DB383E);
  }
  .aliveBtn-1 > .Btn-txt-1{
    margin-top: 13;
    text-align: center;
    font-size: 16em;
    color: rgb(225, 224, 224);
  }

  TextField{
    placeholder-color:white;
  }
  .mainGrid{
    background-color: #292929;
  }
  .creatorBtn{
    background: linear-gradient(to bottom, #3c3b3b,#2e2e2e);
    color: white;
    margin: 7;
    padding: 10;
    font-weight: bold;
    font-size: 14em;
    border-radius: 10;
    min-height: 70;
    height: auto;
    width: 90%;
  }

</style>


li:hover {
  color: red;
}

li.highlight {
  background: yellow;
}

h2 {
  margin-bottom: 0px;
}

