export function formatDateTime(isoString) {
  const d = new Date(isoString)
  if (Number.isNaN(d.getTime())) return isoString

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

