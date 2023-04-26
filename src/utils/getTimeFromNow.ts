import { formatDistance } from 'date-fns'

export function getTimeFromNow(miliseconds: number) {
  const time = formatDistance(new Date(), new Date(miliseconds))
  return time
}
