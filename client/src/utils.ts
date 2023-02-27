export function getNameInitial(name: string | undefined) {
  if (!name) return "";

  const items = name.split(" ");

  if (items.length === 1) {
    return items[0].substring(0, 2).toUpperCase();
  }

  const firstName = items[0];
  const lastName = items[items.length - 1];

  return `${firstName.substring(0, 1)}${lastName.substring(
    0,
    1
  )}`.toUpperCase();
}
