export function getOptionalServerEnv(name: string) {
  return process.env[name] || null;
}
