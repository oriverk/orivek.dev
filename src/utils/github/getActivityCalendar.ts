import type { Activity } from "@/types/activityCalendar";
import type { ContributionDay } from "@/types/github";
import { getMonth, parseISO } from "date-fns";

export function parseContributionCalendarDay(
  day: ContributionDay,
): Activity {
  const { contributionCount = 0, contributionLevel, date } = day;
  let level: Activity["level"] = 0;
  switch (contributionLevel) {
    case "NONE":
      level = 0;
      break;
    case "FIRST_QUARTILE":
      level = 1;
      break;
    case "SECOND_QUARTILE":
      level = 2;
      break;
    case "THIRD_QUARTILE":
      level = 3;
      break;
    case "FOURTH_QUARTILE":
      level = 4;
      break;
    default:
      level = 0;
  }

  return {
    date,
    count: contributionCount,
    level,
  };
}

export function getMonthLabels(weeks: Activity[][], monthNames: string[]) {
  return weeks
    .reduce(
      (
        labels: { x: number; y: number; text: string }[],
        week: Activity[],
        index,
      ) => {
        const firstWeekDay = week.find((day) => day !== undefined);

        if (!firstWeekDay) {
          throw new Error(`Unexpected error: Week is empty: [${week}].`);
        }

        const month = monthNames[getMonth(parseISO(firstWeekDay.date))];
        const prev = labels[labels.length - 1];

        if (index === 0 || prev.text !== month) {
          labels.push({
            x: index,
            y: 0,
            text: month,
          });
        }

        return labels;
      },
      [],
    )
    .filter((label, index, labels) => {
      if (index === 0) {
        return labels[1] && labels[1].x - label.x > 2;
      }

      return true;
    });
}
