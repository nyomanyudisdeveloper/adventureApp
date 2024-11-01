<script setup lang="ts">
import { usePlaceStore } from '~/store/PlaceStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const placeStore = usePlaceStore()
function searchNavClicked(){
    placeStore.setIsSearchNavClicked()
}


</script>

<template>
    <div class="w-full fixed bg-white">
        <div class="px-52 flex-row justify-between flex flex-1 py-5">
            <!-- <template> -->
                <img class="hover:cursor-pointer " alt="Wisata App logo" src="/img/logo.png" width="200" height="50" />
            <!-- </template> -->
            <button @click="searchNavClicked" class="transition mx-10 w-1/2 py-2 rounded-md hover:bg-slate-400 bg-slate-200" ">
                <FontAwesomeIcon class="mr-3" :icon="['fas', 'magnifying-glass']" />
                <span>{{ placeStore.searchSummary }}</span>
            </button>
            <button class="px-5  py-2 text-white rounded-md " style="background-color: rgb(26, 115, 232);">
                Sign In
            </button>
        </div>
        <div id="container1" @click="searchNavClicked"  class="fixed w-full h-full opacity-95 bg-slate-400" :class="placeStore.is_search_header_nav_clicked ? '' : 'hidden'">
            <div @click.stop id="container2" class="mx-52 bg-white flex flex-row justify-evenly px-5 py-3 h-20">
                <!-- <i class="fa-solid fa-circle-xmark"></i> -->
                <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
                <div class="relative border-2 w-6/12 h-full rounded-md border-slate-400">
                    <span class="absolute -top-3 left-3 bg-white px-1">Where are you going ?</span>
                    <FontAwesomeIcon class="absolute top-4 left-2" :icon="['fas', 'location-dot']" />
                    <FontAwesomeIcon class="absolute right-4 top-4" :icon="['fas', 'fa-circle-xmark']" />
                    <input class="px-7 w-full h-full" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    
                </div>
                <h1>Test</h1>
                <h1>Test</h1>
            </div>
        </div>
    </div>
    
</template>