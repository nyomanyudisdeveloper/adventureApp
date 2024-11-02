import { defineStore } from "pinia"
import {convertTwoDateStringToStringDisplay} from "../utils/dateUtils"

export const usePlaceStore = defineStore("PlaceStore",{
    state: () => {
        return {
            placeInfoSummaryData:{},
            placeSectionNavActive:"deals",
            list_availability:[],
            search_place:{
                "name":"Fairmont Jakarta",
                "address":"",
                "id":"9000248394"
            },
            search_checkin:"2025-03-04",
            search_checkout:"2025-03-08",
            search_total_guests:1,
            search_total_room:1,
            is_search_header_nav_clicked:false
        }
    },
    getters: {
        searchSummary:(state) => {
            const display_date = convertTwoDateStringToStringDisplay(state.search_checkin,state.search_checkout)
            return `${state.search_place.name} . ${display_date}`
        },
        placeInfoSummaryName:(state) => {
            return state.placeInfoSummaryData.name 
        },
        placeInfoSummaryType:(state) => {
            return state.placeInfoSummaryData.type
        },
        placeInfoSummaryRatingStar:(state) => {
            var listRatingStar = []
            const star_rating = state.placeInfoSummaryData.catalog.star_rating
            const non_star_rating = 5 - star_rating
            for(let i=0;i<star_rating;i++){
                listRatingStar.push(true)
            }
            for(let i=0;i<non_star_rating;i++){
                listRatingStar.push(false)
            }
            return listRatingStar
        },
        reviewRatingDescription:(state) => {
            const rating = state.placeInfoSummaryData.catalog.review_rating
            var result = "Bad"
            if(rating >= 90){
                result = "Excellent"
            }
            else if(rating >= 70 ){
                result = "Good"
            }
            return result
        },
        placeInfoSummaryAddress:(state) => {
            return `${state.placeInfoSummaryData.address_line} ${state.placeInfoSummaryData.name_suffix} ${state.placeInfoSummaryData.catalog.postal_code}`
        },
        placeInfoSummaryTotalReviews:(state) => {
            return `${state.placeInfoSummaryData.catalog.review_count} reviews`
        },
        placeInfoSummaryImage:(state) => {
            return `${state.placeInfoSummaryData.catalog.hero_image_url.ori}`
        },
        placeGeneralInfoAbout:(state) => {
            var listInfo = []
            listInfo.push(state.placeInfoSummaryData.general_info.descriptions.location)
            listInfo.push(state.placeInfoSummaryData.general_info.descriptions.dining)
            listInfo.push(state.placeInfoSummaryData.general_info.descriptions.amenities)
            return listInfo
        },
        placeGeneralInfoLanguages:(state) => {
            const spoken_languages = state.placeInfoSummaryData.general_info.spoken_languages
            var list_languages = ""
            var length_languages = Object.keys(spoken_languages).length
            for(const key in spoken_languages){
                if(length_languages != 1){
                    list_languages += spoken_languages[key].name + ", "
                }
                else{
                    list_languages += spoken_languages[key].name + "."
                }
                length_languages--
            }
            return list_languages
        },
        getPlaceSectionNavActive:(state)=>{
            return state.placeSectionNavActive
        }, 
        listAvailibility:(state)=> {
            return state.list_availability
        }
    },
    actions:{
        setPlaceInfoSummaryData(data){
            this.placeInfoSummaryData = data
        },
        setPlaceSectionNavActive(data){
            this.placeSectionNavActive = data
        },
        setListAvailibility(data){
            function compare( a, b ) {
                // if ( a.room_name < b.room_name ){
                //     return -1;
                // }
                // if ( a.room_name > b.room_name ){
                //     return 1;
                // }
                // return 0;
                // return a.pricing_data.net_rate_nightly_with_bonus - b.pricing_data.net_rate_nightly_with_bonus || a.room_name.localeCompare(b.room_name)  ;
                return a.room_name.localeCompare(b.room_name) || a.pricing_data.net_rate_nightly_with_bonus - b.pricing_data.net_rate_nightly_with_bonus ;
            }
            data.sort(compare)
            this.list_availability = data
        },
        setIsSearchNavClicked(){
            this.is_search_header_nav_clicked = !this.is_search_header_nav_clicked
        }
    }
})