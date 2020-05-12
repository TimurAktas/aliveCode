<template>
  <GridLayout rows="40,*,*" columns="*" width="100%" height="110" backgroundColor="#292929">
    <GridLayout rows="*" columns="auto,*,auto" row="0">
      <Label text="Alive" col="0" textWrap="true" />
      <Label text="Dortmund, brackel" col="1" textWrap="true" horizontalAlignment="center" verticalAlignment="center" />
      <Label col="2" :text="name" textWrap="true" @tap="goToProfile"/>
    </GridLayout>
    
    <GridLayout rows="*" columns="*,*,*,*" row="2" orientation="horizontal">
      <GridLayout col="0" class="tabview" :class="getSelectedTabview==0?'active':''" @tap="showToday">
        <Label class="tabviewText" :class="getSelectedTabview==0?'active':''" text="Heute" horizontalAlignment="center" verticalAlignment="center" />
      </GridLayout>
      <GridLayout col="1" class="tabview" :class="getSelectedTabview==1?'active':''" @tap="showTomorrow">
        <Label class="tabviewText" :class="getSelectedTabview==1?'active':''" text="Morgen" horizontalAlignment="center" verticalAlignment="center" />
      </GridLayout>
      <GridLayout col="2" class="tabview" :class="getSelectedTabview==2?'active':''" @tap="showWeekend">
        <Label class="tabviewText" :class="getSelectedTabview==2?'active':''" text="Wochenende" horizontalAlignment="center" verticalAlignment="center" />
      </GridLayout>
      <GridLayout col="3" class="tabview" :class="getSelectedTabview==3?'active':''" @tap="showDate">
        <Label class="tabviewText" :class="getSelectedTabview==3?'active':''" text="20.06.1994" horizontalAlignment="center" verticalAlignment="center" />
      </GridLayout>
    </GridLayout>
  </GridLayout>
</template>

<script>
import Profile from '../../views/Profile'

import { mapGetters } from 'vuex'
import * as Geolocation from 'nativescript-geolocation';
import { getString } from 'tns-core-modules/application-settings/application-settings';

export default {
  components:{
    Profile,
  },
  created(){
    this.name = getString("username")
  },
  data(){
    return{
        name: null
    }
  },
  methods:{
    showToday(){
      this.$store.dispatch("sendRequestToDatabaseWithDate", 0)
    },
    showTomorrow(){
      this.$store.dispatch("sendRequestToDatabaseWithDate", 1)
    },
    showWeekend(){
      this.$store.dispatch("sendRequestToDatabaseWithDate", 2)
    },
    showDate(){
      this.$store.dispatch("sendRequestToDatabaseWithDate", 3)
    },
    goToProfile(){
      this.$navigateTo(Profile)
    }
  },
  computed:{
    ...mapGetters(['getSelectedTabview'])
  }
}
</script>

<style scoped>
label{
  color:white;
}

.tabview.active{
  border-bottom-color: #C2332D;
  border-bottom-width: 3;
}

.tabviewText{
  font-size: 13;
  margin-bottom: 10;
}

.tabviewText.active{
  color: #C2332D;
  margin-bottom: 0;
  font-weight: bold;
}

.status-title{
  color:white;
  font-size: 18;
  margin-left: 5px;
}
</style>