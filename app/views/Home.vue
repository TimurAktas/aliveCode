<template>
    <GridLayout rows="auto,*,200" columns="*">
        <TopNavigation row="0" />
        <Meetlist row="1" />
        <MeetButton row="2"/>
    </GridLayout>
</template>

<script>
import TopNavigation from '../components/navigation/TopNavigation'
import Meetlist from '../components/meets/Meetlist'
import MeetButton from '../components/meets/MeetButton'

export default {
    components:{
        TopNavigation,
        Meetlist,
        MeetButton
    },
}
</script>

<style scoped>

</style>