<script setup lang="ts">
 
  import '~/assets/css/main.css'
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  const route = useRoute() 
  library.add(fas); 
  const infoPlaceStore = useInfoPlaceStore()
  

  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);

  const inputDataFixed = ref({
    id:"", 
    name:"",
    address:"",
    date:{
      start:new Date(),
      end:nextDate
    },
    totalGuest:2,
    totalRoom:1,
    locationType:""
  })
  const setInputDataFixed = (data) => {
    inputDataFixed.value = data
  }

  const isLoadDealsShow = ref(false)
  const isLoadPlaceInfoAndImageShow = ref(false)
  const isFetchDataError = ref(false)
  const isNoFetchDataFirstTime = ref(false)


  const isModalHeaderShow = ref(false)
  const setIsModalHeaderShow = (data) => {
    isModalHeaderShow.value = data
  }

  const activeMenu = ref('deals')
  function setActiveMenu (data)  {
    activeMenu.value = data
  }

  watch(inputDataFixed,async (newData,oldData) => {
    isLoadDealsShow.value = true
    isLoadPlaceInfoAndImageShow.value = true
    isFetchDataError.value = false
    isNoFetchDataFirstTime.value = false

    const url = `https://project-technical-test-api.up.railway.app/property/content?id=${inputDataFixed.value.id}&include=general_info&include=important_info&include=image`
    console.log("url 123 = ",url)
    const responsePlaceInfoSummary = (await $fetch(url))[inputDataFixed.value.id]
    console.log("responsePlaceInfoSummary 123 = ",responsePlaceInfoSummary)
    infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)
    isLoadPlaceInfoAndImageShow.value = false
  })
  

  await onMounted(async() => {
    try{
      isLoadDealsShow.value = true
      isLoadPlaceInfoAndImageShow.value = true
      isFetchDataError.value = false
      isNoFetchDataFirstTime.value = false

      const param_url_name = route.query.name
      const param_url_address = route.query.address
      const param_url_id = route.query.id
      const param_url_checkin = route.query.checkin
      const param_url_chekcout = route.query.checkout
      const param_url_total_guest = route.query.total_guest
      const param_url_total_room = route.query.total_room
      if(param_url_id && param_url_checkin && param_url_chekcout && param_url_total_guest && param_url_total_room){
        
        inputDataFixed.value = {
          id:param_url_id, 
          name:param_url_name,
          address:param_url_address,
          date:{
            start:new Date(param_url_checkin),
            end:new Date(param_url_chekcout)
          },
          checkIn:new Date(param_url_checkin),
          checkOut:new Date(param_url_chekcout),
          totalGuest:param_url_total_guest,
          totalRoom:param_url_total_room
        }
        
      }
      else{
        isNoFetchDataFirstTime.value = true
        isLoadPlaceInfoAndImageShow.value = false
      }
    }
    catch(err){
      console.log("error = ",err)
      isFetchDataError.value = true
      isLoadPlaceInfoAndImageShow.value = false
    }
  })

  
</script>

<template>
    <IndexHeader 
      :isModalHeaderShow="isModalHeaderShow",
      :setIsModalHeaderShow="setIsModalHeaderShow"
      :inputDataFixed="inputDataFixed"
      :setInputDataFixed="setInputDataFixed"
    />
    <div v-if="isNoFetchDataFirstTime">
      <div class="flex w-full flex-col p-20 h-svh  justify-start items-center">
          <FontAwesomeIcon class="w-8 h-8 md:w-10 md:h-10"  :icon="['fas', 'magnifying-glass']" />
          <h1 class="mt-5 text-base md:text-lg font-light text-center">Wanna go somehere ?, search it and let's go</h1>
      </div>
    </div>
    <div v-else>
      <div v-if="isFetchDataError" class="mt-16 h-svh">
        <CommonLoadError />
      </div>
      <div v-else>
        <IndexPlaceInfoSummary 
          :isLoadPlaceInfoAndImageShow="isLoadPlaceInfoAndImageShow" 
        />
        <IndexPlaceSectionNav :setActiveMenu="setActiveMenu" :activeMenu="activeMenu" />
        <IndexPlaceGeneralInfo 
          :isLoadPlaceInfoAndImageShow="isLoadPlaceInfoAndImageShow" 
          v-if="activeMenu == 'info'" 
        />
        <IndexPlaceGalleryPhotos 
          :isLoadPlaceInfoAndImageShow="isLoadPlaceInfoAndImageShow"
          :isModalImageShow="isModalImageShow"
          :setIsModalImageShow="setIsModalImageShow"
          v-if="activeMenu == 'photos' && infoPlaceStore.infoPlace" 
        />
        <IndexPlaceDeals :isLoadDealsShow="isLoadDealsShow"  v-if="activeMenu == 'deals'" />
      </div>
    </div>
    <CommonFooter/>
</template>


