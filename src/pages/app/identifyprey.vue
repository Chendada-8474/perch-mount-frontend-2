<template>
  <IdentifyPreyView :query="query"></IdentifyPreyView>
</template>
<script setup lang="ts">
import IdentifyPreyView from '@/components/views/IdentifyPreyView.vue'
import { useUnidentifiedIndividualsQuery } from '@/utils/urlParse'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = useUnidentifiedIndividualsQuery(route)
</script>
