<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  type: 'primary' | 'warning';
}>()

</script>
<template>
  <Button :class="[props.type]">
    <slot />
  </Button>
</template>