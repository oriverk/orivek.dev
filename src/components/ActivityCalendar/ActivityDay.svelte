<script lang="ts">
  import type { Activity } from '../../types/activityCalendar'

  export let day: Activity
  export let color: string
  export let y: number
  export let blockRadius: number
  export let blockSize: number

  const { date, level, count } = day
  const label = `${count} contributions on ${date}`
</script>

<rect
  x={0}
  {y}
  width={blockSize}
  height={blockSize}
  rx={blockRadius}
  ry={blockRadius}
  data-date={date}
  data-level={level}
  data-count={count}
  data-label={label}
  style:--color-fill={color}
>
  <title>{label}</title>
</rect>

<style lang="scss">
  rect {
    fill: var(--color-fill);
  }
</style>
