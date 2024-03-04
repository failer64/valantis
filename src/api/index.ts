import md5 from 'md5';
import moment from 'moment';
import { Items } from '../App';

export const BASE_URL = 'https://api.valantis.store:41000/';
const timestamp = moment().format('YYYY MM DD').split(' ').join('');
const password = 'Valantis';
export const token = password + '_' + timestamp;
//export const token = "Valantis_20240227";

export async function getData(body: BodyType) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': md5(token),
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    return data.result;
  } else {
    console.log(`Ошибка ${response.status}`);
    return getData(body);
  }
}

export type ResponseDataType = {
  result: Items[];
};

export type ResponseIdsType = {
  result: string[];
};

export interface BodyType {
  action: ActionType;
  params?: OptionalParams;
}

type ActionType = 'filter' | 'get_ids' | 'get_items' | 'get_fields';

interface Params extends Items {
  offset: number;
  limit: number;
  ids: string[];
  field: keyof Items;
}

type OptionalParams = Partial<Params>;
