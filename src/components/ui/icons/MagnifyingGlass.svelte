<script lang="ts">
  export let className: string = ''
  export let title: string = ''
  export let fill: string = 'none'
  export let stroke: string = 'currentColor'
</script>

<svg
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  stroke-width="1.5"
  {stroke}
  {fill}
  class={className}
>
  {#if title}
    <title>{title}</title>
  {/if}
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  />
</svg>
