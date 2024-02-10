export function getToken(authHeader: string) {
  if (!authHeader) {
    return null;
  }
  if (!authHeader.startsWith('Bearer')) {
    return null;
  }
  return authHeader.split(' ')[1];
}
