<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { usePlaceStore } from '~/store/PlaceStore';

const placeStore = usePlaceStore()

function clickSectionNav(data) {
    placeStore.setPlaceSectionNavActive(data)
}
</script>

<template>
    <div class="w-full h-0.5 bg-gray-400 mb-3">
        <div class="w-20 h-full" style="background-color: #1a73e8;"></div>
    </div>
    <div class="flex justify-center">
        <div @click="clickSectionNav('deals')" class="mx-3 cursor-pointer">
            <template v-if="placeStore.getPlaceSectionNavActive == 'deals'">
                <FontAwesomeIcon :icon="['fas', 'tag']" :style="{color:'#1a73e8'}" />
                <span  class="ml-2" style="color: #1a73e8;">Deals</span>
            </template>
            <template v-else>
                <FontAwesomeIcon :icon="['fas', 'tag']"  />
                <span  class="ml-2" >Deals</span>
            </template>
        </div>
        <div @click="clickSectionNav('photos')" class="mx-3 cursor-pointer">
            <template v-if="placeStore.getPlaceSectionNavActive == 'photos'">
                <FontAwesomeIcon :icon="['fas', 'image']" :style="{color:'#1a73e8'}" />
                <span  class="ml-2" style="color: #1a73e8;">Photos</span>
            </template>
            <template v-else>
                <FontAwesomeIcon :icon="['fas', 'image']"  />
                <span  class="ml-2" >Photos</span>
            </template>
        </div>
        <div @click="clickSectionNav('info')" class="mx-3 cursor-pointer">
            <template v-if="placeStore.getPlaceSectionNavActive == 'info'">
                <FontAwesomeIcon :icon="['fas', 'circle-info']" :style="{color:'#1a73e8'}" />
                <span  class="ml-2" style="color: #1a73e8;">Info</span>
            </template>
            <template v-else>
                <FontAwesomeIcon :icon="['fas', 'circle-info']"  />
                <span  class="ml-2" >Info</span>
            </template>
        </div>
    </div>
</template>