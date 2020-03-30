<template>
    <Page actionBarHidden="false" backgroundColor="#292929"> 
        <ActionBar backgroundColor="#343434">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Label style="font-size:20" text="Konto erstellen" class="action-label"></Label>
            </StackLayout>
        </ActionBar>

        <StackLayout v-if="page == 0" >
            <StackLayout class="registrationPart2">
                <TextField hint="Name" v-model="surname"  />
                <TextField hint="Nachname" v-model="lastname"  />
                <Label class="sliderLbl" text="Alter" textWrap="true" />
                <StackLayout class="slider" orientation="horizontal">
                    <Label color="white" :text="age" textWrap="true" />
                    <Slider value="1" minValue="18" maxValue="80" backgroundColor="white" color="gray" v-model="age" >
                    </Slider>
                    <Label color="white" text="80" textWrap="true" />
                </StackLayout>
                <StackLayout class="gender" orientation="horizontal">
                    <StackLayout class="male" :class=" male ? 'active' : ''">
                        <Label text="Männlich" textWrap="true" />
                    </StackLayout>
                    <StackLayout class="female">
                        <Label text="Weiblich" textWrap="true" />
                    </StackLayout>
                </StackLayout>
                <TextField hint="Interessen" v-model="interests"  />
                <StackLayout class="circleBtn" @tap="continueRegistration">
                    <StackLayout class="inner-circle">
                        <Label color="gray" class="fas circleBtn-lbl" :text="'\uf061'"></Label>
                    </StackLayout>
                </StackLayout>
            </StackLayout>
        </StackLayout>

        <StackLayout v-else>
            <StackLayout class="emailAuthentificationField">
                <TextField hint="Handynummer oder E-Mail-Adresse" v-model="email" />
                <TextField hint="Passwort" v-model="password"  />
                <TextField hint="Passwort bestätigen" v-model="passwordCheck"  />
            </StackLayout>
            <StackLayout class="circleBtn" @tap="registerUserWithEmailandPassword">
                <StackLayout class="inner-circle">
                    <Label color="gray" class="fas circleBtn-lbl" :text="'\uf061'"></Label>
                </StackLayout>
            </StackLayout>
        </StackLayout>
        
    </Page>
</template>

<script>
import App from '../App'
import { mapGetters } from 'vuex'
import { setString } from 'tns-core-modules/application-settings/application-settings'

export default {
    data(){
        return{
            page: 0,
            password: null,
            passwordCheck: null,
            email: null,
            surname: null,
            lastname: null,
            male: true,
            female: false,
            interests: null,
            age: 18
        }
    },
    methods:{
        registerUserWithEmailandPassword(){
            var user = { 
                email: this.email, 
                password: this.password,
                surname: this.surname,
                lastname: this.lastname,
                male: this.male,
                female: this.female,
                interests: this.interests,
                age: this.age
            }
            console.log(user)
            this.$store.dispatch("createUserWithEmailandPassword", user)
        },
        continueRegistration(){
            this.page += 1
        },
        onSliderValueChange(){
           console.log(this.age)
        }
    },
}
</script>

<style scoped>
    .sliderLbl{
        margin-top: 20;
        margin-left: 10%;
        font-size: 20em;
        color:rgba(167, 167, 167, 0.763);
    }

    .emailAuthentificationField{
        margin-top: 20%;
    }

    .slider{
        margin-left: 10%;
    }

    Slider{
        width: 75%;
    }

    TextField{
        margin: 3%;
        border-width: 0 0 0.3 0;
        border-bottom-color: gray;
        width: 80%;
        font-size: 20em;
        placeholder-color:rgba(255, 255, 255, 0.256);
        color:rgba(255, 255, 255, 0.763);
    }

    .circleBtn{
        margin-top: 40;
        height: 60;
        width: 60;
        background-color: gray;
        border-radius: 50%;
    }

    .circleBtn > .inner-circle{
        height: 58;
        width: 58;
        margin-top: 1;
        background-color: #292929;
        border-radius: 50%;
    }

    .circleBtn > .inner-circle > .circleBtn-lbl{
        margin-top: 12;
        margin-left: 15;
    }

    .fas{
        font-size: 30em;
    }


    .gender{
        margin-top: 20;
        margin-bottom: 20;
        width: 80%;
    }

    .gender Label{
        font-size: 20;
        color: rgb(252, 252, 252);
        text-align: center;
        margin-top: 5;
    }

    .gender > .male{
        height: 40;
        width: 50%;
        background: linear-gradient(to bottom, rgb(97, 97, 97),rgb(237, 237, 237));
    }

    .gender > .female{
        height: 40;
        width: 50%;
        background: linear-gradient(to bottom, rgb(82, 82, 82),rgb(30, 30, 30));
    }

    .active{
        background-color: gray;
    }

    .registrationPart2{
        margin-top: 10%;
    }
</style>