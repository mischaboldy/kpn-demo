import { FilterValueInterface } from '~/interfaces/filter/FilterValueInterface'

export interface FilterInterface {
  filterLabel: string
  filterKey: string
  filterValues: FilterValueInterface[]
}
