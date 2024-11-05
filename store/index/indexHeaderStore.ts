import { defineStore } from "pinia"
import {convertTwoDateStringToStringDisplay} from "../../utils/dateUtils"

export const useIndexHeaderStore = defineStore("IndexHeaderStore",{
    state: () => {
        return {
            url_param_data:{
                id:"",
                name:"",
                address:"",
                checkIn:"",
                checkOut:"",
                totalGuest:1,
                totalRoom:1
            },
            input_place_header_desc:"",
            input_place_header_data:{
                id:"",
                name:"",
                address:""
            }, 
            input_date_header_data:{
                start:new Date(),
                end:new Date()
            },
            input_total_room_header_data:1,
            input_total_guest_header_data:1
        }
    },
    getters: {
        inputTotalRoomHeaderData:(state) => {
            return state.input_total_room_header_data
        },
        inputTotalGuestHeaderData:(state) => {
            return state.input_total_guest_header_data
        },
        urlParamData:(state)=> {
            return state.url_param_data
        },
        stayInputHeaderValue:(state) => {
            const display_date = convertTwoDateStringToStringDisplay(state.url_param_data.checkIn,state.url_param_data.checkOut)
            if(state.url_param_data.name == ""){
                return "Find your place to stay"
            }
            return `${state.url_param_data.name} . ${display_date}`
        },
        inputPlaceHeaderDesc:(state)=> {
            return state.input_place_header_desc
        },
        inputPlaceHeaderData:(state) => {
            return state.input_place_header_data
        },
        inputDateHeaderData:(state) => {
            return state.input_date_header_data
        }
    },
    actions:{
        setInputTotalRoomHeaderData(data){
            this.input_total_room_header_data = data
        },
        setInputTotalGuestHeaderData(data){
            this.input_total_guest_header_data = data
        },
        setUrlParamData(data){
            this.url_param_data = data
        },
        setInputPlaceHeaderDesc(data){
            this.input_place_header_desc = data
        },
        setInputPlaceHeaderData(data){
            this.input_place_header_data = data
        },
        setInputDateHeaderData(data){
            this.input_date_header_data = data
        }
    }
})