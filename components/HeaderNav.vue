<script setup lang="ts">
import { usePlaceStore } from '~/store/PlaceStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const placeStore = usePlaceStore()
function searchNavClicked(){
    placeStore.setIsSearchNavClicked()
}
const inputSearchPlaceValue = ref(placeStore.search_place.name)

const isInputPlaceFocused = useState('isInputPlaceFocused', () => false)

function inputPlaceChangeFocused(data) {
    isInputPlaceFocused.value = data
    console.log("isInputPlaceFocused.value  = ",isInputPlaceFocused.value )
}

function showDropDownListPlace(){

}

function goToPrev(){
    window.history.back()
}

watch(inputSearchPlaceValue,async(newData,oldData) => {
    if(newData.length > 3){
        const response = await $fetch(`https://project-technical-test-api.up.railway.app/property/search?query=${newData}`)
    }
})


</script>

<template>
    <div class="w-full fixed bg-white">
        <div class="flex-row justify-between flex flex-1 px-5 py-3 lg:max-w-5xl lg:mx-auto ">
            <FontAwesomeIcon @click="goToPrev" class="mr-3 pt-2  h-6 text-blue-400 sm:hidden" :icon="['fas', 'chevron-left']" />
            <img class="hover:cursor-pointer hidden sm:flex w-30 h-10" alt="Wisata App logo" src="/img/logo.png"  />
            <div @click="searchNavClicked" class="transition flex justify-center items-center w-8/12 sm:w-6/12 md:w-7/12 h-10 rounded-lg hover:bg-slate-400 bg-slate-200 text-pretty ">
                <FontAwesomeIcon class="mx-3 w-3 h-3" :icon="['fas', 'magnifying-glass']" />
                <span class="text-sm ">{{ placeStore.searchSummary }}</span>
                <!-- <span class="text-sm">{{ placeStore.searchSummary }}</span> -->
            </div>
            <span class="px-3 py-2 text-white rounded-sm text-sm cursor-pointer" style="background-color: rgb(26, 115, 232);">
                Sign In
            </span>
        </div>
        <div id="container1" @click="searchNavClicked"  class="fixed w-full h-full opacity-95 bg-slate-400 sm:px-5" :class="placeStore.is_search_header_nav_clicked ? '' : 'hidden'">
            <div @click.stop id="container2" class="w-full bg-white flex flex-col  px-5 py-3 lg:max-w-5xl lg:mx-auto">
                <div class="hidden lg:flex flex-row justify-evenly">
                    <div @click="showDropDownListPlace" class="relative border-2 w-4/12 h-16 rounded-md border-slate-400 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Where are you going ?</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'location-dot']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <FontAwesomeIcon class="absolute right-4 top-6 cursor-pointer" :icon="['fas', 'fa-circle-xmark']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <div class="relative border-2 w-3/12 h-16 rounded-md border-slate-400 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'calendar']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <div class="relative border-2 w-3/12 h-16 rounded-md border-slate-400 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'users']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <span class="flex w-2/12 justify-center items-center h-16 px-3 py-2 text-white rounded-md text-lg cursor-pointer " style="background-color: rgb(26, 115, 232);">
                        <FontAwesomeIcon class="mr-3" :icon="['fas', 'magnifying-glass']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        Search
                    </span>
                </div>
                <!-- Container for sm responsive -->
                <div @click="showDropDownListPlace" class="relative border-2 w-full h-16 rounded-md border-slate-400 lg:hidden">
                    <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Where are you going ?</span>
                    <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'location-dot']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <FontAwesomeIcon class="absolute right-4 top-6 cursor-pointer" :icon="['fas', 'fa-circle-xmark']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                </div>
                <div class="flex-row hidden sm:flex justify-between lg:hidden">
                    <div class="relative border-2 w-6/12 h-16 rounded-md border-slate-400 mt-5 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'calendar']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <div class="relative border-2 w-6/12 h-16 rounded-md border-slate-400 mt-5">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'users']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                </div>
                <!-- Container for mobile responsive -->
                <div class="relative border-2 w-full h-16 rounded-md border-slate-400 mt-5 sm:hidden">
                    <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
                    <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'calendar']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                </div>
                <div class="relative border-2 w-full h-16 rounded-md border-slate-400 mt-5 sm:hidden">
                    <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
                    <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'users']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                </div>
                <span class="mt-5 flex justify-center items-center h-16 px-3 py-2 text-white rounded-md text-lg cursor-pointer lg:hidden" style="background-color: rgb(26, 115, 232);">
                    <FontAwesomeIcon class="mr-3" :icon="['fas', 'magnifying-glass']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    Search
                </span>
            </div>
        </div>
        <!-- <div class="fixed bg-blue-400 h-full ml-5 w-full mt-20">
            <h1>Tex</h1>
        </div> -->
        
        <!-- <div id="container1" @click="searchNavClicked"  class="fixed w-full h-full opacity-95 bg-slate-400" :class="placeStore.is_search_header_nav_clicked ? '' : 'hidden'">
            <div @click.stop id="container2" class="mx-52 bg-white flex flex-row justify-evenly px-5 py-3 h-20">
                <div class="relative border-2 w-6/12 h-full rounded-md border-slate-400">
                    <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-red-400">Where are you going ?</span>
                    <FontAwesomeIcon class="absolute top-4 left-2" :icon="['fas', 'location-dot']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <FontAwesomeIcon class="absolute right-4 top-4 cursor-pointer" :icon="['fas', 'fa-circle-xmark']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <input  v-model="inputSearchPlaceValue" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-7 w-full h-full" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    
                </div>
                <h1>Test</h1>
                <h1>Test</h1>
            </div>
        </div> -->
    </div>
    
</template>