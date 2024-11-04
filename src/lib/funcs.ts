export const reloadSession = async () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export function formatDateWithDays(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function formatDateWithMinutes(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
