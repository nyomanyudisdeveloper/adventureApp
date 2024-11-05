<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
    title:{
        type:String,
        required: true
    },
    icon:{
        type:String,
        required:false
    },
    click:{
        type:Object,
        required:false
    }
})
</script>

<template>
    <div @click="click" class="w-full h-full flex justify-center items-center px-3 py-3 text-white rounded-md text-xs cursor-pointer bg-blue-600">
        <FontAwesomeIcon v-if="icon" class="mr-3" :icon="['fas', icon]" />
        {{ title }}
    </div>
</template>