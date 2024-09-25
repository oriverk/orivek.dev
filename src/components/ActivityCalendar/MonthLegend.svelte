<script lang="ts">
import type { Activity, ActivityCalendar } from "@/types/activityCalendar";
import { getMonthLabels } from "@/utils/github/getActivityCalendar";

type Props = Pick<
  ActivityCalendar,
  "monthLabels" | "blockSize" | "blockMargin" | "fontSize"
> & {
  weeks: Activity[][];
};

const { weeks, monthLabels, blockSize, blockMargin, fontSize }: Props =
  $props();
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
