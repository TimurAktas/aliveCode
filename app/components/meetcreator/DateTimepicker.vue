<template>
  <Page backgroundColor="#292929">
    <ScrollView>
        <StackLayout>
        <GridLayout color="white" rows="*" columns="auto,*,auto" class="ModalActionbar" orientation="horizontal">
            <Label row="0" col="0" style="font-size:bold" text="Date and Time" textWrap="true" />
            <label row="0" col="2" @tap="closeModal" text="fertig" />
        </GridLayout>
        <TextField hint="Suche nach deinen Freunden.." :text="searchValue" />
        <Button text="Click mich" @tap="showTime()" />
        
    
    
        <DatePicker year="2020" month="3" day="23"
            [minDate]="minDate" [maxDate]="maxDate"
            (dateChange)="onDateChanged($event)" 
            (dayChange)="onDayChanged($event)" 
            (monthChange)="onMonthChanged($event)" 
            (yearChange)="onYearChanged($event)" 
            (loaded)="onDatePickerLoaded($event)"
            verticalAlignment="center">
</DatePicker>

    <TimePicker :hour= selectedHour
                :minute= selectedMinute
                maxHour="23"
                maxMinute="59"
                minuteInterval="5"
                (timeChange)="onTimeChanged($event)">
    </TimePicker>
        </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { isAndroid, isIOS } from "tns-core-modules/platform";

export default {
    props: ['selectedDateTime'],
    data(){
        return{
          time: null,
          date: null,
          selectedHour: 9,
          selectedMinute: 50,
        }
    },
    methods:{
        closeModal(){
            const event = new Date();

            const jsonDate = event.toJSON();

            console.log(jsonDate);
            // expected output: 1975-08-19T23:15:30.000Z

            console.log(new Date(jsonDate).toUTCString());
            const selecteddate = new Date(jsonDate).toUTCString()
            // expected output: Tue, 19 Aug 1975 23:15:30 GMT
            console.log("DATE NOW", Date.now())
            const selectedTime = this.selectedHour + ":" + this.selectedMinute;
            console.log(selectedTime)
            this.$modal.close(selecteddate)
        },
        showTime(){
            console.log("ZEIT: ", this.selectedHour, this.selectedMinute)
        },
        onPickerLoaded(args) {
            console.log("geht hier rein")
            const isAndroid = require("tns-core-modules/platform").isAndroid;
            const isIOS = require("tns-core-modules/platform").isIOS;

            const timePicker = args.object;

            if (isAndroid) {
                timePicker.android.setIs24HourView(java.lang.Boolean.TRUE);
                timePicker.hour = 23;
                timePicker.minute = 59;
            } else if (isIOS) {
                // a bit hacky solution
                // important set the country not the language for locale
                const local = NSLocale.alloc().initWithLocaleIdentifier("NL");
                timePicker.ios.locale = local;
                timePicker.hour = 23;
                timePicker.minute = 59;
            }
        }
    }
}
</script>

<style scoped>

.date-picker {
    background-color: olivedrab;
    border-color: burlywood;
    border-width: 2;
    border-radius: 10;
    color: whitesmoke;
    vertical-align: middle;
}

.ModalActionbar{
  background-color: #343434;
  height: 50;
  width: 100%;
}

</style>