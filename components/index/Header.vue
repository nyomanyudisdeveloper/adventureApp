<script setup lang="ts">
import { usePlaceStore } from '~/store/PlaceStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useIndexHeaderStore } from '~/store/index/indexHeaderStore';
import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';


const placeStore = usePlaceStore()
const indexHeaderStore = useIndexHeaderStore()
const infoPlaceStore = useInfoPlaceStore()

const isModalShow = ref(false)

const {setIsModalHeaderShow,isModalHeaderShow,isModalImageShow,setIsModalImageShow} = defineProps({
    setIsModalHeaderShow:{type:Object, require:true},
    isModalHeaderShow:{type:Object, require:true},
    isModalImageShow:{type: Object, required:true},
    setIsModalImageShow:{type: Object, required:true}
})

function goToPrev(){
    if(isModalImageShow){
        setIsModalImageShow(false)
    }
    else{
        window.history.back()
    }
}




function searchNavClicked(){
    isModalShow.value = !isModalShow.value
    indexHeaderStore.setInputPlaceHeaderDesc(indexHeaderStore.urlParamData.name == "" ? "" :  indexHeaderStore.urlParamData.name + ", "+ indexHeaderStore.urlParamData.address)
    indexHeaderStore.setInputPlaceHeaderData({
        id:"",
        name:"",
        address:""
    })
    indexHeaderStore.setInputDateHeaderData({
        start:indexHeaderStore.urlParamData.checkIn == "" ? new Date() : new Date(indexHeaderStore.urlParamData.checkIn),
        end:indexHeaderStore.urlParamData.checkOut == "" ? new Date() : new Date(indexHeaderStore.urlParamData.checkOut)
    })
    indexHeaderStore.setInputTotalRoomHeaderData(indexHeaderStore.urlParamData.totalRoom)
    indexHeaderStore.setInputTotalGuestHeaderData(indexHeaderStore.urlParamData.totalGuest)
}

async function clickSearch(){
    const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${indexHeaderStore.inputPlaceHeaderData.id}&include=general_info&include=important_info&include=image`))[indexHeaderStore.inputPlaceHeaderData.id]
    infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)

    isModalShow.value = false
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
                <div class="text-sm text-ellipsis truncate ">{{ indexHeaderStore.stayInputHeaderValue }}</div>
            </div>
            <div class="w-20 h-full">
                <UiPrimaryButton title="Sign In" />
            </div>
        </div>
        <div  id="container1" @click="searchNavClicked" class="z-50 fixed w-full h-full  bg-slate-600/90 sm:px-5 rounded-md" :class="isModalShow ? '' : 'hidden'">
            <div id="container2" @click.stop class="w-full bg-white flex flex-col px-5 py-3 lg:max-w-5xl lg:mx-auto">
                <div class="flex flex-col lg:flex-row lg:items-center">
                <div class="lg:w-5/12 lg:mr-3">
                    <IndexHeaderInputPlace />
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between mb-5 lg:w-6/12 lg:mr-3">
                    <div class="w-full sm:w-6/12 sm:mr-3">
                    <IndexHeaderInputDate />
                    </div>
                    <div class="w-full sm:w-6/12">
                    <IndexHeaderInputTotalRoomAndGuest />
                    </div>
                </div>
                <div class="lg:w-1/12 h-16">
                    <UiPrimaryButton :click="clickSearch" title="Search" icon="magnifying-glass" />
                </div>
                </div>
            </div>
        </div>
    </div>
</template>