import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Data {
  city: string;
  ibge_cod: string;
  day: number;
  month: number;
  datetime: Timestamp;
  occurr: number;
  new_occurr: number;
  occurr_ph: number;
  occurr_ma7d: number;
  deaths: number;
  new_deaths: number;
  deaths_ph: number;
  deaths_ma7d: number;
  lethality: number;
  ar_name: string;
  ar_cod: string;
  rhd_name: string;
  rhd_cod: string;
  est_pop: number;
  est_pop60: number;
  area: number;
  map_sub_label: string;
  map_sub_cod: string;
  latitude: string;
  longitude: string;
  epidem_week: number;

  constructor(obj: Data = {} as Data) {
    // if (obj.datetime) {
    //   obj.datetime = moment(obj.datetime);
    // }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        this[key] = element;
      }
    }
  }
}
