import { defineComponent } from 'vue'
const RenderVnode = defineComponent({
  props: {
    node: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return () => props.node
  }
})

export default RenderVnode
