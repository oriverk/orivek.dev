<script lang="ts">
import type { FeedItem } from "../types/feed";
import { getFaviconSrcFromOrigin } from "../utils/feed";
import { getTimeFromNow } from "../utils/getTimeFromNow";
import Card from "./ui/Card.svelte";

type Props = Pick<FeedItem, "title" | "link" | "dateMiliSeconds">;

const { title, link, dateMiliSeconds }: Props = $props();
const timeString = `${getTimeFromNow(dateMiliSeconds)} ago`;
const isExternal = link.startsWith("http");
const url = isExternal ? link : "https://oriverk.dev";
const { hostname, origin } = new URL(url);
</script>

<a href={link} target={isExternal ? "_blank" : ""} rel={isExternal ? "noopenner noreferrer" : ""} class="feed-card">
  <Card>
    <div class="feed">
      <time>{timeString}</time>
      <h3 class="title">{title}</h3>
      <div class="info">
        <img
          src={getFaviconSrcFromOrigin(origin)}
          width="14"
          height="14"
          alt={hostname}
        />
        <span>{hostname}</span>
      </div>
    </div>
  </Card>
</a>

<style>
  .feed-card {
    text-decoration: none;
  }

  .feed {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 0.5rem;
    height: 100%;
  }

  time {
    color: rgb(var(--color-lightgray));
  }

  .title {
    margin: 0;
    font-size: 1.25rem;
  }

  .info {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .info span {
    color: rgb(var(--color-lightgray));
  }
</style>
