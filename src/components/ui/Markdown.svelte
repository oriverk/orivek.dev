<script lang='ts'>
  import '../../styles/markdown.scss'
  import { parseMarkdown } from "../../utils/markdown";
  export let markdown;
  const html = parseMarkdown(markdown);
</script>

<div class='markdown'>
  {@html html}
</div>