<template>
  <div class="tile" v-if="phone">
    <div class="color-selector">
      <button
        v-for="(color, index) in phone.colors"
        class="orb"
        :class="colorMap[color]"
        @click="changeColor(index)"
      />
    </div>
    <h2 class="title">{{ phone.manufacturer }}</h2>
    <h3 class="sub-title">{{ phoneName }}</h3>
    <div class="image-container">
      <img :src="imageSource" :alt="phone.name" class="phone-image" />
      <div
        v-if="phone.has_promotion"
        class="promotion-container"
        :class="phone.attributes.promotion_bg_color"
      >
        <p class="promotion-text">{{ phone.attributes.promotion_label }}</p>
      </div>
    </div>
    <button class="view-button">Bekijk</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { PhoneService } from '~/api/PhoneService'
import { PhoneInterface } from '~/interfaces/PhoneInterface'

const idMap = {
  0: 6043830,
  1: 6043829,
  2: 6043827,
  3: 8649599,
  4: 6043823,
}

export default Vue.extend({
  props: {
    phone: {
      type: Object as PropType<PhoneInterface>,
      required: true,
    },
  },
  data() {
    return {
      colorMap: {
        BLAUW: 'blue',
        ROZE: 'pink',
        GOUD: 'gold',
        GRIJS: 'grey',
        ZILVER: 'silver',
        ROOD: 'red',
        GRAFIET: 'graphite',
        WIT: 'white',
        GEEL: 'yellow',
        GROEN: 'green',
        PAARS: 'purple',
        ZWART: 'black',
        VIOLET: 'violet',
        MINT: 'mint',
        CREME: 'creme',
        'MAGIC BLUE': 'magic-blue',
        'DARK PEARL': 'dark-pearl',
        'ELECTRIC GRAPHITE': 'electric-graphite',
      },
      imageSource:
        'https://www.kpn.com/shop/cdn/products/_/product_6043830_main.png',
    }
  },
  methods: {
    changeColor(index: number) {
      this.imageSource = `https://www.kpn.com/shop/cdn/products/_/product_${
        idMap[index as keyof typeof idMap]
      }_main.png`
    },
  },
  computed: {
    phoneName(): string {
      return this.phone.name.substr(this.phone.name.indexOf(' ') + 1)
    },
  },
})
</script>

<style scoped lang="scss">
.tile {
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  transition: box-shadow 0.35s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 10px 10px 39px -23px rgba(0, 0, 0, 0.75);
  }
}

.color-selector {
  display: flex;
  position: absolute;
  flex-direction: column;
  right: 16px;
  gap: 8px;
  z-index: 10;

  .orb {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
    border: 0.5px solid #e3e3e3;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }

    &.blue {
      background-color: blue;
    }

    &.pink {
      background-color: pink;
    }

    &.gold {
      background-color: gold;
    }

    &.grey {
      background-color: gray;
    }

    &.silver {
      background-color: silver;
    }

    &.black {
      background-color: black;
    }

    &.graphite {
      background-color: darkgray;
    }

    &.white {
      background-color: white;
    }

    &.yellow {
      background-color: yellow;
    }

    &.green {
      background-color: green;
    }

    &.purple {
      background-color: purple;
    }

    &.violet {
      background-color: violet;
    }

    &.creme {
      background-color: palevioletred;
    }

    &.magic-blue {
      background-color: darkblue;
    }

    &.dark-pearl {
      background-color: darksalmon;
    }

    &.electric-graphite {
      background-color: dimgray;
    }

    &.mint {
      background-color: mintcream;
    }
  }
}

.title {
  font-size: 20px;
  line-height: 28px;
  margin: 0;
}

.sub-title {
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  margin: 0 0 18px 0;
}

.image-container {
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.phone-image {
  height: 240px;
  max-width: 100%;
}

.view-button {
  background-color: transparent;
  color: rgb(0, 119, 204);
  border: none;
  padding: 8px;
  font-size: 16px;
}

.view-button:hover {
  cursor: pointer;
  color: rgb(0, 119, 400);
}

.promotion-container {
  position: absolute;
  bottom: 16px;
  left: 0;
  max-width: calc(50% - 10px);
  max-height: 36px;
  background: #f3f3f3;
  padding: 8px 16px;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 4px 5px 0 rgb(0 0 0 / 7%), 0 1px 10px 0 rgb(0 0 0 / 6%),
    0 2px 4px -1px rgb(0 0 0 / 10%);
}

.promotion-container.green {
  background: linear-gradient(50deg, #deff00 0%, #00c300 37%, #00c300 100%);
}

.promotion-text {
  margin: 0;
  line-height: 18px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
