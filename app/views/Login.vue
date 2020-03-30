<template>
    <Page actionBarHidden="true" backgroundColor="#292929"> 
        <StackLayout>
            <StackLayout class="heading">
                <Label class="heading1" text="Alive" textWrap="true" />
                <Label class="heading2" text="The next Generation of Meeting People" textWrap="true" />
            </StackLayout>
            <StackLayout v-if="!loading">
                <StackLayout class="emailAuthentificationField">
                    <TextField hint="Handynummer oder E-Mail-Adresse" v-model="email" />
                    <TextField hint="Password" v-model="password"  />
                    <Button text="Anmelden" class="aliveBtn-1" @tap="loginWithEmailandPassword" />
                </StackLayout>

                <StackLayout class="othersAuthentification">
                    <Button text="Login with Facebook" class="FacebookBtn" @tap="doNothing" />
                    <Button text="Login with Google" class="GoogleBtn" @tap="doNothing" />
                    <Button text="Neues Alive-Konto erstellen" class="alive-regiBtn" @tap="goToRegistration" />
                </StackLayout>
            </StackLayout>

            <StackLayout v-else >
                <AbsoluteLayout class="cv">
                    <Label class="cv-lbl" />
                    <Label class="inner-circle" />
                </AbsoluteLayout>
                <StackLayout class="cv-text">
                  <Label  color="white" text="Connect to Server..." textWrap="true" />
                </StackLayout>
            </StackLayout>       
        </StackLayout>
    </Page>
</template>

<script>
import App from '../App'
import Registration from './Registration'

import { mapGetters } from 'vuex'
import { setString } from 'tns-core-modules/application-settings/application-settings'

export default {
    data(){
        return{
            email: null,
            password: null,
            loading: false,
            msg: null,
        }
    },
    methods:{
        loginWithEmailandPassword(){
            var user = { 
                email: this.email, 
                password: this.password
            }
            this.loading = true
            this.$store.dispatch("loginUserWithEmailAndPasswort", user).then(() =>{
                this.msg = ''
                this.$navigateTo(App)
                this.loading = false
            }).catch(err =>{
                this.msg = err
                this.loading = false
            })
        },
        goToRegistration(){
            this.$navigateTo(Registration)
        },
        doNothing(){}
    },
}
</script>

<style scoped>
    .heading{
        margin-top: 10%;
        text-align: center;
    }

    .heading > .heading1{
        font-weight: bold;
        font-size: 50em;
        color: rgb(179, 179, 179);
    }

    .heading > .heading2{
        margin-top: 5;
        font-size: 15em;
        color: rgb(196, 196, 196);
    }

    .emailAuthentificationField{
        margin-top: 5%;
    }

    .othersAuthentification{
        margin-top: 10%;
    }

    TextField{
        border-width: 0 0 0.3 0;
        border-bottom-color: gray;
        width: 80%;
        font-size: 20em;
        placeholder-color:rgba(255, 255, 255, 0.256);
        color:rgba(255, 255, 255, 0.763);
    }

    .aliveBtn-1{
        margin-top: 10;
        border-radius: 5%;
        color: white;
        font-size: 17em;
        height: 40;
        width: 80%;
        background: linear-gradient(to right, #7131A1,#DB383E);
    }

    .FacebookBtn{
        font-size: 17em;
        color: white;
        border-radius: 5%;
        height: 40;
        width: 80%;
        background: linear-gradient(to bottom, #143679,#13316d);
    }

    .GoogleBtn{
        font-size: 17em;
        color: white;
        border-radius: 5%;
        height: 40;
        width: 80%;
        background: linear-gradient(to bottom, #780e0e,#590b0b);
    }

    .alive-regiBtn{
        margin-top: 50;
        font-size: 17em;
        color: rgb(165, 165, 165);
        border-radius: 5%;
        border-width: 1;
        border-color: rgba(255, 255, 255, 0.256);
        height: 50;
        width: 80%;
        background-color: #292929;
    }

    .cv{
        background-color: #343434;
        height: 200;
        width: 200;

        animation-name: rotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        clip-path: circle(58% at 50% 50%);
        margin: 30;
    }

    .cv-lbl{
        height: 100;
        width: 100;
        background-color: #545252;
    }

    .inner-circle{
        height: 100;
        width: 100;
        background-color: #292929;
        border-radius: 50%;
        top: 50;
        left: 50;
    }

    .cv-text{
        margin-left: 38%;
        margin-top: -40;
        color: #545252;
    }

    @keyframes rotate {
        from { transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
</style>