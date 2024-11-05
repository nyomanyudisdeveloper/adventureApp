import { defineStore } from "pinia"

export const useInfoPlaceStore = defineStore("InfoStore",{
    state: () => {
        return {
            info_place:undefined
        }
    },
    getters: {
        infoPlace:(state) => { return state.info_place },
        aboutInList:(state) => {
            var listInfo = []
            listInfo.push(state.info_place.general_info.descriptions.location)
            listInfo.push(state.info_place.general_info.descriptions.dining)
            listInfo.push(state.info_place.general_info.descriptions.amenities)
            return listInfo
        },
        languagesDesc:(state) => {
            const spoken_languages = state.info_place.general_info.spoken_languages
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
        checkInTime:(state) => {return state.info_place.important_info.checkin.begin_time},
        checkOutTime:(state) => {return state.info_place.important_info.checkout.time},
        additionalCheckInInfoInStringHTML:(state) => {
            var htmlString = state.info_place.important_info.checkin.instructions
            htmlString = htmlString.slice(0,3)+" class='list-disc px-4' "+htmlString.slice(3)
            
            return htmlString
        },
        otherPolicyInfoInStringHTMl:(state) => {
            var htmlString =  state.info_place.important_info.policies.know_before_you_go
            htmlString = htmlString.slice(0,3)+" class='list-disc px-4' "+htmlString.slice(3)
            
            return htmlString
        },
        feeOptionalInfoInStringHTML:(state) => {
            var htmlString =  state.info_place.important_info.fees.optional
            htmlString = htmlString.slice(0,3)+" class='list-disc px-4' "+htmlString.slice(3)
            
            return htmlString
        },
        listImageGallery:(state)=> {
            return state.info_place.image
        },
        infoPlaceName: (state) => {return state.info_place.name},
        infoPlaceRatingStarInList: (state) => {
            var listRatingStar = []
            const star_rating = state.info_place.catalog.star_rating
            const non_star_rating = 5 - star_rating
            for(let i=0;i<star_rating;i++){
                listRatingStar.push(true)
            }
            for(let i=0;i<non_star_rating;i++){
                listRatingStar.push(false)
            }
            return listRatingStar
        },
        infoPlaceSummaryType: (state) => {return state.info_place.type },
        infoPlaceAddress: (state) => {return `${state.info_place.address_line} ${state.info_place.name_suffix} ${state.info_place.catalog.postal_code}`},
        reviewRatingDesc: (state) => {
            const rating = state.info_place.catalog.review_rating
            var result = "Bad"
            if(rating >= 90){
                result = "Excellent"
            }
            else if(rating >= 70 ){
                result = "Good"
            }
            return result
        },
        totalReviews: (state) => {return `${state.info_place.catalog.review_count} reviews`},
        infoPlaceImageSummary: (state) => { return `${state.info_place.catalog.hero_image_url.ori}`}
    },
    actions:{
        setInfoPlace(data) {this.info_place = data }
    }
})