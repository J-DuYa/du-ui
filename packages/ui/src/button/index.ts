import { withInstall } from './../utils'
import _Button from './index.vue'

export const DuButton = withInstall(_Button)
export default DuButton


declare module 'vue' {
  export interface GlobalComponents {
    DuButton: typeof DuButton
  }
}