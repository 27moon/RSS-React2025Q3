export function saveLS(item: string) {
  const key = 'searchedChar';
  localStorage.setItem(key, item);
}

export function getLS(): string {
  const key = 'searchedChar';
  return localStorage.getItem(key) || '';
}
