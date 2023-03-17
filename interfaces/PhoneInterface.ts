import { VariantInterface } from '~/interfaces/VariantInterface'

export interface PhoneInterface {
  id: number
  name: string
  slug: string
  manufacturer: string
  model: string
  operating_system: string
  sim_card_capacity: string
  refurbished: boolean
  has_usp: boolean
  has_5g: boolean
  has_esim: boolean
  colors: string
  sort_order: number
  release_date: string
  default: string
  variants: VariantInterface[]
  attributes: {
    handset_cat_promotion_sticker: null
    promotion_label: string
    promotion_slider_source: string
    promotion_bg_color: string
    handset_cat_promotion_sticker_kz: null
    promotion_label_kz: null
    promotion_slider_source_kz: null
    promotion_bg_color_kz: null
  }
  has_promotion: boolean
}
