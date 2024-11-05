import { defineStore } from "pinia"

export const useIndexNavStore = defineStore("IndexNavStore",{
    state: () => {
        return {
            active_menu:"info",
            is_modal_image_show:false,
            index_selected_image:0
        }
    },
    getters: {
        activeMenu:(state) => {return state.active_menu},
        isModalImageShow:(state) => {return state.is_modal_image_show}
    },
    actions:{
        setActiveMenu(data) {this.active_menu = data },
        setIsModalImageShowAndIndex(index) {
            this.is_modal_image_show = !this.is_modal_image_show
            this.index_selected_image = index
        },
        setIndexSelectedImageByCursor(data){
            var index_image = this.index_selected_image
            const total_image = this.placeInfoSummaryData.image.length
            if(index_image + data < 0){
                index_image = total_image - 1
            }
            else if(index_image + data >= total_image){
                index_image = 0
            }
            else{
                index_image += data
            }
            this.index_image_selected = index_image
        }
    }
})  