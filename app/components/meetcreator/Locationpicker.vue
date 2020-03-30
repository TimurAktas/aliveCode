<template>
  <Page backgroundColor="#292929" actionBarHidden="false">
    <StackLayout>
        <GridLayout rows="*" columns="auto,*,auto" class="ModalActionbar" orientation="horizontal">
        <Label row="0" col="0" style="font-size:bold; color:white" text="Location" textWrap="true" />
        <label row="0" col="2" @tap="closeModal" color="white" text="fertig" />
      </GridLayout>
      <TextField hint="Suche nach einer Location.." :text="searchValue" />
      
      <Button @tap="closeModal" text="Hinzufügen" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return{
          searchValue: null,
          location: 'Dortmund Bahnhof Toilette'
        }
    },
    methods:{
      closeModal(){
        this.$modal.close(this.location)
      }
    }
}
</script>

<style scoped>
.ModalActionbar{
  background-color: #343434;
  height: 50;
  width: 100%;
}
</style>