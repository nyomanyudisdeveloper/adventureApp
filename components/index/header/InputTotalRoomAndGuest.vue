<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const {inputDataForSearch,setInputDataForSearch} = defineProps({
    inputDataForSearch:{type:Object,required:true},
    setInputDataForSearch:{type:Object,required:true},
})
const isModalInputShow = ref(false)



function clickInput(){
    isModalInputShow.value = !isModalInputShow.value
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


function changeNumberTotalGuest(number){
    const total = inputDataForSearch.totalGuest + number
    if(total != 0){
        var temp_data = {...inputDataForSearch}
        temp_data.totalGuest = total
        setInputDataForSearch(temp_data)
    }
}

function changeNumberTotalRoom(number){
    const total = inputDataForSearch.totalRoom + number
    if(total != 0){
        var temp_data = {...inputDataForSearch}
        temp_data.totalRoom = total
        setInputDataForSearch(temp_data)
    }
}

</script>


<template>
    <div @click="clickInput" class="relative border-[1px] w-full h-16 rounded-md border-slate-400 mt-5 ">
        <span  class="absolute -top-3 left-3 bg-white px-1 text-sm">Guests & Rooms</span>
        <FontAwesomeIcon class="absolute top-5 w-5 h-5 left-2" :icon="['fas', 'users']"  />
        <div class="px-8 w-full h-full text-base rounded-md flex items-center ml-1">
            {{ convertNumberToRoomDesc(inputDataForSearch.totalGuest) }} x {{ inputDataForSearch.totalRoom }}
        </div>
        <div @click.stop v-if="isModalInputShow" class="px-3 pb-3 rounded-md absolute bg-white w-full top-[70px] z-10  overflow-y-auto" style="box-shadow: 0px 0px 4px 4px #cbd5e1;">
            <div class="flex flex-row justify-between p-5">
                <div @click="changeNumberTotalGuest(-1)" class="flex justify-center items-center">
                    <FontAwesomeIcon :icon="['fas', 'minus']"  />
                </div>
                <div class="flex flex-col justify-center items-center">
                    <span>{{ convertNumberToRoomDesc(inputDataForSearch.totalGuest) }}</span>
                    <div>
                        <span>{{ inputDataForSearch.totalGuest }}</span> 
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
                    <span>{{ inputDataForSearch.totalRoom }} Rooms</span>
                </div>
                <div @click="changeNumberTotalRoom(1)" class="flex justify-center items-center">
                    <FontAwesomeIcon :icon="['fas', 'plus']"  />
                </div>
            </div>
        </div>
    </div>
</template>