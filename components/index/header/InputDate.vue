<script setup lang="ts">
import {  format } from 'date-fns'
import { useIndexHeaderStore } from '~/store/index/indexHeaderStore';

const indexHeaderStore = useIndexHeaderStore()

</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton color="black" class=" relative border-[1px] w-full h-16 rounded-md border-slate-400 mt-5 text-black bg-white" icon="i-heroicons-calendar-days-20-solid">
            <span class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
            {{ format(indexHeaderStore.inputDateHeaderData.start, 'd MMM, yyy') }} - {{ format(indexHeaderStore.inputDateHeaderData.end, 'd MMM, yyy') }}
        </UButton>

        <template #panel="{ close }">
        <div class="flex items-center sm:divide-x divide-gray-200 ">
            <UiDatePicker v-model="indexHeaderStore.input_date_header_data" @close="close" />
        </div>
        </template>
    </UPopover>
</template>