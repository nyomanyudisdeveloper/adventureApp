<script setup lang="ts">
 
  import '~/assets/css/main.css'
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { useIndexHeaderStore } from '~/store/index/indexHeaderStore';
  import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  const route = useRoute() 
  library.add(fas); 
  const indexHeaderStore = useIndexHeaderStore()
  const infoPlaceStore = useInfoPlaceStore()
  
  const formatDate = (date) => { 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const formatDateNow = formatDate(new Date());

  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const formatNextDate = formatDate(nextDate);

  const inputDataFixed = ref({
    id:"", 
    name:"Fairmont Jakarta",
    address:"Jakarta,Indonesia",
    checkIn:formatDateNow,
    checkOut:formatNextDate,
    totalGuest:0,
    totalRoom:0
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
          checkIn:param_url_checkin,
          checkOut:param_url_chekcout,
          totalGuest:param_url_total_guest,
          totalRoom:param_url_total_room
        }
        
        
        const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${param_url_id}&include=general_info&include=important_info&include=image`))[param_url_id]
        infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)
        isLoadPlaceInfoAndImageShow.value = false
        
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


