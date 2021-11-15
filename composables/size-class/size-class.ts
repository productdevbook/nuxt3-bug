import { computed, ComputedRef, PropType } from 'vue'

export const sizeProps = {
  size: {
    type: String as PropType<'xs' | 'sm' | 'lg' | 'xl' | 'false'>,
    default: 'sm',
  },
}

interface RequiredProps {
  size: 'xs' | 'sm' | 'lg' | 'xl' | 'false'
}

type returnSize = 'xs' | 'sm' | 'lg' | 'xl' | 'false'

export default function useSizeClass<T>(props: T & RequiredProps): ComputedRef<returnSize | null> {
  const sizeClass = computed<returnSize | null>(() => {
    if (props.size === 'xs') return 'xs'
    if (props.size === 'sm') return 'sm'
    if (props.size === 'lg') return 'lg'
    if (props.size === 'xl') return 'xl'
    if (props.size === 'false') return 'false'
    return 'false'
  })

  return sizeClass
}
