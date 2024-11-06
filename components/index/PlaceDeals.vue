<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { usePlaceStore } from '~/store/PlaceStore';

    const placeStore = usePlaceStore()
    defineProps({
        isLoadDealsShow:{
            type:Object,
            required:true
        }
    })
</script>

<template>
    <div v-if="placeStore.listAvailibility.length > 0 && !isLoadDealsShow" >
        <div class="p-5 bg-white">
            <div class="flex  items-center">
                <FontAwesomeIcon :icon="['fas', 'filter']" />
                <span class="ml-2  ">Filter rooms by</span>
            </div>
            <div class="flex flex-row mt-3">
                <UiFilterButton title="Free Breakfast" icon="utensils"  />
                <UiFilterButton title="Free Cancellation" icon="credit-card"  />
            </div>
        </div>
        <!-- <template v-for="(item,index) in placeStore.listAvailibility">

        </template> -->
        <!-- <template v-for="(item,index) in placeStore.listAvailibility">
            <div>
                <div>offer_id = {{ item.offer_id }}</div>
                <div>room_name = {{ item.room_name }} </div> 
                <div>net_rate_nightly_with_bonus = {{ item.pricing_data.net_rate_nightly_with_bonus }} </div>
                <div>room_bed_groups = {{ item.room_bed_groups }}</div>
                <div>room_size_sqm = {{ item.room_size_sqm }}</div>
                <div>meal_plan_description = {{ item.meal_plan_description }}</div>
                <div>cancel_policy_description = {{ item.cancel_policy_description }}</div>
                <div>net_price_total = {{ item.pricing_data.net_price_total_with_bonus }}</div>
                <div>wisata_point = {{ item.pricing_data.wisata_point }}</div>
                <div>strikethrough_rate_nightly = {{ item.pricing_data.strikethrough_rate_nightly }}</div>
                <br/>
            </div>
            <span v-else-if="index != 0 && item.room_name != placeStore.listAvailibility[index-1].room_name">{{ item.room_name }} {{ item.pricing_data.net_rate_nightly_with_bonus }}</span>
            <span v-else>{{ item.room_name }} {{ item.pricing_data.net_rate_nightly_with_bonus }} 2</span>
        </template> -->
    </div>
    <div v-else-if="isLoadDealsShow" class="animate-pulse space-y-4 p-4">
        <!-- Lines representing text -->
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="h-4 bg-gray-300 rounded w-5/6"></div>

        <!-- Rectangle for an image or large block -->
        <div class="h-48 bg-gray-300 rounded"></div>

        <!-- Small buttons or icons -->
        <div class="flex space-x-2">
        <div class="h-8 w-8 bg-gray-300 rounded-full"></div>
        <div class="h-8 w-8 bg-gray-300 rounded-full"></div>
        <div class="h-8 w-8 bg-gray-300 rounded-full"></div>
    </div>

    </div>
    <div v-else>
        <h1>No Data Found</h1>
    </div>
    
</template>