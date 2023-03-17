<template>
  <div>
    <div v-for="phone in phones">
      {{ phone.id }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PhoneService } from '~/api/PhoneService'
import { PhoneInterface } from '~/interfaces/PhoneInterface'

export default Vue.extend({
  name: 'PhoneOverViewPage',
  data() {
    return {
      phones: <PhoneInterface[]>[],
    }
  },
  async fetch(): Promise<void> {
    const phoneService = new PhoneService(this.$config)
    this.phones = await phoneService.getPhones()
  },
})
</script>
