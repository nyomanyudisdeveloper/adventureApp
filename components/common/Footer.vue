<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
    <div class="flex flex-row justify-between px-5 bg-neutral-100 py-7">
        <div class="flex flex-row items-center">
            <FontAwesomeIcon :icon="['fas', 'copyright']" class="mr-2" />
            <span class="font-normal text-base mr-4">Wisata App</span>
            <span class="mr-4"> .</span>
            <a class="cursor-pointer font-light text-sm text-gray-400" href="https://project-exterior-technical-test-app.up.railway.app/termsandcondition">Terms</a>
        </div>
        <div>
            <span class="text-sm font-light">v4.10</span>
        </div>
    </div>
</template>