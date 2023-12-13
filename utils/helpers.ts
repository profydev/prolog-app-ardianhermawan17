export function changeStatusCode(status: string): string {
  if (status === "error") return "critical";
  if (status === "info") return "stable";
  return status;
}
