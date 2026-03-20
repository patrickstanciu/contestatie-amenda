/** Masks a CNP for display: shows first digit and last 2 digits only.
 *  e.g. "1900101123456" → "1*********56"
 */
export function maskCnp(cnp: string): string {
  if (!cnp || cnp.length < 4) return "***";
  return cnp[0] + "*".repeat(cnp.length - 3) + cnp.slice(-2);
}
