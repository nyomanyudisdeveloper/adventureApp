<script setup lang="ts">
import { usePlaceStore } from '~/store/PlaceStore';

const placeStore = usePlaceStore()
console.log("PlaceGeneralInfo = ",placeStore.placeGeneralInfoLanguages)
</script>

<template>
    <h3 class="font-semibold mt-5">About the property</h3>
    <p v-for="item in placeStore.placeGeneralInfoAbout">
        {{ item }}
    </p>
    <h3 class="font-semibold mt-5">Languages</h3>
    <p>{{ placeStore.placeGeneralInfoLanguages }}</p>
    
</template>