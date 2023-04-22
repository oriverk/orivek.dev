<script lang='ts'>
  import clsx from 'clsx'
  let className: string = ''
</script>

<div class={clsx('content-wrapper', className)}>
  <slot />
</div>

<style>
  .content-wrapper {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>