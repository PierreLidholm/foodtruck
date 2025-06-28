export function CalculateTimeDifferenceInMinutes(
  startTime: string,
  endTime: string
): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffMs = end.getTime() - start.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  const minutes = Math.floor(diffSec / 60);

  return `${minutes} MIN`;
}
