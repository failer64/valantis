import { Items } from '../App';

// Получать уникальные значение массива по id
export function getUniqeItems(items: Items[]) {
  return items.reduce(
    (res: Items[], cur) =>
      res.find((find) => find.id === cur.id) ? res : [...res, cur],
    []
  );
}
