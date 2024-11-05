<script setup lang="ts">
 
  import '~/assets/css/main.css'
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { useIndexHeaderStore } from '~/store/index/indexHeaderStore';
  import { useInfoPlaceStore } from '~/store/index/infoPlaceStore';
  import { useIndexNavStore } from '~/store/index/indexNavStore';
  import { useIndexGalleryStore } from '~/store/index/indexGalleryStore';
import { usePlaceStore } from '~/store/PlaceStore';

  const route = useRoute()
  library.add(fas);
  const indexHeaderStore = useIndexHeaderStore()
  const infoPlaceStore = useInfoPlaceStore()
  const indexNavStore = useIndexNavStore()
  const indexGalleryStore = useIndexGalleryStore()
  const placeStore = usePlaceStore()

  const url_params = ref({
    id:"9000248394", 
    name:"Fairmont Jakarta",
    address:"Jakarta, Indonesia",
    checkIn:"2024-11-05",
    checkOut:"2024-11-06",
    totalGuest:3,
    totalRoom:1
  })

  await onMounted(async() => {
    var data = {
      id:"9000248394", 
      name:"Fairmont Jakarta",
      address:"Jakarta, Indonesia",
      checkIn:"2024-11-05",
      checkOut:"2024-11-06",
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
      try{
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
        indexGalleryStore.setListImage(responsePlaceInfoSummary.image)

        const responsePlaceAvailability = await $fetch(`https://project-technical-test-api.up.railway.app/stay/availability/${param_url_id}?checkin=${param_url_checkin}&checkout=${param_url_chekcout}&guest_per_room=${param_url_total_guest}&number_of_room=${param_url_total_room}`)
        placeStore.setListAvailibility(responsePlaceAvailability.offer_list)
      }
      catch(err){
        // console.log("Index err onMount = ",err)
        // const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${data.id}&include=general_info&include=important_info&include=image`))[data.id]
        // infoPlaceStore.setInfoSummary(responsePlaceInfoSummary)
      }
    }
    else{
      indexHeaderStore.setUrlParamData(data)
      const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${data.id}&include=general_info&include=important_info&include=image`))[data.id]
      infoPlaceStore.setInfoPlace(responsePlaceInfoSummary)
      indexGalleryStore.setListImage(responsePlaceInfoSummary.image)

      const responsePlaceAvailability = await $fetch(`https://project-technical-test-api.up.railway.app/stay/availability/${data.id}?checkin=${data.checkIn}&checkout=${data.checkOut}&guest_per_room=${data.totalGuest}&number_of_room=${data.totalRoom}`)
      console.log("responsePlaceAvailability.offer_list = ",responsePlaceAvailability.offer_list)
      placeStore.setListAvailibility(responsePlaceAvailability.offer_list)
    }
  })

  
</script>

<template>
    <IndexHeader :url_params="url_params"/>
    <IndexPlaceInfoSummary v-if="infoPlaceStore.infoPlace" />
    <IndexPlaceSectionNav v-if="infoPlaceStore.infoPlace"/>
    <IndexPlaceGeneralInfo v-if="indexNavStore.activeMenu == 'info' && infoPlaceStore.infoPlace" />
    <IndexPlaceGalleryPhotos v-if="indexNavStore.activeMenu == 'photos' && infoPlaceStore.infoPlace" />
    <IndexPlaceDeals v-if="indexNavStore.activeMenu == 'deals' && infoPlaceStore.infoPlace" />
    <!-- <PlaceDeals v-if="placeStore.getPlaceSectionNavActive == 'deals'" />
    <PlaceGalleryPhotos v-if="placeStore.getPlaceSectionNavActive == 'photos'" /> -->
    <CommonFooter/>
</template>


