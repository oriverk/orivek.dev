<script lang="ts">
  export let className: string = ''
</script>

<div class={className} />

<style lang="scss">
  div {
    width: 4rem;
    aspect-ratio: 1;
    border: 1px solid transparent;
    border-radius: 30% 70% 59% 41% / 30% 26% 74% 70%;
    background-image: var(--accent-gradient);
  }
</style>
