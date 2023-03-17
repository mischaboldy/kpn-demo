import { PhoneInterface } from '~/interfaces/PhoneInterface'
import { FilterInterface } from '~/interfaces/filter/FilterInterface'
import { FilterValueInterface } from '~/interfaces/filter/FilterValueInterface'
import { FilterValueType } from '~/types/Types'
import { FilterKeysMapEnum } from '~/enums/FilterKeysMapEnum'
import { YesNoEnum } from '~/enums/YesNoEnum'

const filterKeysMap = {
  [FilterKeysMapEnum.Merk]: 'manufacturer',
  [FilterKeysMapEnum['5G']]: 'has_5g',
  [FilterKeysMapEnum.Besturingssysteem]: 'operating_system',
  [FilterKeysMapEnum.ESim]: 'has_esim',
  [FilterKeysMapEnum.Refurbished]: 'refurbished',
}

export class FilterHelper {
  public static doesPhoneComplyWithFilter(
    phoneValue: FilterValueType,
    filterValues: string[]
  ): boolean {
    let doesPhoneComplyWithFilter = false

    filterValues.forEach((filterValue: string) => {
      if (FilterHelper.getFilterValueLabel(phoneValue) === filterValue) {
        doesPhoneComplyWithFilter = true
      }
    })

    return doesPhoneComplyWithFilter
  }

  public static filterPhones(
    phones: PhoneInterface[],
    query: any
  ): PhoneInterface[] {
    const filteredPhones: PhoneInterface[] = []

    phones.forEach((phone: PhoneInterface) => {
      let keepItem = true

      Object.keys(query).forEach((filterKey: string) => {
        if (!keepItem) return
        const filterValues = query[filterKey]?.split(',')
        const phoneValue =
          phone[
            filterKeysMap[
              filterKey as keyof typeof filterKeysMap
            ] as keyof typeof phone
          ]

        keepItem = FilterHelper.doesPhoneComplyWithFilter(
          phoneValue,
          filterValues
        )
      })

      if (keepItem) filteredPhones.push(phone)
    })

    return filteredPhones
  }

  public static extractFiltersAndValues(
    phones: PhoneInterface[]
  ): FilterInterface[] {
    const filters: FilterInterface[] = []

    Object.keys(filterKeysMap).forEach((filterKey: string) => {
      const attributeKey =
        filterKeysMap[filterKey as keyof typeof filterKeysMap]
      const filter: FilterInterface = {
        filterLabel: filterKey,
        filterKey: attributeKey,
        filterValues: [],
      }

      phones.forEach((phone: PhoneInterface) => {
        const value = phone[attributeKey as keyof typeof phone]

        const existingFilterValue = filter.filterValues.find(
          (filterValue: FilterValueInterface) => filterValue.value === value
        )

        if (existingFilterValue) {
          existingFilterValue.numberAvailable++
        } else {
          filter.filterValues.push({
            value,
            numberAvailable: 1,
            label: FilterHelper.getFilterValueLabel(value),
          })
        }
      })

      filters.push(filter)
    })

    return filters
  }

  private static getFilterValueLabel(value: FilterValueType): string {
    if (value === true) return YesNoEnum.Yes
    if (value === false) return YesNoEnum.No

    return value.toString()
  }
}
