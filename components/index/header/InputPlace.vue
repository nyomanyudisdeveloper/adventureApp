<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useIndexHeaderStore } from '~/store/index/indexHeaderStore';

const indexHeaderStore = useIndexHeaderStore()

const isListPlaceShow = ref(false)
const listPlaceData = ref([])
const isLoadShow = ref(false)
const isOptionPlaceClicked = ref(false)
// const inputValue = ref("")


async function clickInput(){
    var currentShow = isListPlaceShow.value
    if(currentShow){
        isListPlaceShow.value = false
        const placeValueDisplay = props.placeData.value.name + ", "+ props.placeData.value.address
        if(indexHeaderStore.inputPlaceHeaderDesc != placeValueDisplay){
            isOptionPlaceClicked.value = true
            indexHeaderStore.setInputPlaceHeaderData(placeValueDisplay)
        }
    }
    else{
        if(indexHeaderStore.inputPlaceHeaderDesc.length > 2){
            isLoadShow.value = true
            isListPlaceShow.value = true
            const url = `https://project-technical-test-api.up.railway.app/property/search?query=${indexHeaderStore.inputPlaceHeaderDesc}`
            const response = await $fetch(url)
            listPlaceData.value = response
            isLoadShow.value = false
        }
        else{
            isListPlaceShow.value = false
        }
    }
}


function deleteValue(){
    indexHeaderStore.setInputPlaceHeaderDesc("")
    indexHeaderStore.setInputPlaceHeaderData({
        id:"",
        name:"",
        address:""
    })
}

function clickOption(name,address,id){
    console.log("clickOption")
    isListPlaceShow.value = false
    isOptionPlaceClicked.value = true
    indexHeaderStore.setInputPlaceHeaderData({
        "name":name,
        "address":address,
        "id":id
    })
    indexHeaderStore.setInputPlaceHeaderDesc(name + ", "+ address)
}

watch(() => indexHeaderStore.input_place_header_desc,async(newData,oldData) => {
    if(isOptionPlaceClicked.value){
        isOptionPlaceClicked.value = false
    }
    else{
        if(indexHeaderStore.input_place_header_desc.length > 2){
            isListPlaceShow.value = true
            isLoadShow.value = true
            const url = `https://project-technical-test-api.up.railway.app/property/search?query=${indexHeaderStore.inputPlaceHeaderDesc}`
            const response = await $fetch(url)
            listPlaceData.value = response
            isLoadShow.value = false
        }
        else{
            isListPlaceShow.value = false
        }
    }
})

</script>

<template>
    <div @click="clickInput" class="relative border-2 w-full h-16 rounded-md border-slate-400">
        <span class="absolute -top-3 left-3 bg-white px-1 text-sm">Where are you going ?</span>
        <FontAwesomeIcon class="absolute top-5 left-2 w-5 h-5" :icon="['fas', 'location-dot']"  />
        <FontAwesomeIcon @click="deleteValue" class="absolute right-4 top-5 cursor-pointer w-6 h-6" :icon="['fas', 'fa-circle-xmark']"  />
        <input v-model="indexHeaderStore.input_place_header_desc"  class="pl-8 pr-14 w-full h-full text-lg rounded-md" type="text" placeholder="Search for hotels, apartement or villas" />
        <div @click.stop v-if="isListPlaceShow"  class="px-3 pb-3 rounded-md absolute bg-white w-full top-16 z-10 h-96 overflow-y-auto " style="box-shadow: 0px 0px 4px 4px #cbd5e1;">
            <div v-if="isLoadShow"  class="flex flex-row justify-center mt-5">
                <UiLoader />
            </div>
            <div  @click="clickOption(item.name,item.name_suffix,item.id)" v-for="item in listPlaceData" class="mt-3">
                <span class="bg-blue-200 px-2 py-0 rounded-md ">
                    <FontAwesomeIcon class="w-2 h-2 items-center mr-2 text-blue-600" :icon="['fas', 'bed']" />
                    <span class="uppercase text-xs text-blue-600">hotel</span>
                </span>
                <h1 class="mt-2 text-base font-semibold">{{ item.name }}</h1>
                <h1 class="text-sm text-slate-400">{{ item.name_suffix }}</h1>
            </div>
        </div>
    </div>
</template>