<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
    <div class="flex w-full flex-col p-20  justify-center items-center">
        <FontAwesomeIcon class="w-8 h-8 md:w-10 md:h-10"  :icon="['fas', 'circle-exclamation']" />
        <h1 class="mt-5 text-base md:text-lg font-light text-center">There is something wrong, Please try again later</h1>
    </div>
</template>