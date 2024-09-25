<script lang="ts">
import type { Activity, ActivityCalendar } from "@/types/activityCalendar";

type Props = Pick<ActivityCalendar, "blockRadius" | "blockSize"> & {
  day: Activity;
  color: string;
  y: number;
};

const { day, color, y, blockRadius, blockSize }: Props = $props();
const { date, level, count } = day;
const label = `${count} contributions on ${date}`;
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
  style={`--color-fill: ${color}`}
>
  <title>{label}</title>
</rect>

<style>
  rect {
    fill: var(--color-fill);
  }
</style>
