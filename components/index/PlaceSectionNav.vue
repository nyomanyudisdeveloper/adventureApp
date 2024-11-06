<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const {activeMenu,setActiveMenu} = defineProps({
    setActiveMenu:{
        type:Object,
        require:true
    },
    activeMenu:{
        type:Object,
        require:true
    }
})

function clickSectionNav(data) {
    setActiveMenu(data)
}
</script>

<template>
    <div class="sm:hidden">
        <div class="flex flex-row  mt-7">
            <div @click="clickSectionNav('deals')" class="flex justify-center items-center w-4/12 pb-3 cursor-pointer" >
                <FontAwesomeIcon class="w-6 h-6" :icon="['fas', 'tag']" :style="{color:activeMenu == 'deals'?'#1a73e8':''}" />
            </div>
            <div @click="clickSectionNav('photos')" class="flex justify-center items-center w-4/12  pb-3 cursor-pointer">
                <FontAwesomeIcon class="w-6 h-6" :icon="['fas', 'image']" :style="{color:activeMenu== 'photos'?'#1a73e8':''}" />
            </div>
            <div @click="clickSectionNav('info')" class="flex justify-center items-center w-4/12 pb-3 cursor-pointer">
                <FontAwesomeIcon class="w-6 h-6" :icon="['fas', 'circle-info']" :style="{color:activeMenue == 'info'?'#1a73e8':''}" />
            </div>
        </div>
        <div class="w-full h-0.5 bg-slate-200">
            <div class="flex z-0 w-4/12 h-0.5 bg-blue-400 transition-transform duration-300"
            :class="{
                'translate-x-0':activeMenu == 'deals'? true : false,
                'translate-x-full':activeMenu == 'photos'? true : false,
                'translate-x-2full':activeMenu == 'info'? true : false
            }"></div>
        </div>
    </div>
    <div class="hidden sm:flex flex-col mt-7">
        <div class="w-full h-0.5 bg-slate-200 flex justify-center items-center max-w-5xl mx-auto">
            <div class="flex w-7/12 max-w-2xl flex-row justify-center  ">
                <div class="flex z-50 w-32 bg-blue-400 h-0.5 transition-transform duration-300"
                    :class="{
                    '-translate-x-full':activeMenu == 'deals'? true : false,
                    'translate-x-0':activeMenu == 'photos'? true : false,
                    'translate-x-full':activeMenu == 'info'? true : false
                }"></div>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <div class="flex flex-row justify-center  w-7/12 max-w-2xl ">
                <div @click="clickSectionNav('deals')" class="px-3 py-5 flex justify-center items-center  w-32 cursor-pointer ">
                    <FontAwesomeIcon class="w-4 h-4" :icon="['fas', 'tag']" :style="{color:activeMenu == 'deals'?'#1a73e8':''}" />
                    <span class="ml-2 text-xs" :class="{'text-blue-400':activeMenu == 'deals'? true: false}">DEALS</span>
                </div>
                <div @click="clickSectionNav('photos')" class="px-3 py-5 flex justify-center items-center  w-32 cursor-pointer ">
                    <FontAwesomeIcon class="w-4 h-4" :icon="['fas', 'image']" :style="{color:activeMenu == 'photos'?'#1a73e8':''}" />
                    <span class="ml-2 text-xs" :class="{'text-blue-400':activeMenu == 'photos'? true: false}">PHOTOS</span>
                </div>
                <div @click="clickSectionNav('info')" class="px-3 py-5 flex justify-center items-center w-32 cursor-pointer ">
                    <FontAwesomeIcon class="w-4 h-4" :icon="['fas', 'circle-info']" :style="{color:activeMenu == 'info'?'#1a73e8':''}" />
                    <span class="ml-2 text-xs " :class="{'text-blue-400':activeMenu == 'info'? true: false}">INFO</span>
                </div>
            </div>
        </div>
    </div>
</template>