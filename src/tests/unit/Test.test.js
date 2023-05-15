import { shallowMount } from '@vue/test-utils'
import New from '@/components/New.vue'

describe('New.vue', () => {
  let wrapper
  const mockPending = [{ id: 0, title: 'Test todo', done: false }]
  const mockCompleted = [{ id: 1, title: 'Test completed todo', done: true }]

  beforeEach(() => {
    wrapper = shallowMount(New, {
      data() {
        return {
          newList: mockPending.concat(mockCompleted),
          new_item: 'Test new item',
          showComplete: false,
        }
      },
    })
  })

  it('renders a todo list title', () => {
    const title = wrapper.find('.todo-title')
    expect(title.text()).toBe('To-do List')
  })

  it('renders a form to add a new todo', () => {
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)
  })

  it('adds a new item to the todo list', async () => {
    const input = wrapper.find('.input-todo')
    await input.setValue('Test new item')
    const addButton = wrapper.find('.btnn-add')
    await addButton.trigger('click')
    expect(wrapper.vm.newList.length).toBe(3)
    expect(wrapper.vm.newList[0].title).toBe('Test new item')
  })

  it('removes an item from the todo list', async () => {
    const deleteButton = wrapper.find('.delete')
    await deleteButton.trigger('click')
    expect(wrapper.vm.newList.length).toBe(1)
    expect(wrapper.vm.newList[0].title).toBe('Test completed todo')
  })

  it('displays the number of pending items', () => {
    const status = wrapper.find('.status')
    expect(status.text()).toContain('1 pending item')
  })

  it('displays the number of completed items', async () => {
    const toggleButton = wrapper.find('.btnn-secondary')
    await toggleButton.trigger('click')
    const status = wrapper.find('.status')
    expect(status.text()).toContain('Completed tasks: 50%')
  })
})
