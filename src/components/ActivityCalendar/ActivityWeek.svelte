<script lang="ts">
import type { Activity, ActivityCalendar } from "@/types/activityCalendar";
import ActivityDay from "./ActivityDay.svelte";

type Props = Pick<
  ActivityCalendar,
  "colors" | "blockMargin" | "blockRadius" | "blockSize"
> & {
  week: Activity[];
  textHeight: number;
  translateX: number;
};

const {
  colors,
  week,
  textHeight,
  blockMargin,
  blockRadius,
  blockSize,
  translateX,
}: Props = $props();
</script>

<g transform={`translate(${translateX}, 0)`}>
  {#each week as {date, level, count}, weekday}
    {@const y = textHeight + (blockSize + blockMargin) * weekday}
    {@const color = colors[level]}
    <ActivityDay
      day={{ date, level, count }}
      {color}
      {y}
      {blockRadius}
      {blockSize}
    />
  {/each}
</g>
