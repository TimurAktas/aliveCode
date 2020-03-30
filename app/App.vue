<template>
    <Page actionBarHidden="true" backgroundColor="#292929"> 
        
        <BottomNavigation selectedIndex="0">
            <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
            <TabStrip>
                <TabStripItem class="first">
                    <Label class="fas" :text="'\uf015'"></Label>
                </TabStripItem>
                <TabStripItem class="second">
                     <Label class="fas" :text="'\uf067'"></Label>
                </TabStripItem>
                <TabStripItem class="third">
                    <Label class="fas" :text="'\uf5a0'"></Label>
                </TabStripItem>
            </TabStrip>

            <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
            <TabContentItem class="first">
                <Home />
            </TabContentItem>
            <TabContentItem class="second">
                    <Meetcreator />
            </TabContentItem>
            <TabContentItem class="second">
                <Map />
            </TabContentItem>
        </BottomNavigation>
    </Page>
</template>

<script>
import TopNavigation from './components/navigation/TopNavigation'
import Home from './views/Home'
import Map from './views/Map'
import Meetcreator from './views/Meetcreator'

export default {
    components:{
        TopNavigation,
        Home,
        Map,
        Meetcreator
    },
    computed: {
        message() {
            return {

            }
        }
    }
};
</script>

<style scoped lang="scss">
    
    Tabs TabStripItem, 
    BottomNavigation TabStripItem{
        background-color: #292929;
        color:#9B2725;
    }

    Tabs TabStripItem:active,
    BottomNavigation TabStripItem:active{
        color:#9B2725;
    }

    .fas {
        font-family: "Font Awesome 5 Free", "fa-solid-900";
        font-weight: 900;
        font-size: 25;
    }

</style>
