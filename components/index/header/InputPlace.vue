<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const isDdlPlaceShow = ref(false)
const isListOptionDdlPlaceShow = ref(false)
const listLocationData = ref([])
const listPropertyData = ref([])
const isLoadShow = ref(false)
const isOptionPlaceClicked = ref(false)
const isOpenForFirstTime = ref(false)

const inputPlaceDesc = ref("")

const {inputDataForSearch,setInputDataForSearch,isModalShow} = defineProps({
    inputDataForSearch:{type:Object,required:true},
    setInputDataForSearch:{type:Object,required:true},
    isModalShow:{type:Object,required:true},
})

async function clickInput(){
    var currentShow = isDdlPlaceShow.value
    if(currentShow){
        isDdlPlaceShow.value = false
        const placeValueDisplay = inputDataForSearch.name + ", "+ inputDataForSearch.address
        if(inputPlaceDesc.value != placeValueDisplay){
            isOptionPlaceClicked.value = true
            inputPlaceDesc.value = placeValueDisplay
        }
    }
    else{
        if(inputPlaceDesc.value.length > 2){
            isLoadShow.value = true
            isListOptionDdlPlaceShow.value = false
            isDdlPlaceShow.value = true
            const urlGetLocation = `https://project-technical-test-api.up.railway.app/location/search?query=${inputPlaceDesc.value}`
            const responseLocation = await $fetch(urlGetLocation)
            listLocationData.value = responseLocation

            const urlGetProperty = `https://project-technical-test-api.up.railway.app/property/search?query=${inputPlaceDesc.value}`
            const responseProperty = await $fetch(urlGetProperty)
            listPropertyData.value = responseProperty

            isLoadShow.value = false
            isListOptionDdlPlaceShow.value = true
        }
        else{
            isDdlPlaceShow.value = false
        }
    }
}


function deleteValue(){
    inputPlaceDesc.value = ""
    var temp_data = {...inputDataForSearch}
    temp_data.id = "",
    temp_data.name = "",
    temp_data.address = ""
    setInputDataForSearch(temp_data)
}

function clickOption(name,address,id,locationType){
    console.log("clickOption")
    isDdlPlaceShow.value = false
    isOptionPlaceClicked.value = true

    var temp_data = inputDataForSearch
    temp_data.name = name
    temp_data.address = address
    temp_data.id = id
    temp_data.locationType = locationType
    setInputDataForSearch(temp_data)

    inputPlaceDesc.value = name + ", "+ address
}

function listOptionIconDesc(data){
    switch(data){
        case "property": return "hotel"
        case "province_state": return "area"
        case "city": return "city"
        case "neighborhood": return "area"
        case "point_of_interest": return "landmark"
        default:
            return ""
    }
}

watch(() => isModalShow, async(newData,oldData) => {
    inputPlaceDesc.value = inputDataForSearch.name == "" ? "" : `${inputDataForSearch.name}, ${inputDataForSearch.address}`
    isOpenForFirstTime.value = true
})

watch(inputPlaceDesc,async(newData,oldData) => {
    if(isOptionPlaceClicked.value){
        isOptionPlaceClicked.value = false
    }
    else if(isOpenForFirstTime.value){
        isOpenForFirstTime.value = false
    }
    else{
        if(newData.length > 2){
            isDdlPlaceShow.value = true
            isLoadShow.value = true
            isListOptionDdlPlaceShow.value = false

            const urlGetLocation = `https://project-technical-test-api.up.railway.app/location/search?query=${newData}`
            const responseLocation = await $fetch(urlGetLocation)
            listLocationData.value = responseLocation

            const urlGetProperty = `https://project-technical-test-api.up.railway.app/property/search?query=${newData}`
            const responseProperty = await $fetch(urlGetProperty)
            listPropertyData.value = responseProperty

            isLoadShow.value = false
            isListOptionDdlPlaceShow.value = true
        }
        else{
            isDdlPlaceShow.value = false
        }
    }
    
})

</script>

<template>
    <div @click="clickInput" class="relative border-[1px] w-full h-16 rounded-md border-slate-400">
        <span class="absolute -top-3 left-3 bg-white px-1 text-sm">Where are you going ?</span>
        <FontAwesomeIcon class="absolute top-5 left-2 w-5 h-5" :icon="['fas', 'location-dot']"  />
        <FontAwesomeIcon @click="deleteValue" class="absolute right-4 top-5 cursor-pointer w-6 h-6" :icon="['fas', 'fa-circle-xmark']"  />
        <input v-model="inputPlaceDesc"  class="pl-8 pr-14 w-full h-full text-base rounded-md" type="text" placeholder="Search for hotels, apartement or villas" />
        <div @click.stop v-if="isDdlPlaceShow"  class="px-3 pb-3 rounded-md absolute bg-white w-full top-[70px] z-10 h-96 overflow-y-auto " style="box-shadow: 0px 0px 4px 4px #cbd5e1;">
            <div v-if="isLoadShow"  class="flex flex-row justify-center mt-5">
                <UiLoader />
            </div>
            <div @click.stop v-if="isListOptionDdlPlaceShow"  @click="clickOption(item.name,item.name_suffix,item.id,item.location_type)" v-for="item in listPropertyData.concat(listLocationData)" class="mt-3">
                <div 
                    class="flex items-center bg-blue-100 w-24 px-2 py-0.5 rounded-md "
                    :class="{
                        'bg-blue-100':item.location_type == 'property',
                        'bg-green-100':item.location_type != 'property' 
                    }"
                >
                    <FontAwesomeIcon 
                        class="w-3 h-3 items-center mr-2 " 
                        :class="{
                            'text-blue-600':item.location_type == 'property',
                            'text-green-600':item.location_type != 'property' 
                        }"
                        :icon="item.location_type == 'property' ? ['fas', 'bed'] :
                            item.location_type == 'province_state' ? ['fas', 'location-dot'] : 
                            item.location_type == 'city' || item.location_type == 'neighborhood' ? ['fas', 'city']  :
                            item.location_type == 'city' ? ['fas', 'landmark'] :  ['fas', 'location-dot']  " 
                    />
                    <span 
                        class="uppercase text-xs font-normal text-blue-600"
                        :class="{
                            'text-blue-600':item.location_type == 'property',
                            'text-green-600':item.location_type != 'property' 
                        }"
                    >
                        {{listOptionIconDesc(item.location_type)}}
                    </span>
                </div>
                <h1 class="mt-2 text-sm font-semibold" v-html="item.highlight_data.name"></h1>
                <h1 class="text-sm text-slate-400" v-html="item.highlight_data.name_suffix"></h1>
            </div>
            <div v-if="listPropertyData.concat(listLocationData).length <=0 &&  !isLoadShow" class="py-5 px-1">
                <h1 class="text-base">No results found for <b>"{{ inputPlaceDesc }}"</b></h1>
                <span class="text-sm font-light">Try other keywords</span>
            </div>
        </div>
    </div>
</template>