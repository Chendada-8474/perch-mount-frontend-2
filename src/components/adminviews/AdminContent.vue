<template>
  <div v-if="auth.currentUser?.is_admin">
    <slot></slot>
  </div>
  <div v-else>
    <img
      src="https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/ResponseCode/png/403%20Forbidden.png?raw=true"
      alt="403 Forbidden"
    />
  </div>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{ level: 'admin' | 'super' }>()

const auth = useAuth()
</script>
