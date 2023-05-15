import { shallowMount } from '@vue/test-utils'
import Important from '@/components/Important.vue'

describe('Important', () => {
  it('displays a list of tasks', () => {
    const wrapper = mount(Important)
    const pendingTasks = wrapper.findAll('.todo-text')
    expect(pendingTasks.length).toBeGreaterThan(0)
  })
})