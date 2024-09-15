
export function to_json<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as unknown as T;
}
