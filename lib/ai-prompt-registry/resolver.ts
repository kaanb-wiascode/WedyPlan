export function injectPromptVariables(template: string, variables: Record<string, string>): string {
  let resolved = template;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\\\s*${key}\\\\s*}}`, "g");
    resolved = resolved.replace(regex, value);
  });
  return resolved;
}
