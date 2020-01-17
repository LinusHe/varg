import { mount } from '@vue/test-utils'
import Controls from '../../src/components/Controls.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Controls', () => {
  
  const wrapper = mount(Controls)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class=\"row align-center\">')
  })

  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  /*it('save button click should increment the count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })*/
})
