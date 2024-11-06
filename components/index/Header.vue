<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {convertTwoDateStringToStringDisplay} from "../../utils/dateUtils"

const isModalShow = ref(false)
const inputDataForSearch = ref({
    id:"", 
    name:"",
    address:"",
    date:{
      start:new Date(),
      end:new Date()
    },
    totalGuest:2,
    totalRoom:1,
    locationType:""
})


const setInputDataForSearch = (data) => {
    inputDataForSearch.value = data
}
const {isModalImageShow,setIsModalImageShow,inputDataFixed,setInputDataFixed} = defineProps({
    isModalImageShow:{type: Object, required:true},
    setIsModalImageShow:{type: Object, required:true},
    inputDataFixed:{type:Object, required:true},
    setInputDataFixed:{type:Object, required:true},
})

function goToPrev(){
    if(isModalImageShow){
        setIsModalImageShow(false)
    }
    else{
        window.history.back()
    }
}

const inputSearchHeaderDesc = () => {
    const display_date = convertTwoDateStringToStringDisplay(inputDataFixed.date.start,inputDataFixed.date.end)
    if(inputDataFixed.name == ""){
        return "Find your place to stay"
    }
    return `${inputDataFixed.name} . ${display_date}`
}


function searchNavClicked(){
    inputDataForSearch.value = {...inputDataFixed}
    isModalShow.value = !isModalShow.value
}

async function clickSearch(){
    if(inputDataForSearch.value.id != ""){
        isModalShow.value = !isModalShow.value
        setInputDataFixed(inputDataForSearch.value)
    }
    
    // const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${indexHeaderStore.inputPlaceHeaderData.id}&include=general_info&include=important_info&include=image`))[indexHeaderStore.inputPlaceHeaderData.id]
    // infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)

    // isModalShow.value = false
}



</script>

<template>
    <div class="w-full fixed bg-white top-0 left-0">
        <div class="flex-row justify-between items-center flex flex-1 px-5 py-3 lg:max-w-5xl lg:mx-auto ">
            <div class="w-1/12 flex justify-center items-center sm:hidden">
                <FontAwesomeIcon @click="goToPrev" class="  h-6 text-blue-400 " :icon="['fas', 'chevron-left']" />
            </div>
            <img class="hover:cursor-pointer hidden sm:flex w-30 h-10" alt="Wisata App logo" src="/img/logo.png"  />
            
            <div @click="searchNavClicked" class="mx-1 transition flex justify-center items-center w-9/12 sm:w-6/12 md:w-7/12 h-10 rounded-lg hover:bg-slate-400 active:bg-slate-200 bg-slate-200 text-pretty ">
                <FontAwesomeIcon class="mx-3 w-3 h-3" :icon="['fas', 'magnifying-glass']" />
                <div class="text-sm text-ellipsis truncate " >{{ inputSearchHeaderDesc() }}</div>
            </div>
            <div class="w-20 h-full">
                <UiPrimaryButton title="Sign In" />
            </div>
        </div>
        <div  @click="searchNavClicked" class="z-50 fixed w-full h-full  bg-slate-600/30 sm:px-5 rounded-md" :class="isModalShow ? '' : 'hidden'">
            <div  @click.stop class="w-full bg-white flex flex-col px-5 py-3 lg:max-w-5xl lg:mx-auto">
                <div class="flex flex-col lg:flex-row lg:items-center">
                <div class="lg:w-5/12 lg:mr-3">
                    <IndexHeaderInputPlace 
                        :inputDataForSearch="inputDataForSearch"
                        :setInputDataForSearch="setInputDataForSearch"
                        :isModalShow="isModalShow"
                    />
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between mb-5 lg:w-6/12 lg:mr-3">
                    <div class="w-full sm:w-6/12 sm:mr-3">
                        <IndexHeaderInputDate 
                            :inputDataForSearch="inputDataForSearch"
                            :setInputDataForSearch="setInputDataForSearch"
                            :isModalShow="isModalShow"
                        />
                    </div>
                    <div class="w-full sm:w-6/12">
                        <IndexHeaderInputTotalRoomAndGuest 
                        :inputDataForSearch="inputDataForSearch"
                        :setInputDataForSearch="setInputDataForSearch"
                        />
                    </div>
                </div>
                <div class="lg:w-28 h-16">
                    <UiPrimaryButton :click="clickSearch" title="Search" icon="magnifying-glass" />
                </div>
                </div>
            </div>
        </div>
    </div>
</template>