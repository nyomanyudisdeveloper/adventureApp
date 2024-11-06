<script setup>
import {onMounted, nextTick,watch, ref, onBeforeUnmount} from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';


const indexSelectedImage = ref(0);
const infoPlaceStore = useInfoPlaceStore()
const {isLoadPlaceInfoAndImageShow,isModalImageShow,setIsModalImageShow} = defineProps({
    isLoadPlaceInfoAndImageShow:{ type:Boolean,required:true},
    isModalImageShow:{type:Object,required:true},
    setIsModalImageShow:{type:Object, required:true}
})

function clickImage(index){
    indexSelectedImage.value = index
    setIsModalImageShow(true)
}

function closeModalImage(){
    setIsModalImageShow(false)
}

const targetImage = ref(null);
const modalGallery = ref(null);

watch(
    () => isModalImageShow,
    (isOpen) => {
        if(isOpen){
            nextTick(() => {
                const container = modalGallery.value;
                const target = targetImage.value[0]; 

                if (container && target) {
                    container.scrollTop = target.offsetTop;
                }
            });
        }
    }
)

function changeImageModalByCursor(data){
    const total_image = infoPlaceStore.listGalleryImage.length
    if(indexSelectedImage.value + data < 0){
        indexSelectedImage.value = total_image - 1
    }
    else if(indexSelectedImage.value + data >= total_image){
        indexSelectedImage.value = 0
    }
    else{
        indexSelectedImage.value += data
    }
}

const handleKeyDown = (event) => {
    if(isModalImageShow){
        if (event.key === 'ArrowLeft') {
            changeImageModalByCursor(-1)
        } else if (event.key === 'ArrowRight') {
            changeImageModalByCursor(1)
        }
        else if( event.key === 'Escape'){
            closeModalImage()
        }
    }
}

onMounted(() => {
    window.addEventListener('keydown',handleKeyDown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown',handleKeyDown);
})

</script>

<template>
    <div v-if="isLoadPlaceInfoAndImageShow" class="grid grid-cols-3 gap-0.5 lg:gap-4 max-w-5xl mx-auto mb-5">
        <div class="w-full h-40 sm:h-56 md:h-80 cursor-pointer hover:opacity-80 bg-gray-300 animate-pulse" v-for="i in 9">
            
        </div>
    </div>
    <div v-else class="grid grid-cols-3 gap-0.5 lg:gap-4 max-w-5xl mx-auto mb-5">
        <div @click="clickImage(index)" class="w-full h-40 sm:h-56 md:h-80 cursor-pointer hover:opacity-80" v-for="(item,index) in infoPlaceStore.listGalleryImage">
            <img onerror="this.onerror=null; this.src='/img/img-not-found.png'" :src="item.url.sm" class="w-full h-full object-cover" />
        </div>
    </div>
    <div ref="modalGallery" v-if="isModalImageShow" class="fixed top-16 left-0 w-full h-full bg-slate-100 overflow-y-auto sm:hidden">
        <div class="py-5 bg-white mb-5" 
            v-for="(item,index) in infoPlaceStore.listGalleryImage"
        >
            <div class="flex flex-row mb-5" :key="index"
            :ref="index === indexSelectedImage ? 'targetImage' : null" >
                <div class="w-2/12 flex justify-center items-center">
                    <img 
                        class="rounded-full w-10 h-10 object-cover"
                        :src="infoPlaceStore.infoPlaceImageSummary" 
                    />
                </div>
                <div class="w-10/12">
                    <h3 class="text-sm font-semibold">{{ infoPlaceStore.infoPlaceName }}</h3>
                    <span class="text-sm font-light">{{ infoPlaceStore.infoPlaceAddress }}</span>
                </div>
            </div>
            <img class="object-cover w-full h-96" onerror="this.onerror=null; this.src='/img/img-not-found.png'" :src="item.url.lg"  />
            <div class="p-5">
                <span class="font-semibold text-sm">{{ item.caption }}</span> <span class="text-sm">@{{ infoPlaceStore.infoPlaceName }}</span>
            </div>
        </div>
    </div>
    <div @click="closeModalImage" v-if="isModalImageShow" class="hidden sm:fixed sm:flex top-0 left-0 w-full h-full justify-center items-center">
        <div class="absolute inset-0 bg-black opacity-80"></div>
        <div @click.stop class="flex justify-center items-center ">
            <img class="relative object-cover h-full max-h-69vh opacity-100 w-11/12" onerror="this.onerror=null; this.src='/img/img-not-found.png'" :src="infoPlaceStore.listGalleryImage[indexSelectedImage].url.lg">
            <FontAwesomeIcon @click="changeImageModalByCursor(-1)" class="absolute left-10 w-10 h-10 text-white cursor-pointer"  :icon="['fas', 'circle-chevron-left']" />
            <FontAwesomeIcon @click="changeImageModalByCursor(1)" class="absolute right-10 w-10 h-10 text-white cursor-pointer"  :icon="['fas', 'circle-chevron-right']" />
            </img>
        </div>
    </div>
</template>