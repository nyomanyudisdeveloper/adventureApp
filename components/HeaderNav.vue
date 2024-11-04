<script setup lang="ts">
import { usePlaceStore } from '~/store/PlaceStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 import { sub, format, isSameDay, type Duration } from 'date-fns'
const placeStore = usePlaceStore()

const isModalShow = ref(false)
const isOptionDestClicked = ref(false)

const inputSearchPlaceValue = ref(placeStore.search_place)
const inputSearchPlaceDisplay = ref(placeStore.search_place.name+", "+placeStore.search_place.address)
const inputCheckInDateValue = ref(placeStore.search_checkin_date)
const inputCheckOutDateValue = ref(placeStore.search_checkout_date)
const inputTotalGuestValue = ref(placeStore.search_total_guests)
const inputTotalRoomValue = ref(placeStore.search_total_room)
const listPlaceDestination = ref([])
const selectedDate = ref({ start: new Date(placeStore.search_checkin_date), end: new Date(placeStore.search_checkout_date) })

const isInputPlaceFocused = useState('isInputPlaceFocused', () => false)
const isDdlPlaceShow = ref(false)
const isDdlTotalRoomAndGuestShow = ref(false)
const isLoadPlaceDataDone = ref(false)


function searchNavClicked(){
    isModalShow.value = !isModalShow.value
    isDdlPlaceShow.value = false
    inputSearchPlaceValue.value = placeStore.search_place
    inputSearchPlaceDisplay.value = placeStore.search_place.name+", "+placeStore.search_place.address
    inputCheckInDateValue.value = placeStore.search_checkin
    inputCheckOutDateValue.value = placeStore.search_checkout_date
    inputTotalGuestValue.value = placeStore.search_total_guests
    inputTotalRoomValue.value = placeStore.search_total_room
    listPlaceDestination.value = []
    isDdlTotalRoomAndGuestShow.value = false
}




async function clickInputPlace(){
    var currentShow = isDdlPlaceShow.value
    if(currentShow){
        isDdlPlaceShow.value = false
        const placeValueDisplay = inputSearchPlaceValue.value.name + ", "+inputSearchPlaceValue.value.address
        if(inputSearchPlaceDisplay.value != placeValueDisplay){
            isOptionDestClicked.value = true
            inputSearchPlaceDisplay.value = placeValueDisplay
        }
    }
    else{
        if(inputSearchPlaceDisplay.value.length > 2){
            isLoadPlaceDataDone.value = false
            isDdlPlaceShow.value = true
            const url = `https://project-technical-test-api.up.railway.app/property/search?query=${inputSearchPlaceDisplay.value}`
            const response = await $fetch(url)
            listPlaceDestination.value = response
            isLoadPlaceDataDone.value = true
        }
        else{
            isDdlPlaceShow.value = false
        }
    }
    
}

function inputPlaceChangeFocused(data) {
    // if(inputSearchPlaceValue.value.length > 2){
    //     const response = await $fetch(`https://project-technical-test-api.up.railway.app/property/search?query=${inputSearchPlaceValue.value.length}`)
    // }
}



function clickOptionPlaceDest(name,address,id){
    isDdlPlaceShow.value = false
    isOptionDestClicked.value = true
    inputSearchPlaceValue.value = {
        "name":name,
        "address":address,
        "id":id
    }
    inputSearchPlaceDisplay.value = name + ", "+ address
}

function goToPrev(){
    if(placeStore.isModalGalleryOpen){
        placeStore.setIsModalGalleryImageOpen()
    }
    else{
        window.history.back()
    }
}

function clickInputTotalRoomAndGuest(){
    isDdlTotalRoomAndGuestShow.value = !isDdlTotalRoomAndGuestShow.value
}

function deletePlaceDestValue(){
    inputSearchPlaceDisplay.value = ""
    inputSearchPlaceValue.value = {}
}

function changeNumberTotalGuest(number){
    if(inputTotalGuestValue.value + number != 0){
        inputTotalGuestValue.value += number
    }
}

function changeNumberTotalRoom(number){
    if(inputTotalRoomValue.value + number != 0){
        inputTotalRoomValue.value += number
    }
}

function search(){
    console.log("PlaceIDValue = ",inputSearchPlaceValue.value)
}

function convertNumberToRoomDesc(number){
    if(number == 1){
        return "Single Room"
    }
    else if(number == 2){
        return "Double Room"
    }
    else if(number == 3){
        return "Triple Room"
    }
    else{
        return `Group of ${number}`
    }
}

watch(inputSearchPlaceDisplay,async(newData,oldData) => {

    if(isOptionDestClicked.value){
        isOptionDestClicked.value = false
    }
    else{
        if(inputSearchPlaceDisplay.value.length > 2){
            isDdlPlaceShow.value = true
            isLoadPlaceDataDone.value = false
            const url = `https://project-technical-test-api.up.railway.app/property/search?query=${inputSearchPlaceDisplay.value}`
            const response = await $fetch(url)
            listPlaceDestination.value = response
            isLoadPlaceDataDone.value = true
        }
        else{
            isDdlPlaceShow.value = false
        }
    }
})

</script>

<template>
    <div class="w-full fixed bg-white top-0 left-0">
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
        <div id="container1" @click="searchNavClicked"  class="fixed w-full h-full opacity-95 bg-slate-400 sm:px-5" :class="isModalShow ? '' : 'hidden'">
            <div @click.stop id="container2" class="w-full bg-white flex flex-col  px-5 py-3 lg:max-w-5xl lg:mx-auto">
                <div class="hidden lg:flex flex-row justify-evenly">
                    <div @click="showDropDownListPlace" class="relative border-2 w-4/12 h-16 rounded-md border-slate-400 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Where are you going ?</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'location-dot']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <FontAwesomeIcon class="absolute right-4 top-6 cursor-pointer" :icon="['fas', 'fa-circle-xmark']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceDisplay" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <div class="relative border-2 w-3/12 h-16 rounded-md border-slate-400 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'calendar']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceDisplay" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <div class="relative border-2 w-3/12 h-16 rounded-md border-slate-400 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'users']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceDisplay" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <span class="flex w-2/12 justify-center items-center h-16 px-3 py-2 text-white rounded-md text-lg cursor-pointer " style="background-color: rgb(26, 115, 232);">
                        <FontAwesomeIcon class="mr-3" :icon="['fas', 'magnifying-glass']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        Search
                    </span>
                </div>
                <!-- Container for sm responsive -->
                <div @click="clickInputPlace" class="relative border-2 w-full h-16 rounded-md border-slate-400 lg:hidden">
                    <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Where are you going ?</span>
                    <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'location-dot']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <FontAwesomeIcon @click="deletePlaceDestValue" class="absolute right-4 top-6 cursor-pointer" :icon="['fas', 'fa-circle-xmark']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <input  v-model="inputSearchPlaceDisplay" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg rounded-md" type="text" placeholder="Search for hotels, apartement or villas" />
                    <div v-if="isDdlPlaceShow" class="px-3 pb-3 rounded-md absolute bg-white w-full top-16 z-10 h-96 overflow-y-auto " style="box-shadow: 0px 0px 4px 4px #cbd5e1;">
                        <div v-if="!isLoadPlaceDataDone" class="flex flex-row justify-center mt-5">
                            <Loader />
                        </div>
                        <div v-if="isLoadPlaceDataDone" @click.stop @click="clickOptionPlaceDest(item.name,item.name_suffix,item.id)" v-for="item in listPlaceDestination" class="mt-3">
                            <span class="bg-blue-200 px-2 py-0 rounded-md ">
                                <FontAwesomeIcon class="w-2 h-2 items-center mr-2 text-blue-600" :icon="['fas', 'bed']" />
                                <span class="uppercase text-xs text-blue-600">hotel</span>
                            </span>
                            <h1 class="mt-2 text-base font-semibold">{{ item.name }}</h1>
                            <h1 class="text-sm text-slate-400">{{ item.name_suffix }}</h1>
                        </div>
                    </div>
                </div>
                
                <div class="flex-row hidden sm:flex justify-between lg:hidden">
                    <div class="relative border-2 w-6/12 h-16 rounded-md border-slate-400 mt-5 mr-2">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'calendar']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceDisplay" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                    <div class="relative border-2 w-6/12 h-16 rounded-md border-slate-400 mt-5">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
                        <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'users']" :style="{color:isInputPlaceFocused?'blue':''}" />
                        <input  v-model="inputSearchPlaceDisplay" @focusout="inputPlaceChangeFocused(false)" @focusin="inputPlaceChangeFocused(true)" class="px-8 w-full h-full text-lg rounded-md" type="text" placeholder="Search for hotels, apartement or villas" /> 
                    </div>
                </div>
                <!-- Container for mobile responsive -->
                <UPopover :popper="{ placement: 'bottom-start' }">
                    <UButton color="black" class=" relative border-2 w-full h-16 rounded-md border-slate-400 mt-5 sm:hidden text-black bg-white" icon="i-heroicons-calendar-days-20-solid">
                        <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
                        {{ format(selectedDate.start, 'd MMM, yyy') }} - {{ format(selectedDate.end, 'd MMM, yyy') }}
                    </UButton>

                    <template #panel="{ close }">
                    <div class="flex items-center sm:divide-x divide-gray-200 ">
                        <DatePicker v-model="selectedDate" @close="close" />
                    </div>
                    </template>
                </UPopover>
                <div @click="clickInputTotalRoomAndGuest" class="relative border-2 w-full h-16 rounded-md border-slate-400 mt-5 sm:hidden">
                    <span :class="{'text-blue-400':isInputPlaceFocused}" class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
                    <FontAwesomeIcon class="absolute top-6 left-2" :icon="['fas', 'users']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    <div class="px-8 w-full h-full text-lg rounded-md   flex items-center">
                        {{ convertNumberToRoomDesc(inputTotalGuestValue) }} x {{ inputTotalRoomValue }}
                    </div>
                    <div @click.stop v-if="isDdlTotalRoomAndGuestShow" class="px-3 pb-3 rounded-md absolute bg-white w-full top-16 z-10  overflow-y-auto" style="box-shadow: 0px 0px 4px 4px #cbd5e1;">
                        <div class="flex flex-row justify-between p-5">
                            <div @click="changeNumberTotalGuest(-1)" class="flex justify-center items-center">
                                <FontAwesomeIcon :icon="['fas', 'minus']"  />
                            </div>
                            <div class="flex flex-col justify-center items-center">
                                <span>{{ convertNumberToRoomDesc(inputTotalGuestValue) }}</span>
                                <div>
                                    <span>{{ inputTotalGuestValue }}</span> 
                                    <span> guests/room</span>
                                </div>
                                
                                <span>What about children</span>
                            </div>
                            <div @click="changeNumberTotalGuest(1)" class="flex justify-center items-center">
                                <FontAwesomeIcon :icon="['fas', 'plus']"  />
                            </div>
                        </div>
                        <div class="flex flex-row justify-between p-5">
                            <div @click="changeNumberTotalRoom(-1)" class="flex justify-center items-center">
                                <FontAwesomeIcon :icon="['fas', 'minus']"  />
                            </div>
                            <div class="flex flex-col justify-center items-center">
                                <span>{{ inputTotalRoomValue }} Rooms</span>
                            </div>
                            <div @click="changeNumberTotalRoom(1)" class="flex justify-center items-center">
                                <FontAwesomeIcon :icon="['fas', 'plus']"  />
                            </div>
                        </div>
                    </div>
                </div>
                <span @click="search" class="mt-5 flex justify-center items-center h-16 px-3 py-2 text-white rounded-md text-lg cursor-pointer lg:hidden" style="background-color: rgb(26, 115, 232);">
                    <FontAwesomeIcon class="mr-3" :icon="['fas', 'magnifying-glass']" :style="{color:isInputPlaceFocused?'blue':''}" />
                    Search
                </span>
                
            </div>
           
        </div>
    </div>
</template>