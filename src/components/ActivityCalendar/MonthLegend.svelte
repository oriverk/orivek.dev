<script lang='ts'>
  import type { Activity } from "../../types/activityCalendar";
  import { getMonthLabels } from "../../utils/github/getActivityCalendar";

  export let weeks: Activity[][]
  export let monthLabels: string[]
  export let blockSize: number;
  export let blockMargin: number;
  export let fontSize: number;
  const labels = getMonthLabels(weeks, monthLabels);
</script>

<g>
  {#each labels as {text, x}}
    <text
      x={(blockSize + blockMargin) * x}
      y={0}
      dominant-baseline="hanging"
      font-size={fontSize}
    >
      {text}
    </text>
  {/each}
</g>

<style>
  text {
    fill: rgb(var(--color-white));
    user-select: none;
  }
</style>