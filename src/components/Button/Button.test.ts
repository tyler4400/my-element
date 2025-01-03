import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '@/components/Icon/Icon.vue'

describe(Button, () => {
  test('renders correctly', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary'},
      slots: { default: 'test button'}
    })
	  console.log(wrapper.html())
	  expect(wrapper.classes()).toContain('vk-button--primary')
	  expect(wrapper.get('button').text()).toBe('test button')

	  wrapper.get('button').trigger('click')
	  console.log(wrapper.emitted())
	  expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'disabled button' }
    })
    // attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: { icon: 'star' },
      slots: { default: 'icon button' },
	    global: { stubs: ['FontAwesomeIcon'] }
    })
	  console.log(wrapper.html())
	  expect(wrapper.get('i').classes()).toContain('vk-icon')
	  const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
	  expect(iconElement.attributes('icon')).toBe('star')
  })

  test('loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'loading button' },
	    global: { stubs: ['Icon'] }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
