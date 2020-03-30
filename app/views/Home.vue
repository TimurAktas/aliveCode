<template>
    <GridLayout rows="auto,*" columns="*">
        <TopNavigation row="0" />
        <Meetlist row="1" />
    </GridLayout>
</template>

<script>
import TopNavigation from '../components/navigation/TopNavigation'
import Meetlist from '../components/meets/Meetlist'

export default {
    components:{
        TopNavigation,
        Meetlist
    },
}
</script>

<style scoped>

</style>