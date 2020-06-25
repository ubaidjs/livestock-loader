const intervals = [
  { label: 'yr', seconds: 31536000 },
  { label: 'm', seconds: 2592000 },
  { label: 'd', seconds: 86400 },
  { label: 'h', seconds: 3600 },
  { label: 'm', seconds: 60 },
  { label: 's', seconds: 1 },
]

function timeSince(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  const interval = intervals.find((i) => i.seconds < seconds)
  const count = Math.floor(seconds / interval.seconds)
  return `${count} ${interval.label}`
}

// console.log(timeSince(new Date(1590042114190)))
export default timeSince
