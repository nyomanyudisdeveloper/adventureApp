<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';

const infoPlaceStore = useInfoPlaceStore()
</script>

<template>
    <div class="mt-16 px-5 py-3 lg:max-w-5xl lg:mx-auto">
        <div class="flex sm:hidden items-center">
            <span class="mr-3 font-medium text-lg">{{ infoPlaceStore.infoPlaceName}}</span>
            <template v-for="item in  infoPlaceStore.infoPlaceRatingStarInList">
                <FontAwesomeIcon v-if="item" :icon="['fas', 'star']" :style="{color:'#ff9b0a'}" />
                <FontAwesomeIcon v-else :icon="['fas', 'star']" :style="{color:'red'}" />
            </template>
        </div>
        <div class="flex flex-row mt-3">
            <div class="w-3/12 sm:w-4/12 mr-3 flex justify-center items-center">
                <img 
                    class="rounded-full w-24 sm:w-40 h-24 sm:h-40"
                    :src="infoPlaceStore.infoPlaceImageSummary" 
                />
            </div>
            <div class="w-9/12">
                <div class="hidden sm:flex items-center">
                    <span class="mr-3 font-medium text-lg">{{ infoPlaceStore.infoPlaceName}}</span>
                    <template v-for="item in  infoPlaceStore.infoPlaceRatingStarInList">
                        <FontAwesomeIcon v-if="item" :icon="['fas', 'star']" :style="{color:'#ff9b0a'}" />
                        <FontAwesomeIcon v-else :icon="['fas', 'star']" :style="{color:'red'}" />
                    </template>
                </div>
                <p class="text-sm sm:text-base text-slate-600 capitalize sm:mt-1">{{ infoPlaceStore.infoPlaceSummaryType }}</p>
                <p class="text-sm sm:text-base sm:mt-1  font-light">{{ infoPlaceStore.infoPlaceAddress }}</p>
                <div class="flex flex-row items-center mt-2">
                    <UiRatingCircle :rating="92" />
                    <span class="ml-2 text-sm sm:text-base font-light">{{ infoPlaceStore.reviewRatingDesc  }}</span>
                    <span class="ml-2 text-sm sm:text-base font-light">{{ infoPlaceStore.totalReviews }}</span>
                </div>
            </div>
        </div>
    </div>
</template>