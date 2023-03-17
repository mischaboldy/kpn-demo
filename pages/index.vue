<template>
  <div class="page">
    <div class="content">
      <h1 class="title">
        <span class="light">Keuze uit</span>
        {{ filteredPhones.length }} telefoon{{
          filteredPhones.length > 1 ? 's' : ''
        }}
      </h1>
      <phone-filters :filters="filters" />
      <phone-list :phones="filteredPhones" class="phone-list" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PhoneService } from '~/api/PhoneService'
import { PhoneInterface } from '~/interfaces/PhoneInterface'
import { FilterHelper } from '~/helpers/FilterHelper'
import { FilterInterface } from '~/interfaces/filter/FilterInterface'

export default Vue.extend({
  data() {
    return {
      phones: <PhoneInterface[]>[],
      filteredPhones: <PhoneInterface[]>[],
      filters: <FilterInterface[]>[],
    }
  },
  async fetch(): Promise<void> {
    const phoneService = new PhoneService(this.$config)
    const phones = await phoneService.getPhones()
    this.phones = phones
    this.filters = FilterHelper.extractFiltersAndValues(phones)
    this.filterPhones()
  },
  watch: {
    '$route.query'() {
      this.filterPhones()
    },
  },
  methods: {
    filterPhones() {
      this.filteredPhones = FilterHelper.filterPhones(
        this.phones,
        this.$route.query
      )
    },
  },
})
</script>

<style scoped lang="scss">
.light {
  font-weight: 300;
}

.phone-list {
  margin-top: 16px;
}

.title {
  margin-top: 24px;
  color: #090;
  font-size: 44px;
  line-height: 40px;

  @media (max-width: 769px) {
    font-size: 30px;
  }
}

.page {
  display: flex;
  justify-content: center;
  position: relative;
  min-height: calc(100vh - 190px);
}

.content {
  width: 1168px;

  //display: flex;
  //flex-direction: column;
  //align-items: center;

  @media (max-width: 1168px) {
    margin: 0 32px;
  }
}
</style>
