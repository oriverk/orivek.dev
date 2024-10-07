<script lang="ts">
import type { ActivityCalendar } from "@/types/activityCalendar";

type Props = Pick<
  ActivityCalendar,
  "colors" | "blockMargin" | "blockRadius" | "blockSize"
>;

const { colors, blockMargin, blockRadius, blockSize }: Props = $props();
const width = colors.length * (blockSize + blockMargin) - blockMargin;
const height = blockSize;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {width}
  {height}
  viewBox={`0 0 ${width} ${height}`}
>
  {#each colors as color, i}
    <rect
      x={i * (blockSize + blockMargin)}
      y={0}
      width={blockSize}
      height={blockSize}
      rx={blockRadius}
      ry={blockRadius}
      style={`--color-fill: ${color}`}
    />
  {/each}
</svg>

<style>
  rect {
    fill: var(--color-fill);
  }
</style>
