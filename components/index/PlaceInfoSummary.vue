<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useInfoLocationStore } from '~/store/index/infoLocationStore';
import { useInfoPropertyStore } from '~/store/index/infoPropertyStore';

const infoPlaceStore = useInfoPropertyStore()
const infoLocationStore = useInfoLocationStore()
defineProps({
    isLoadPlaceInfoAndImageShow:{ type:Boolean,requried:true}
})
</script>

<template>
    <div v-if="isLoadPlaceInfoAndImageShow" class="animate-pulse mt-16 px-5 py-3 lg:max-w-5xl lg:mx-auto">
        <div class="flex h-4 sm:hidden items-center bg-gray-300 rounded"></div>
        <div class="flex flex-row mt-3">
            <div class="w-20 h-20  sm:h-32 sm:w-32 mr-3 flex bg-gray-300 rounded-full  justify-center items-center"></div>
            <div class="w-9/12">
                <div class=" items-center bg-gray-300 h-5 mb-3 rounded "></div>
                <div class="items-center bg-gray-300 h-3 mb-2 rounded "></div>
                <div class="items-center bg-gray-300 h-3 mb-2 rounded "></div>
                <div class="items-center bg-gray-300 h-3 mb-2 rounded "></div>
                <div class="items-center bg-gray-300 h-3 mb-2 rounded "></div>
            </div>
        </div>
    </div>
    <div v-else class="mt-16 px-5 py-3 lg:max-w-5xl lg:mx-auto">
        <div class="flex sm:hidden items-center">
            <span class="mr-3 font-medium text-lg">{{ infoPlaceStore.infoPlaceName != '' ? infoPlaceStore.infoPlaceName : `Place to stay in ${infoLocationStore.name}`}}</span>
            <div v-if="infoPlaceStore.infoPlaceName != ''">
                <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 1,'text-gray-300':infoPlaceStore.starRating < 1}"  :icon="['fas', 'star']" />
                <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 2,'text-gray-300':infoPlaceStore.starRating < 2}" :icon="['fas', 'star']"  />
                <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 3,'text-gray-300':infoPlaceStore.starRating < 3}" :icon="['fas', 'star']"  />
                <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 4,'text-gray-300':infoPlaceStore.starRating < 4}" :icon="['fas', 'star']"  />
                <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 5,'text-gray-300':infoPlaceStore.starRating < 5}" :icon="['fas', 'star']" />
            </div>
        </div>
        <div class="flex flex-row mt-3">
            <div class="w-3/12 sm:w-4/12 mr-3 flex justify-center items-center">
                <img v-if="infoPlaceStore.infoPlaceImageSummary != ''"
                    class="rounded-full w-24 sm:w-40 h-24 sm:h-40"
                    :src="infoPlaceStore.infoPlaceImageSummary" 
                />
                <img v-else
                    class="rounded-full w-24 sm:w-40 h-24 sm:h-40"
                    src="/img/exploreStay.png" 
                />
            </div>
            <div class="w-9/12">
                <div class="hidden sm:flex items-center">
                    <span class="mr-3 font-medium text-lg">{{ infoPlaceStore.infoPlaceName != '' ? infoPlaceStore.infoPlaceName : `Place to stay in ${infoLocationStore.name}`}} </span>
                    <div v-if="infoPlaceStore.infoPlaceName != ''">
                        <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 1,'text-gray-300':infoPlaceStore.starRating < 1}"  :icon="['fas', 'star']" />
                        <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 2,'text-gray-300':infoPlaceStore.starRating < 2}" :icon="['fas', 'star']"  />
                        <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 3,'text-gray-300':infoPlaceStore.starRating < 3}" :icon="['fas', 'star']"  />
                        <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 4,'text-gray-300':infoPlaceStore.starRating < 4}" :icon="['fas', 'star']"  />
                        <FontAwesomeIcon :class="{'text-yellow-300':infoPlaceStore.starRating >= 5,'text-gray-300':infoPlaceStore.starRating < 5}" :icon="['fas', 'star']" />
                    </div>
                </div>
                <p class="text-sm sm:text-base text-slate-600 capitalize sm:mt-1">{{ infoPlaceStore.infoPlaceSummaryType  ? infoPlaceStore.infoPlaceSummaryType : infoLocationStore.locationType  }}</p>
                <p class="text-sm sm:text-base sm:mt-1  font-light">{{infoLocationStore.address != '' ? infoLocationStore.address : infoPlaceStore.infoPlaceAddress }}</p>
                <div v-if="infoLocationStore.name == ''" class="flex flex-row items-center mt-2">
                    <UiRatingCircle :rating="92" />
                    <span class="ml-2 text-sm sm:text-base font-light">{{ infoPlaceStore.reviewRatingDesc  }}</span>
                    <span class="ml-2 text-sm sm:text-base font-light">{{ infoPlaceStore.totalReviews }}</span>
                </div>
            </div>
        </div>
    </div>

</template>