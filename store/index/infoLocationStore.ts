import { defineStore } from "pinia"

export const useInfoLocationStore = defineStore("InfoLocationStore",{
    state: () => {
        return {
            info_location:{
                name:'',
                location_type:'',
                name_suffix:''
            }
        }
    },
    getters: {
        infoLocation:(state) => { return state.info_location },
        name:(state)=> {return state.info_location.name},
        address:(state) => {return state.info_location.name_suffix},
        locationType:(state) => {return state.info_location.location_type}
    },
    actions:{
        setInfoLocation(data) {this.info_location = data },
        reset(){
            this.info_location = {
                name:'',
                location_type:'',
                name_suffix:''
            }
        }
    }
})