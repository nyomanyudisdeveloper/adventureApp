<script setup lang="ts">
import {  format } from 'date-fns'

const {inputDataForSearch,setInputDataForSearch,isModalShow} = defineProps({
    inputDataForSearch:{type:Object,required:true},
    setInputDataForSearch:{type:Object, required:true},
    isModalShow:{type:Object,required:true}
})
const inputDate = ref({
    start:new Date(),
    end:new Date()
})

watch(inputDate,async(newData,oldData) => {
    var temp_data = {...inputDataForSearch}
    temp_data.date = newData
    setInputDataForSearch(temp_data)
})

watch(() => isModalShow, async(newData,oldData) => {
    inputDate.value = {...inputDataForSearch.date}
})

</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton color="black" class=" relative border-[1px] w-full h-16 rounded-md border-slate-400 mt-5 text-black bg-white" icon="i-heroicons-calendar-days-20-solid">
            <span class="absolute -top-3 left-3 bg-white px-1 text-sm">Check in - Check out</span>
            {{ format(inputDate.start, 'd MMM, yyy') }} - {{ format(inputDate.end, 'd MMM, yyy') }}
        </UButton>

        <template #panel="{ close }">
        <div class="w-full flex items-center sm:divide-x divide-gray-200 ">
            <UiDatePicker v-model="inputDate" @close="close" />
        </div>
        </template>
    </UPopover>
</template>