import { defineStore } from "pinia"

export const useInfoLocationStore = defineStore("InfoLocationStore",{
    state: () => {
        return {
            info_location:{}
        }
    },
    getters: {
        infoLocation:(state) => { return state.info_location },
    },
    actions:{
        setInfoLocation(data) {this.info_location = data }
    }
})