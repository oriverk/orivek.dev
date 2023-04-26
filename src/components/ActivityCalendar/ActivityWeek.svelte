<script lang="ts">
  import type { Activity } from '../../types/activityCalendar'
  import ActivityDay from './ActivityDay.svelte'
  export let colors: string[] = [
    '#161b22',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
  ]
  export let week: Activity[]
  export let textHeight: number
  export let blockMargin: number
  export let blockRadius: number
  export let blockSize: number
  export let translateX: number
</script>

<g transform={`translate(${translateX}, 0)`}>
  {#each week as { date, level, count }, weekday}
    <ActivityDay
      day={{ date, level, count }}
      color={colors[level]}
      y={textHeight + (blockSize + blockMargin) * weekday}
      {blockRadius}
      {blockSize}
    />
  {/each}
</g>
