import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons, BModal, BButton, BContainer } from 'bootstrap-vue'
import BTableColumnsPicker from '../BTableColumnsPicker.vue'

test('renders a modal with the column picker that emits events', async () => {
  const localVue = createLocalVue()
  localVue.use(BootstrapVue)
  localVue.use(BootstrapVueIcons)
  const wrapper = mount(BTableColumnsPicker, {
    localVue,
    attachTo: document.body,
    propsData: {
      id: 'picker-id',
      currentColumns: ['c2', 'c3'],
      allColumns: ['c1', 'c2', 'c3', 'c4']
    }
  })
  const modal = wrapper.findComponent(BModal)
  expect(modal.exists()).toBe(true)
  expect(wrapper.findComponent(BContainer).exists()).toBe(true)

  const buttons = wrapper.findAllComponents(BButton)
  expect(buttons).toHaveLength(6)

  // Simulating showing and closing the modal
  modal.vm.$emit('show')
  modal.vm.$emit('ok')

  expect(wrapper.emitted().apply[0][0]).toEqual(['c2', 'c3'])
})
