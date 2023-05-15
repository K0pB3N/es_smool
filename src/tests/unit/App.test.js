import { shallowMount } from '@vue/test-utils'
import App from './App.vue'

describe('App', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.exists()).toBe(true)
  })

  test('contains a router-view component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })

  test('contains a vue-page-transition component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.findComponent({ name: 'VuePageTransition' }).exists()).toBe(
      true
    )
  })
})
