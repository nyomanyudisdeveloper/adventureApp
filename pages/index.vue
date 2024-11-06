<script setup lang="ts">
 
  import '~/assets/css/main.css'
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { useIndexHeaderStore } from '~/store/index/indexHeaderStore';
  import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';

  const route = useRoute()
  library.add(fas);
  const indexHeaderStore = useIndexHeaderStore()
  const infoPlaceStore = useInfoPlaceStore()

  const url_params = ref({
    id:"9000248394", 
    name:"Fairmont Jakarta",
    address:"Jakarta, Indonesia",
    checkIn:"2024-11-05",
    checkOut:"2024-11-06",
    totalGuest:3,
    totalRoom:1
  })

  const isLoadDealsShow = ref(false)
  const isLoadPlaceInfoAndImageShow = ref(false)
  const isFetchDataError = ref(false)


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
      var data = {
        id:"9000248394", 
        name:"Fairmont Jakarta",
        address:"Jakarta, Indonesia",
        checkIn:"2024-11-12",
        checkOut:"2024-11-15",
        totalGuest:3,
        totalRoom:1
      }

      const param_url_name = route.query.name
      const param_url_address = route.query.address
      const param_url_id = route.query.id
      const param_url_checkin = route.query.checkin
      const param_url_chekcout = route.query.checkout
      const param_url_total_guest = route.query.total_guest
      const param_url_total_room = route.query.total_room
      if(param_url_id && param_url_checkin && param_url_chekcout && param_url_total_guest && param_url_total_room){
        
          data = {
            id:param_url_id, 
            name:param_url_name,
            address:param_url_address,
            checkIn:param_url_checkin,
            checkOut:param_url_chekcout,
            totalGuest:param_url_total_guest,
            totalRoom:param_url_total_room
          }
          indexHeaderStore.setUrlParamData(data)

          
          const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${param_url_id}&include=general_info&include=important_info&include=image`))[param_url_id]
          infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)
          isLoadPlaceInfoAndImageShow.value = false
          
          // Will use it later for Deals Page
          // const responsePlaceAvailability = await $fetch(`https://project-technical-test-api.up.railway.app/stay/availability/${param_url_id}?checkin=${param_url_checkin}&checkout=${param_url_chekcout}&guest_per_room=${param_url_total_guest}&number_of_room=${param_url_total_room}`)
          // placeStore.setListAvailibility(responsePlaceAvailability.offer_list)
          // isLoadDealsShow.value = false
        
      }
      else{
          indexHeaderStore.setUrlParamData(data)

          const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${data.id}&include=general_info&include=important_info&include=image`))[data.id]
          infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)
          isLoadPlaceInfoAndImageShow.value = false
          
          // Will use it later for Deals Page
          // const responsePlaceAvailability = await $fetch(`https://project-technical-test-api.up.railway.app/stay/availability/${data.id}?checkin=${data.checkIn}&checkout=${data.checkOut}&guest_per_room=${data.totalGuest}&number_of_room=${data.totalRoom}`)
          // placeStore.setListAvailibility(responsePlaceAvailability.offer_list)
          // isLoadDealsShow.value = false
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
      :url_params="url_params"
    />
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
    <CommonFooter/>
</template>


