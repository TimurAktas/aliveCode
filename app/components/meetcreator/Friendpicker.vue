<template>
  <Page backgroundColor="#292929">
    <StackLayout>
      <GridLayout color="white" rows="*" columns="auto,*,auto" class="ModalActionbar" orientation="horizontal">
        <Label row="0" col="0" style="font-size:bold" text="Friends" textWrap="true" />
        <label row="0" col="2" @tap="closeModal" text="fertig" />
      </GridLayout>
      <TextField hint="Suche nach deinen Freunden.." :text="searchValue" />
      
      <Label text="Hallo" textWrap="true" />
      <Label :text="id" textWrap="true" />
      
    </StackLayout>
  </Page>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return{
          searchValue: null,
          friends: ['Ugur','Mert','Hakan']
        }
    },
    methods:{
      closeModal(){
        this.$modal.close(this.friends)
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