<script lang="ts">
import {
  DEFAULT_COLORS,
  DEFAULT_MONTH_LABELS,
} from "../../constants/activityCalendar";
import type { Activity, ActivityCalendar } from "../../types/activityCalendar";
import { parseContributionCalendarDay } from "../../utils/github/getActivityCalendar";
import Card from "../ui/Card.svelte";
import CalendarWeek from "./ActivityWeek.svelte";
import ColorsLegend from "./ColorLegend.svelte";
import MonthLegend from "./MonthLegend.svelte";

interface $$Props
  extends Partial<Omit<ActivityCalendar, "contributionCalendar">> {
  contributionCalendar: ActivityCalendar["contributionCalendar"];
}

let {
  contributionCalendar,
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  fontSize = 14,
  hideMonthLabels = false,
  colors = DEFAULT_COLORS,
  monthLabels = DEFAULT_MONTH_LABELS,
} = $$props as $$Props;

export {
  contributionCalendar,
  blockMargin,
  blockRadius,
  blockSize,
  fontSize,
  hideMonthLabels,
  colors,
  monthLabels,
};

const { totalContributions, weeks } = contributionCalendar;
const activityWeeks: Activity[][] = weeks.map((week) => {
  return week.contributionDays.map((day) => {
    return parseContributionCalendarDay(day);
  });
});
const textHeight = hideMonthLabels ? 0 : fontSize + 2 * blockMargin;
const dimentions = {
  width: activityWeeks.length * (blockSize + blockMargin) - blockMargin,
  height: textHeight + (blockSize + blockMargin) * 7 - blockMargin,
};
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

<style>
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
    /* -ms-writing-mode: tb-rl; */
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
