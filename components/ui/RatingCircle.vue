<template>
    <div
      class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm"
      :class="ratingColor"
    >
      {{ rating }}
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps } from 'vue';
  
  const props = defineProps({
    rating: {
      type: Number,
      required: true,
    },
  });
  
  const ratingColor = computed(() => {
    if (props.rating >= 90) return 'bg-green-500';
    if (props.rating >= 70) return 'bg-yellow-500';
    if (props.rating >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  