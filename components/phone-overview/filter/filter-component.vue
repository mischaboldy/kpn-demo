<template>
  <div v-if="filter" class="filter">
    <div class="filter-select">
      <p>
        {{ filter.filterLabel }}
        <img
          src="~/assets/icons/Chevron-Down.svg"
          alt="chevron-down"
          class="filter-icon"
        />
      </p>
    </div>
    <div class="gap-block" />
    <div class="filter-dropdown">
      <ul>
        <li
          v-for="filterValue in filter.filterValues"
          :key="filterValue.value"
          role="option"
          class="filter-values"
        >
          <label class="filter-value-label">
            <input
              type="checkbox"
              :checked="isOptionChecked(filterValue.label)"
              @change="toggleFilter($event, filterValue.label)"
            />
            <span class="checkbox-label"
              >{{ filterValue.label }} ({{ filterValue.numberAvailable }})</span
            >
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FilterInterface } from '~/interfaces/filter/FilterInterface'
import { FilterValueInterface } from '~/interfaces/filter/FilterValueInterface'

export default Vue.extend({
  props: {
    filter: {
      type: Object as PropType<FilterInterface>,
      required: true,
    },
  },
  methods: {
    isOptionChecked(filterValueLabel: string): boolean {
      const options = this.$route.query[this.filter.filterLabel]
      return !!options?.includes(filterValueLabel)
    },
    toggleFilter(event: any, label: string) {
      const query = Object.assign({}, this.$route.query)
      const filterId = this.filter.filterLabel
      const isChecked = event.target?.checked

      if (!query[filterId] && isChecked) {
        query[filterId] = label
      } else {
        const filterValuesArray = (query[filterId] as string).split(',')

        if (filterValuesArray.includes(label)) {
          filterValuesArray.splice(filterValuesArray.indexOf(label), 1)
        } else {
          filterValuesArray.push(label)
        }

        filterValuesArray.length
          ? (query[filterId] = filterValuesArray.join(','))
          : delete query[filterId]
      }

      this.$router.push({ query })
    },
  },
})
</script>

<style scoped lang="scss">
.filter {
  position: relative;

  &:hover {
    .filter-dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
}

.filter-select {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  transition: box-shadow 0.15s ease-in-out;

  p {
    display: flex;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 2px 5px 10px -8px rgb(0 0 0 / 75%);
  }
}

.filter-dropdown {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 10;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  transition: opacity 0.35s ease-in-out, opacity 0.35s ease-in-out;
  box-shadow: 0 4px 8px rgb(0 0 0 / 32%);
}

.gap-block {
  height: 8px;
  background-color: transparent;
}

.filter-dropdown {
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
    padding: 0;
  }
}

.filter-value-label {
  display: flex;
  gap: 16px;
}

.filter-values {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.filter-value-label {
  &:hover,
  input:hover {
    cursor: pointer;
    color: #e3e3e3;
  }
}

.checkbox-label {
  white-space: nowrap;
  text-transform: capitalize;
}
</style>
