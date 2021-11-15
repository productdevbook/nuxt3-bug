<template>
  <div class="v-button" :class="{ warning, danger, '!min-w-full': fullW }">
    <slot name="prepend-outer" />
    <component
      :is="component"
      v-focus="autofocus"
      :download="download"
      class="button outline-none focus:outline-none"
      :class="[
        sizeClass,
        alignClass,
        iconClass,
        {
          activeClass: isActiveRoute,
          '!rounded-full': rounded,
          outlined,
          loading,
          dashed,
          tile,
          '!min-w-full': fullW,
        },
        kindClass,
      ]"
      :type="type"
      :disabled="disabled"
      :to="to !== '' ? to : undefined"
      :href="href"
      :target="component === 'a' ? '_blank' : undefined"
      :rel="component === 'a' ? 'noopener noreferrer' : undefined"
      @click="onClick"
    >
      <span class="content" :class="{ invisible: loading }">
        <slot v-bind="{ active, toggle }" />
      </span>
      <div v-if="loading" class="spinner">
        <slot v-if="loading" name="loading">
          <AtomHobProgressCircular :kind="kind" :size="size" indeterminate />
        </slot>
      </div>
    </component>
    <slot name="append-outer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { RouteLocation, useRoute, useLink } from 'vue-router'
import { isEqual } from 'lodash'
import useSizeClass, { sizeProps } from '@/composables/size-class'
import { useGroupable } from '@/composables/groupable'
import { notEmpty } from '@/utils/is-empty'

export default defineComponent({
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    kind: {
      type: String as PropType<'normal' | 'info' | 'success' | 'warning' | 'danger' | 'secondary'>,
      default: 'normal',
    },
    fullW: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String, Object] as PropType<string | RouteLocation>,
      default: '',
    },
    href: {
      type: String,
      default: undefined,
    },
    active: {
      type: Boolean,
      default: undefined,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    query: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String],
      default: undefined,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'center',
      validator: (val: string) => ['left', 'center', 'right'].includes(val),
    },
    download: {
      type: String,
      default: undefined,
    },
    ...sizeProps,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const route = useRoute()

    const { route: linkRoute, isActive, isExactActive } = useLink(props)
    const component = computed(() => {
      if (props.disabled) return 'button'
      if (notEmpty(props.href)) return 'a'
      if (props.to) return 'router-link'
      return 'button'
    })

    const { active, toggle } = useGroupable({
      value: props.value,
      group: 'item-group',
    })

    const isActiveRoute = computed(() => {
      if (props.active !== undefined) return props.active

      if (props.to) {
        const isQueryActive = !props.query || isEqual(route.query, linkRoute.value.query)

        if (!props.exact)
          return (isActive.value && isQueryActive) || active.value
        else
          return (isExactActive.value && isQueryActive) || active.value
      }

      return false
    })

    const sizeClass = computed(() => {
      switch (useSizeClass(props).value) {
        case 'xs':
          return 'h-7 text-sm rounded-sm font-medium leading-6'
        case 'sm':
          return 'h-10 text-sm rounded-md font-medium leading-6'
        case 'lg':
          return 'h-12 text-base rounded-md font-medium leading-6'
        case 'xl':
          return 'h-14 text-base rounded-md font-medium leading-6'
        default:
          return ''
      }
    })

    const iconClass = computed(() => {
      if (props.icon) {
        switch (useSizeClass(props).value) {
          case 'xs':
            return 'w-7 p-0 min-w-0'
          case 'sm':
            return 'w-10 p-0 min-w-0'
          case 'lg':
            return 'w-12 p-0 min-w-0'
          case 'xl':
            return 'w-14 p-0 min-w-0'
          default:
            return ''
        }
      }
      else {
        switch (useSizeClass(props).value) {
          case 'xs':
            return 'min-w-[60px] px-3'
          case 'sm':
            return 'min-w-[120px] px-4'
          case 'lg':
            return 'min-w-[154px] px-4'
          case 'xl':
            return 'min-w-[180px] px-4'
          default:
            return ''
        }
      }
    })

    const kindClass = computed(() => {
      if (!props.outlined) {
        switch (props.kind) {
          case 'normal':
            return 'text-white bg-h-green-500 hover:bg-h-green-600 border-h-green-500'
          case 'success':
            return 'text-white bg-h-green-500 hover:bg-h-green-400 border-h-green-500'
          case 'info':
            return 'text-white bg-h-blue-500 hover:bg-h-blue-600 border-h-blue-500'
          case 'warning':
            return 'text-white bg-h-yellow-500 hover:bg-h-yellow-600 border-h-yellow-500'
          case 'danger':
            return 'text-white bg-h-rose-500 hover:bg-h-rose-600 border-h-rose-500'
          case 'secondary':
            return 'text-kahbe-900 bg-h-kahve-500 hover:bg-h-kahve-600 border-h-kahve-500'
          default:
            return ''
        }
      }
      else {
        switch (props.kind) {
          case 'normal':
            return 'text-h-green-500 bg-transparent hover:border-h-green-500 border-h-green-300'
          case 'success':
            return 'text-h-green-500 bg-transparent hover:border-h-green-500 border-h-green-300'
          case 'info':
            return 'text-h-blue-500 bg-transparent hover:border-h-blue-600 border-h-blue-300'
          case 'warning':
            return 'text-h-yellow-500 bg-transparent hover:border-h-yellow-500 border-h-yellow-300'
          case 'danger':
            return 'text-h-rose-500 bg-transparent hover:border-h-rose-500 border-h-rose-300'
          case 'secondary':
            return 'text-h-kahve-900 bg-transparent hover:border-h-kahve-500 border-h-kahve-300'
          default:
            return ''
        }
      }
    })

    const activeClass = computed(() => {
      if (props.active) {
        switch (props.kind) {
          case 'normal':
            return '!bg-h-green-400'
          case 'success':
            return '!bg-h-green-100 '
          case 'info':
            return '!bg-h-blue-600 '
          case 'warning':
            return '!bg-h-yellow-600 '
          case 'danger':
            return '!bg-h-rose-600 '
          case 'secondary':
            return '!bg-h-kahve-600 text-h-tiber-900'
          default:
            return ''
        }
      }
      else {
        return ''
      }
    })

    const alignClass = computed(() => {
      switch (props.align) {
        case 'left':
          return 'justify-start'
        case 'center':
          return 'justify-center'
        case 'right':
          return 'justify-end'
        default:
          return ''
      }
    })

    const returnClass = { kindClass, sizeClass, alignClass, iconClass, activeClass }
    return { ...returnClass, onClick, component, isActiveRoute, toggle }

    function onClick(event: MouseEvent) {
      if (props.loading === true) return
      // Toggles the active state in the parent groupable element. Allows buttons to work ootb in button-groups
      toggle()
      emit('click', event)
    }
  },
})
</script>

<style scoped lang="scss">

.button {
  @apply flex relative items-center border-[2px] no-underline cursor-pointer transition-colors;
}

.v-button {
  @apply inline-flex items-center;
}

.v-button.full-width {
  @apply flex min-w-full;
}

.button:disabled {
  @apply cursor-not-allowed bg-h-kahve-400 border-h-kahve-700 text-h-kahve-700;
}
.dashed {
  border-style: dashed;
}

.content,
.spinner {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content {
  position: relative;
  display: flex;
  align-items: center;
  line-height: normal;
}

.content.invisible {
  opacity: 0;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tile {
  @apply rounded-none;
}
</style>
