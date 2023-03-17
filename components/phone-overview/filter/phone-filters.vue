<template>
  <div class="filter-container">
    <div class="selectable-filters">
      <filter-component
        v-for="filter in filters"
        :key="filter.filterKey"
        :filter="filter"
      />
    </div>
    <div class="selected-filters">
      <div
        v-for="selectedFilter in selectedFilters"
        class="selected-filter"
        @click="removeSelectedFilter(selectedFilter)"
      >
        {{ selectedFilter.filter }}: {{ selectedFilter.filterValue }}
        <img src="~/assets/icons/Close.svg" alt="chevron-down" class="close" />
      </div>
      <button
        v-show="selectedFilters.length > 1"
        class="remove-all-button"
        @click="resetFilters"
      >
        Alle filters verwijderen
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FilterInterface } from '~/interfaces/filter/FilterInterface'
import FilterComponent from '~/components/phone-overview/filter/filter-component.vue'
import { SelectedFilterInterface } from '~/interfaces/filter/SelectedFilterInterface'

export default Vue.extend({
  components: { FilterComponent },
  props: {
    filters: {
      type: Array as PropType<FilterInterface[]>,
      default: [],
    },
  },
  computed: {
    selectedFilters(): SelectedFilterInterface[] {
      let selectedFilters: SelectedFilterInterface[] = []

      Object.keys(this.$route.query).forEach((queryKey) => {
        const selectedValues = (this.$route.query[queryKey] as string)?.split(
          ','
        )
        selectedValues.forEach((selectedValue) =>
          selectedFilters.push({
            filter: queryKey,
            filterValue: selectedValue,
          })
        )
      })

      return selectedFilters
    },
  },
  methods: {
    resetFilters() {
      this.$router.push({})
    },
    removeSelectedFilter(selectedFilter: SelectedFilterInterface) {
      const query = Object.assign({}, this.$route.query)
      const filterValuesArray = (query[selectedFilter.filter] as string).split(
        ','
      )

      filterValuesArray.splice(
        filterValuesArray.indexOf(selectedFilter.filterValue),
        1
      )
      filterValuesArray.length
        ? (query[selectedFilter.filter] = filterValuesArray.join(','))
        : delete query[selectedFilter.filter]

      this.$router.push({ query })
    },
  },
})
</script>

<style scoped lang="scss">
.selectable-filters {
  display: flex;
  row-gap: 8px;
  column-gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 769px) {
    row-gap: 0;
  }
}

.selected-filters {
  display: flex;
  row-gap: 8px;
  column-gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 769px) {
    row-gap: 0;
  }
}

.selected-filter {
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  display: flex;
  align-items: center;

  .close {
    margin-left: 8px;
  }

  &:hover {
    cursor: pointer;
  }
}

.remove-all-button {
  align-self: center;
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  background-color: #fff;
  height: 100%;
  color: #000;
  transition: box-shadow 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 5px 10px -8px rgb(0 0 0 / 75%);
  }
}
</style>
