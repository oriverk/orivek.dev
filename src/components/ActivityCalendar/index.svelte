<script lang='ts'>
  import type { ContributionCalendar } from '@octokit/graphql-schema'
  import type { Activity } from "../../types/activityCalendar"
  import { parseContributionCalendarDay } from '../../utils/github/getActivityCalendar'
  import CalendarWeek from './ActivityWeek.svelte';
  import ColorsLegend from './ColorLegend.svelte'
  import Card from '../ui/Card.svelte';
  import MonthLegend from './MonthLegend.svelte'

  export let contributionCalendar: ContributionCalendar
  export let blockMargin: number = 4;
  export let blockRadius: number = 2;
  export let blockSize: number = 12;
  export let fontSize: number = 14;
  export let hideMonthLabels: boolean = false
  export let colors: string[] = ["#000", "#9be9a8","#40c463","#30a14e","#216e39"]
  export let monthLabels: string[] = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const { totalContributions, weeks } = contributionCalendar

  const activityWeeks: Activity[][] = weeks.map(week => {
    return week.contributionDays.map(day => {
      return parseContributionCalendarDay(day)
    })
  })

  const textHeight = hideMonthLabels ? 0 : fontSize + 2 * blockMargin;
  const dimentions = {
    width: activityWeeks.length * (blockSize + blockMargin) - blockMargin,
    height: textHeight + (blockSize + blockMargin) * 7 - blockMargin,
  }
</script>

<Card className='activity' disabled>
  <div class='activity-inner'>
    <p>{totalContributions} contributions in the last year</p>
    <div class='calendar'>
      <svg xmlns="http://www.w3.org/2000/svg"
        width={dimentions.width}
        height={dimentions.height}
        viewBox={`0 0 ${dimentions.width} ${dimentions.height}`}
      >
        {#if !hideMonthLabels}
          <MonthLegend weeks={activityWeeks} monthLabels={monthLabels} blockSize={blockSize} blockMargin={blockMargin} fontSize={fontSize} />
        {/if}
        {#each activityWeeks as week, i}
          <CalendarWeek
            week={week}
            textHeight={textHeight}
            blockMargin={blockMargin}
            blockRadius={blockRadius}
            blockSize={blockSize}
            translateX={i * (blockSize + blockMargin)}
            colors={colors}
          />
        {/each}
      </svg>
    </div>
    <div class='information'>
      <span>Less</span>
      <ColorsLegend
        colors={colors}
        blockMargin={blockMargin}
        blockRadius={blockRadius}
        blockSize={blockSize}
      />
      <span>More</span>
    </div>
  </div>
</Card>

<style lang='scss'>
  .activity-inner {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
  .activity-inner > p {
    margin: 0;
  }
  .calendar {
    max-width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    // -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
  }

  .calendar > svg {
    margin-bottom: .5rem;
    writing-mode: horizontal-tb;
  }

  .information {
    display: flex;
    gap: .5rem;
    justify-content: flex-end;
    align-items: center;
    user-select: none;
  }
</style>