<script setup>
import { usePlaceStore } from '~/store/PlaceStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const placeStore = usePlaceStore()
</script>

<template>
    <div class="flex justify-around py-10">
        <div>
            <img 
                class="rounded-full"
                width="200" 
                height="100" 
                :src="placeStore.placeInfoSummaryImage" 
            />
        </div>
        <div class="flex flex-col">
            <!-- {{ placeStore.getCount.id }} -->
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
        </div>
    </div>
</template>

