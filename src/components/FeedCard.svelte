<script lang='ts'>
  import type {FeedItem} from '../types/feed'
  import { getFaviconSrcFromOrigin } from '../utils/feed'
  import { getTimeFromNow } from '../utils/getTimeFromNow'
  import Card from '../components/ui/Card.svelte'

  export let title: FeedItem['title']
  export let dateMiliSeconds: FeedItem['dateMiliSeconds']
  export let link: FeedItem['link']
  const timeString = getTimeFromNow(dateMiliSeconds) + ' ago';
  const { hostname, origin} = new URL(link);
</script>

<a href={link} target='_blank' rel='noopenner noreferrer'>
  <Card>
    <div class='feedItem'>
      <time>{timeString}</time>
      <h3 class='title'>{title}</h3>
      <div class='info'>
        <img src={getFaviconSrcFromOrigin(origin)} width="14" height="14" alt={hostname}/>
        <span>{hostname}</span>
      </div>
    </div>
  </Card>
</a>

<style lang='scss'>
  a {
    text-decoration: none;
  }

  .feedItem {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    height: 100%;
  }

  time {
    color: rgb(var(--color-lightgray));
  }

  .title {
    flex-grow: 1;
    margin: 0;
    font-size: 1.25rem;
  }

  .info {
    display: flex;
    gap: .5rem;
    align-items: center;
  }

  .info span {
    color: rgb(var(--color-lightgray));
  }
</style>