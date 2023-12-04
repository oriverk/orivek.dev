<script lang="ts">
  import type { Activity, ActivityCalendar } from '../../types/activityCalendar'
  import ActivityDay from './ActivityDay.svelte'

  interface $$Props
    extends Pick<
      ActivityCalendar,
      'colors' | 'blockMargin' | 'blockRadius' | 'blockSize'
    > {
    week: Activity[]
    textHeight: number
    translateX: number
  }

  let {
    colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    week,
    textHeight,
    blockMargin,
    blockRadius,
    blockSize,
    translateX,
  } = $$props as $$Props
  export {
    colors,
    week,
    textHeight,
    blockMargin,
    blockRadius,
    blockSize,
    translateX,
  }
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
