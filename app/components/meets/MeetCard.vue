<template>
    <GridLayout :style="meetInfoFontColor" class="alive-meetCard" rows="*,auto,40" columns="*" @tap="goToMeetinfo(meetData)">

        <GridLayout  row="0" rows="" columns="">
            <GridLayout rows="*" columns="auto, 4* ,*">
                <StackLayout row="0" col="0" >
                 <Image  src="~/assets/images/timur.jpg"  class="-thumb img-circle mainImg" ></Image>
                </StackLayout>

                <StackLayout marginLeft="10" row="0" col="1" >
                    <Label fontSize="14em" :text="meetData.creatorId" textWrap="true" />
                    <Label  marginTop="15" fontSize="18em" :text="meetData.title" textWrap="true" />
                    
                    <TextView :style="meetInfoFontColor"  marginLeft="-20" marginTop="-10" fontSize="16em" :text="meetData.description" editable="false" maxLength="100" />
                </StackLayout>

                <StackLayout row="0" col="2" >
                 <Label :text="meetData.date" fontSize="16em" textWrap="true" />
                </StackLayout>
            </GridLayout>
        </GridLayout>

        <StackLayout width="100%" row="1" class="line" />

        <GridLayout  row="2" rows="*" columns="auto,20,auto,20,auto">
         
          <Label class="fas" col="0" fontSize="12" :text="meetData.friends.length + '/ 16   \uf007'" textWrap="true" />
          <Label  col="2"  :text="meetData.location" textWrap="true" />
          <Label text="Heute, 17 Uhr" col="4" textWrap="true" />
          
        </GridLayout>

    </GridLayout>
</template>

<script>
import Meetinfo from '../../views/Meetinfo'

export default {
    components:{
        Meetinfo
    },
    props: ['meetData'],
    data(){
        return{

        }
    },
    methods:{
        goToMeetinfo(data){
            console.log("DAAS SIND DIE DATEN", data)
            this.$navigateTo(Meetinfo, {props: {
                meetData: data
            }})
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
Image {
    width: 45;
    height: 45;
}
.line {
        height: 0.5;
        border: none;
        color: #e0e0e0;
        background-color: #e0e0e0;
    }
    
.alive-meetCard{
    background: linear-gradient(to bottom, #3c3b3b,#2e2e2e);
    margin: 10;
    padding: 10;
    width: 96%;
    height: auto;
    min-height: 200;
    max-height: 300;
    max-width: 200;
    border-radius: 10%;
    animation-name: alive-fadeIn;
    animation-duration: 1s;

}



@keyframes alive-fadeIn {
    0% { transform: translate(0,100)}
    100% { transform: translate(0,0)}
}
</style>


   <StackLayout class="alive-meetCard" @tap="goToMeetinfo(meetData)">
        <Image  class="-thumb img-circle" src="~/assets/images/timur.jpg" width="50" height="50" stretch="aspectFill"></Image>
        <label :style="meetInfoFontColor"> {{meetData.title}} </label>
        <TextView :style="meetInfoFontColor" :text="meetData.description" editable="false" />
        <Label :style="meetInfoFontColor"> {{meetData.date}} </Label>
        <Label :style="meetInfoFontColor"> {{meetData.privacy}} </Label>
        <Label :style="meetInfoFontColor"> {{meetData.category}} </Label>
        <Label :style="meetInfoFontColor"> {{meetData.creatorId}} </Label>
        <label :style="meetInfoFontColor"> {{meetData.color}}</label>
        <label :style="meetInfoFontColor"> dhagsdgasgdgashdahs</label>
        
    </StackLayout>