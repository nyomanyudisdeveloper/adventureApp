<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
defineProps({
    'title': {
        type:String,
        required:true
    },
    'icon' : {
        type:String,
        default:"bed"
    }
})
</script>

<template>
    <div class="px-3 py-1 border-2 rounded-full flex justify-center items-center cursor-pointer mr-3">
        <FontAwesomeIcon class="w-4 h-4" :icon="['fas', icon]" />
        <span class="ml-2 text-sm">{{ title }}</span>
    </div>
</template>