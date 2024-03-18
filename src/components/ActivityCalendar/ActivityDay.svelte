<script lang="ts">
import type { Activity, ActivityCalendar } from "../../types/activityCalendar";

interface $$Props extends Pick<ActivityCalendar, "blockRadius" | "blockSize"> {
  day: Activity;
  color: string;
  y: number;
}

let { day, color, y, blockRadius, blockSize } = $$props as $$Props;
export { day, color, y, blockRadius, blockSize };
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
  style="--color-fill: {color}"
>
  <title>{label}</title>
</rect>

<style>
  rect {
    fill: var(--color-fill);
  }
</style>
