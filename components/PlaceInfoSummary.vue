<script setup>
import { usePlaceStore } from '~/store/PlaceStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const placeStore = usePlaceStore()
</script>

<template>
    <div class="mt-16 px-5 py-3 lg:max-w-5xl lg:mx-auto ">
        <div class="relative sm:hidden">
            <span class="mr-3 font-medium text-lg">{{ placeStore.placeInfoSummaryName}}</span>
            <template v-for="item in  placeStore.placeInfoSummaryRatingStar">
                <FontAwesomeIcon v-if="item" :icon="['fas', 'star']" :style="{color:'#ff9b0a'}" />
                <FontAwesomeIcon v-else :icon="['fas', 'star']" :style="{color:'red'}" />
            </template>
        </div>
        <div class="flex flex-row mt-3">
            <div class="w-3/12 sm:w-4/12 mr-3 flex justify-center items-center">
                <img 
                    class="rounded-full w-24 sm:w-40 h-24 sm:h-40"
                    :src="placeStore.placeInfoSummaryImage" 
                />
            </div>
            <div class="w-9/12">
                <div class="hidden sm:flex items-center">
                    <span class="mr-3 font-medium text-lg">{{ placeStore.placeInfoSummaryName}}</span>
                    <template v-for="item in  placeStore.placeInfoSummaryRatingStar">
                        <FontAwesomeIcon v-if="item" :icon="['fas', 'star']" :style="{color:'#ff9b0a'}" />
                        <FontAwesomeIcon v-else :icon="['fas', 'star']" :style="{color:'red'}" />
                    </template>
                </div>
                <p class="text-sm sm:text-base text-slate-600 capitalize sm:mt-1">{{ placeStore.placeInfoSummaryType }}</p>
                <p class="text-sm sm:text-base sm:mt-1  font-light">{{ placeStore.placeInfoSummaryAddress }}</p>
                <div class="flex flex-row items-center mt-2">
                    <RatingCircle :rating="92" />
                    <span class="ml-2 text-sm sm:text-base font-light">{{ placeStore.reviewRatingDescription  }}</span>
                    <span class="ml-2 text-sm sm:text-base font-light">{{ placeStore.placeInfoSummaryTotalReviews }}</span>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="flex justify-around mt-16"> -->
        <!-- <div>
            <img 
                class="rounded-full"
                width="200" 
                height="100" 
                :src="placeStore.placeInfoSummaryImage" 
            />
        </div> -->
        <!-- <div class="flex flex-col">
            <div class="flex flex-row ">
                <span>{{ placeStore.placeInfoSummaryName}}</span> 
                <div class="ml-3">
                    <template v-for="item in  placeStore.placeInfoSummaryRatingStar">
                        <FontAwesomeIcon v-if="item" :icon="['fas', 'star']" :style="{color:'#ff9b0a'}" />
                        <FontAwesomeIcon v-else :icon="['fas', 'star']" :style="{color:'red'}" />
                    </template>
                </div>
            </div>
            <span>{{ placeStore.placeInfoSummaryType }}</span>
            <span>{{ placeStore.placeInfoSummaryAddress }}</span>
            <span>{{ placeStore.placeInfoSummaryTotalReviews }}</span>
        </div> -->
    <!-- </div> -->
</template>

