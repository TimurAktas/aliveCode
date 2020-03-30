<template>
    <Page actionBarHidden="false" backgroundColor="#292929"> 
        <StackLayout>
          <Label color="white" text="Profil!!!" textWrap="true" />
          <Button class="aliveBtn-1" text="Logout" @tap="logoutUser" />
        </StackLayout>
    </Page>
</template>

<script>
import App from '../App'
import Login from './Login'

import { getBoolean, setBoolean, clear } from 'tns-core-modules/application-settings/application-settings'

export default {
    components: {
        Login
    },
    data(){
        return{
           
        }
    },
    methods:{
        logoutUser(){
            this.$navigateTo(Login)
            setBoolean("isLogged", false)
            clear()
        },
    },
}
</script>

<style scoped>
.aliveBtn-1{
    margin-top: 10;
    border-radius: 5%;
    color: white;
    font-size: 17em;
    height: 40;
    width: 80%;
    background: linear-gradient(to bottom, rgb(113, 11, 11),rgb(116, 23, 26));
  }



</style>