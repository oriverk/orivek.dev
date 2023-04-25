<script lang='ts'>
  export let colors: string[]
  export let blockMargin: number;
  export let blockRadius: number;
  export let blockSize: number;
  const dimentions = {
    width: colors.length * (blockSize + blockMargin) - blockMargin,
    height: blockSize,
  }
</script>

<svg xmlns="http://www.w3.org/2000/svg"
  width={dimentions.width}
  height={dimentions.height}
  viewBox={`0 0 ${dimentions.width} ${dimentions.height}`}
>
  {#each colors as color, i}
    <rect
      x={i * (blockSize + blockMargin)}
      y={0}
      width={blockSize}
      height={blockSize}
      rx={blockRadius}
      ry={blockRadius}
      style:--color-fill={color}
    />
  {/each}
</svg>

<style lang='scss'>
  rect {
    fill: var(--color-fill);
  }
</style>