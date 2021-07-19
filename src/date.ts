export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-Us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
