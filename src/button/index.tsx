// Button.tsx
import { defineComponent } from 'vue'

export interface IButton {
  name: String;
}

export default defineComponent({
  name: 'MyButton',
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <button 
        style={{ backgroundColor: props.color }}
        onClick={() => emit('click', 'clicked!')}
      >
        Click Me
      </button>
    )
  }
})