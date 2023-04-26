<script lang="ts">
  import type { ContributionCalendar } from '@octokit/graphql-schema'
  import type { Activity } from '../../types/activityCalendar'
  import { parseContributionCalendarDay } from '../../utils/github/getActivityCalendar'
  import CalendarWeek from './ActivityWeek.svelte'
  import ColorsLegend from './ColorLegend.svelte'
  import Card from '../ui/Card.svelte'
  import MonthLegend from './MonthLegend.svelte'
  import {
    DEFAULT_COLORS,
    DEFAULT_MONTH_LABELS,
  } from '../../constants/activityCalendar'

  export let contributionCalendar: ContributionCalendar
  export let blockMargin: number = 4
  export let blockRadius: number = 2
  export let blockSize: number = 12
  export let fontSize: number = 14
  export let hideMonthLabels: boolean = false
  export let colors: string[] = DEFAULT_COLORS
  export let monthLabels: string[] = DEFAULT_MONTH_LABELS

  const { totalContributions, weeks } = contributionCalendar

  const activityWeeks: Activity[][] = weeks.map((week) => {
    return week.contributionDays.map((day) => {
      return parseContributionCalendarDay(day)
    })
  })

  const textHeight = hideMonthLabels ? 0 : fontSize + 2 * blockMargin
  const dimentions = {
    width: activityWeeks.length * (blockSize + blockMargin) - blockMargin,
    height: textHeight + (blockSize + blockMargin) * 7 - blockMargin,
  }
</script>

<Card className="activity" disabled>
  <div class="activity-inner">
    <p>{totalContributions} contributions in the last year</p>
    <div class="calendar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={dimentions.width}
        height={dimentions.height}
        viewBox={`0 0 ${dimentions.width} ${dimentions.height}`}
      >
        {#if !hideMonthLabels}
          <MonthLegend
            weeks={activityWeeks}
            {monthLabels}
            {blockSize}
            {blockMargin}
            {fontSize}
          />
        {/if}
        {#each activityWeeks as week, i}
          <CalendarWeek
            {week}
            {textHeight}
            {blockMargin}
            {blockRadius}
            {blockSize}
            translateX={i * (blockSize + blockMargin)}
            {colors}
          />
        {/each}
      </svg>
    </div>
    <div class="information">
      <span>Less</span>
      <ColorsLegend {colors} {blockMargin} {blockRadius} {blockSize} />
      <span>More</span>
    </div>
  </div>
</Card>

<style lang="scss">
  .activity-inner {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    margin-bottom: 0.5rem;
    writing-mode: horizontal-tb;
  }

  .information {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: center;
    user-select: none;
  }
</style>
