<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { usePlaceStore } from '~/store/PlaceStore';

    const placeStore = usePlaceStore()
</script>

<template>
    <div >
        <div class="flex flex-row justify-center my-10">
            <span class="mr-1 py-2 px-5">
                <FontAwesomeIcon :icon="['fas', 'filter']" />
                Filter rooms by
            </span>
            <span class="mr-5 border-black border-2 py-2 px-5 rounded-full cursor-pointer">
                <FontAwesomeIcon :icon="['fas', 'utensils']" />
                Free Breakfast
            </span>
            <span class="mr-5 border-black border-2 py-2 px-5 rounded-full cursor-pointer">
                <FontAwesomeIcon :icon="['fas', 'credit-card']" />
                Free Cancellation
            </span>
        </div>
        <template v-for="(item,index) in placeStore.listAvailibility">
            <div v-if="index == 0" class=" flex flex-row justify-evenly">
                <div class="bg-red-400 flex-1">
                    <h1>Ada</h1>
                </div>
                <div class="flex-1 p-5 rounded-t-md bg-blue-200">
                    <div class="flex flex-row justify-between">
                        <span>{{ item.room_name }}</span>
                        <span>See details</span>
                    </div>
                    <div class="flex flex-row ">
                        <span class="mr-5">
                            <FontAwesomeIcon :icon="['fas', 'bed']"/>
                            {{ item.room_bed_groups }}
                        </span>
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'chart-area']"/>
                            {{ item.room_size_sqm }} m<sup>2</sup> 
                        </span>
                    </div>
                    <div class="flex flex-row justify-between">
                        <span v-if="item.meal_plan_description == ''">
                            <FontAwesomeIcon :icon="['fas', 'utensils']"/>
                            No Breakfast
                        </span>
                        <span v-else>
                            <FontAwesomeIcon :icon="['fas', 'utensils']"/>
                            {{ item.meal_plan_description }}
                        </span>
                        <div>
                            <FontAwesomeIcon class="mr-3" :icon="['fas', 'copy']"/>
                            <FontAwesomeIcon class="mr-3" :icon="['fas', 'camera-retro']"/>
                            <FontAwesomeIcon class="mr-3" :icon="['fas', 'ellipsis']"/>
                        </div>
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon class="mr-3" :icon="['fas', 'copy']"/>
                            {{ item.cancel_policy_description }}
                        </span>
                    </div>
                </div>
            </div>
            <!-- <div>
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
            </div> -->
            <!-- <span v-else-if="index != 0 && item.room_name != placeStore.listAvailibility[index-1].room_name">{{ item.room_name }} {{ item.pricing_data.net_rate_nightly_with_bonus }}</span>
            <span v-else>{{ item.room_name }} {{ item.pricing_data.net_rate_nightly_with_bonus }} 2</span> -->
        </template>
    </div>
    
</template>