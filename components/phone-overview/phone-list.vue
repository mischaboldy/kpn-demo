<template>
  <div class="phone-grid">
    <phone-tile v-for="phone in phones" :phone="phone" :key="phone.id" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { PhoneService } from '~/api/PhoneService'
import { PhoneInterface } from '~/interfaces/PhoneInterface'
import PhoneTile from '~/components/phone-overview/phone-tile.vue'

export default Vue.extend({
  components: { PhoneTile },
  props: {
    phones: {
      type: Array as PropType<PhoneInterface[]>,
      default: [],
    },
  },
})
</script>

<style scoped lang="scss">
.phone-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}

@media (max-width: 768px) {
  .phone-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .phone-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
