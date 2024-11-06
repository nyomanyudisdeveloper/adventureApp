<script setup lang="ts">
import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';

const infoPlaceStore = useInfoPlaceStore()

defineProps({
    isLoadPlaceInfoAndImageShow:{
        type:Boolean,
        required:true
    }
})

</script>

<template>
    <div v-if="isLoadPlaceInfoAndImageShow" class="p-3 animate-pulse">
        <div v-for="i in 5" class="mb-5">
            <div class="h-3 w-1/2 bg-gray-300 mb-3 rounded"></div>
            <div class="h-2 w-full bg-gray-300 mb-2 rounded"></div>
            <div class="h-2 w-full bg-gray-300 mb-2 rounded"></div>
            <div class="h-2 w-full bg-gray-300 mb-2 rounded"></div>
            <div class="h-2 w-full bg-gray-300 mb-2 rounded"></div>
        </div>
    </div>
    <div v-else  class="flex justify-center items-center">
        <div class="py-5 px-4 lg:max-w-5xl">
            <h3 class="font-medium text-lg mb-3">About the property</h3>
            <p class="text-base font-light" v-for="item in infoPlaceStore.aboutInList">
                {{ item }}
            </p>
            <h5 class="font-medium text-base mt-5 mb-3">Languages</h5>
            <p class="text-sm font-light">{{ infoPlaceStore.languagesDesc }}</p>
            <h4 class="font-normal text-lg mb-3 mt-5">Policies</h4>
            <div class="flex flex-row">
                <div class="mr-7">
                    <h6 class="font-medium text-base">Check-in</h6>
                    <span class="text-sm font-light">{{ infoPlaceStore.checkInTime }}</span>
                </div>
                <div>
                    <h6 class="font-medium text-base">Check-out</h6>
                    <span class="text-sm font-light">{{ infoPlaceStore.checkOutTime }}</span>
                </div>
            </div>
            <h6 class="font-medium text-bas mt-5">Additional check-in information</h6>
            <div class="text-base font-light" v-html="infoPlaceStore.additionalCheckInInfoInStringHTML">
            </div>
            <h6 class="font-medium text-bas mt-5">Others</h6>
            <div class="text-base font-light" v-html="infoPlaceStore.otherPolicyInfoInStringHTMl"></div>
            <h4 class="font-normal text-lg mb-3 mt-5">Important information</h4>
            <h6 class="font-medium text-base mt-5">Optional charges</h6>
            <div class="text-base font-light" v-html="infoPlaceStore.feeOptionalInfoInStringHTML"></div>
        </div>
    </div>
</template>