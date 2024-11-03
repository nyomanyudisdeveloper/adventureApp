<script setup lang="ts">
import { usePlaceStore } from '~/store/PlaceStore';

const placeStore = usePlaceStore()
</script>

<template>
    <div class="flex justify-center items-center">
        <div class="py-5 px-4 lg:max-w-5xl">
            <h3 class="font-medium text-lg mb-3">About the property</h3>
            <p class="text-base font-light" v-for="item in placeStore.placeGeneralInfoAbout">
                {{ item }}
            </p>
            <h5 class="font-medium text-base mt-5 mb-3">Languages</h5>
            <p class="text-sm font-light">{{ placeStore.placeGeneralInfoLanguages }}</p>
            <h4 class="font-normal text-lg mb-3 mt-5">Policies</h4>
            <div class="flex flex-row">
                <div class="mr-7">
                    <h6 class="font-medium text-base">Check-in</h6>
                    <span class="text-sm font-light">{{ placeStore.placeGeneralInfoCheckInTime }}</span>
                </div>
                <div>
                    <h6 class="font-medium text-base">Check-out</h6>
                    <span class="text-sm font-light">{{ placeStore.placeGeneralInfoCheckOutTime }}</span>
                </div>
            </div>
            <h6 class="font-medium text-bas mt-5">Additional check-in information</h6>
            <div class="text-base font-light" v-html="placeStore.placeGeneralInfoAdditionalCheckInInfo">
            </div>
            <h6 class="font-medium text-bas mt-5">Others</h6>
            <div class="text-base font-light" v-html="placeStore.placeGeneralInfoOtherPolicyInfo"></div>
            <h4 class="font-normal text-lg mb-3 mt-5">Important information</h4>
            <h6 class="font-medium text-base mt-5">Optional charges</h6>
            <div class="text-base font-light" v-html="placeStore.placeGeneralInfoFeeOptionalInfo"></div>
        </div>
    </div>
</template>