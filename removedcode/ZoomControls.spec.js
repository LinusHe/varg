/*
import Vue from "vue"
import Vuetify from "vuetify"

import ZoomControls from "@/components/ZoomControls.vue"

import {
    mount,
    createLocalVue,
} from "@vue/test-utils"

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('ZoomControls.vue', () => {
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('should be div', () =>{
        const wrapper = mount(ZoomControls, {
            localVue,
            vuetify,
        })
        const div = wrapper.find('div')
        expect(div.is('div')).toBe(true)
        const button =wrapper.find('div > .v-tooltip > .v-btn')
        expect(button.is('.v-btn')).toBe(true)
        
    })

    it('should center the graph', () =>{
    })
})*/