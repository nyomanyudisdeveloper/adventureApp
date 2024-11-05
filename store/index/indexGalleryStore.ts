import { defineStore } from "pinia"

export const useIndexGalleryStore = defineStore("IndexGalleryStore",{
    state: () => {
        return {
            list_image:[],
            is_modal_image_show:false,
            index_selected_image:0
        }
    },
    getters: {
        isModalImageShow:(state) => {return state.is_modal_image_show},
        indexSelectedImage:(state) => {return state.index_selected_image},
        listImage:(state) => {return state.list_image}
    },
    actions:{
        setIsModalImageShowAndIndex(index) {
            this.is_modal_image_show = !this.is_modal_image_show
            this.index_selected_image = index
        },
        setIndexSelectedImageByCursor(data){
            var index_image = this.index_selected_image
            const total_image = this.list_image.length
            if(index_image + data < 0){
                index_image = total_image - 1
            }
            else if(index_image + data >= total_image){
                index_image = 0
            }
            else{
                index_image += data
            }
            this.index_selected_image = index_image
        },
        setListImage(data){
            this.list_image = data
        }
    }
})  