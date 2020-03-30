<template>
    <PullToRefresh @refresh="refreshList">
      <ScrollView backgroundColor="#292929" > 
        <StackLayout class="Content" height="1000" v-if="isLoading">
            <AbsoluteLayout class="cv"></AbsoluteLayout>  
            <AbsoluteLayout class="cv2"></AbsoluteLayout>
            <AbsoluteLayout class="cv"></AbsoluteLayout>   
            <AbsoluteLayout class="cv2"></AbsoluteLayout>   
        </StackLayout>
        <StackLayout row="1" v-else>
            <MeetCard v-for="(meet, index) in meetsFromToday" v-bind:key=index :meetData="meet" />
        </StackLayout>
           
            
        </ScrollView>
    </PullToRefresh>
</template>

<script>
import MeetCard from './MeetCard'
import { mapGetters } from 'vuex'
import { isAndroid } from 'tns-core-modules/ui/frame/frame'

export default {
    components:{
        MeetCard
    },
    mounted(){
        this.$store.dispatch("getMeetsFromToday").then(x => {
            setTimeout(() => { 
                this.isLoading = false

                //Keine ahnung wieso, aber ohne das setzt android isloading nicht auf false
                const applicationModule = require("tns-core-modules/application");
                if(applicationModule.isAndroid){
                    this.isLoading = !this.isLoading
                }
            }, 2000);
            
        })
    },
    data(){
        return{
            isLoading: true
        }
    },
    computed:{
        ...mapGetters(['meetsFromToday']),
    },
    methods:{
        refreshList(args) {
            var pullRefresh = args.object;
            this.$store.dispatch("getMeetsFromToday").then(() =>{
                setTimeout(function() {
                    pullRefresh.refreshing = false;
                }, 1000);
            })
        }
    }
}
</script>

<style scoped>

.cv{
    height: 200;
    width: 90%;
    margin: 10;
    border-radius: 10%;
    background-color: #343434;

    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

.cv2{
    height: 100;
    width: 90%;
    margin: 10;
    border-radius: 10%;
    background-color: #343434;

    animation-name: loading;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}



@keyframes loading {
    0%   { opacity: 1.0; }
    50%  { opacity: 0.4; }
    100% { opacity: 1.0; }
}

@keyframes rotating {
    0%  { transform: rotate(0) translate(0,0)}
    25% { transform: rotate(0) scale(1.2,1.2) translate(250,0); }
    50% { transform: rotate(0) scale(1.4,1.4) translate(250,250); }
    75% { transform: rotate(0) scale(1.2,1.2) translate(0,250); }
    100% { transform: rotate(0) scale(1,1) translate(0,0); }
}

@keyframes alive-fadeIn {
    0% { transform: translate(0,100)}
    50% { transform: translate(0,-30)}
    100% { transform: translate(0,0)}
}
</style>