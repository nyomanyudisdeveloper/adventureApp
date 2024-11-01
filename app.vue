<script setup lang="ts">
  import '~/assets/css/main.css'
  import { usePlaceStore } from './store/PlaceStore';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { fas } from '@fortawesome/free-solid-svg-icons';

  library.add(fas);

  const placeID = useState("placeID", () => "9000248394")
  const checkin = useState("checkin", () => "2025-03-4")
  const checkout = useState("checkout", () => "2025-03-8")
  const guest_per_room = useState("guest_per_room", () => "2")
  const number_of_room = useState("number_of_room", () => "1")
  const placeStore = usePlaceStore()

  console.log("placeStore.searchSummary = ",placeStore.searchSummary)

  await callOnce(async() => {
    const responsePlaceInfoSummary = (await $fetch(`https://project-technical-test-api.up.railway.app/property/content?id=${placeID.value}&include=general_info`))[placeID.value]
    placeStore.setPlaceInfoSummaryData(responsePlaceInfoSummary)

    const responsePlaceAvailability = await $fetch(`https://project-technical-test-api.up.railway.app/stay/availability/${placeID.value}?checkin=${checkin.value}&checkout=${checkout.value}&guest_per_room=${guest_per_room.value}&number_of_room=${number_of_room.value}`)
    placeStore.setListAvailibility(responsePlaceAvailability.offer_list)
  })

  
</script>

<template>
  
    <HeaderNav />
    <div class="mx-52">
      <PlaceInfoSummary/>
      <PlaceInfoSummary/>
      <PlaceInfoSummary/>
      <PlaceInfoSummary/>
      <PlaceInfoSummary/>
      <PlaceInfoSummary/>
      <PlaceInfoSummary/>
      <!-- <PlaceSectionNav/>
      <PlaceDeals v-if="placeStore.getPlaceSectionNavActive == 'deals'" />
      <PlaceGalleryPhotos v-if="placeStore.getPlaceSectionNavActive == 'photos'" />
      <PlaceGeneralInfo v-if="placeStore.getPlaceSectionNavActive == 'info'" /> -->
    </div>
</template>
