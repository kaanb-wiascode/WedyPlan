export function dashboardPathForRole(role?: string | null): string {
  if (role === "VENDOR") return "/firma/dashboard";
  if (role === "ADMIN") return "/admin";
  return "/cift/dashboard";
}
