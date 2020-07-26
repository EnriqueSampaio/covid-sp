import { Injectable } from '@angular/core';
import { Data } from 'src/app/shared/models/data.model';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
import { Papa, ParseConfig } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _data: Data[];
  private _cities: Map<string, Data[]>;
  private _citiesIdx: Map<string, string>;
  private _parseCompleted: ReplaySubject<void>;

  constructor(private papa: Papa) {
    this._cities = new Map();
    this._citiesIdx = new Map();
    this._parseCompleted = new ReplaySubject(1);
    const config: ParseConfig = {
      complete: (result) => {
        this._data = result.data.map((record) => {
          const data = new Data(record as Data);
          if (this._cities.has(data.ibge_cod)) {
            const cityData = this._cities.get(data.ibge_cod);
            cityData.push(data);
            this._cities.set(data.ibge_cod, cityData);
          } else {
            const cityData = [data];
            this._cities.set(data.ibge_cod, cityData);
            this._citiesIdx.set(data.ibge_cod, data.city);
          }

          return data;
        });

        this._parseCompleted.next();
      },
      delimiter: ';',
      download: true,
      header: true,
      //@ts-ignore
      transform: (value, field) => {
        value = value.trim();
        switch (field) {
          case 'occurr_ph':
          case 'occurr_ma7d':
          case 'deaths_ph':
          case 'deaths_ma7d':
          case 'lethality':
            return +(value.replace(',', '.'));
          case 'day':
          case 'month':
          case 'occurr':
          case 'new_occurr':
          case 'new_deaths':
          case 'est_pop':
          case 'est_pop60':
          case 'epidem_week':
            return +value;

        }
        return value;
      },
      transformHeader: (header): string => {
        switch (header) {
          case 'nome_munic':
            return 'city';
          case 'codigo_ibge':
            return 'ibge_cod';
          case 'dia':
            return 'day';
          case 'mes':
            return 'month';
          case 'datahora':
            return 'datetime';
          case 'casos':
            return 'occurr';
          case 'casos_novos':
            return 'new_occurr';
          case 'casos_pc':
            return 'occurr_ph';
          case 'casos_mm7d':
            return 'occurr_ma7d';
          case 'obitos':
            return 'deaths';
          case 'obitos_novos':
            return 'new_deaths';
          case 'obitos_pc':
            return 'deaths_ph';
          case 'obitos_mm7d':
            return 'deaths_ma7d';
          case 'letalidade':
            return 'lethality';
          case 'nome_ra':
            return 'ar_name';
          case 'cod_ra':
            return 'ar_cod';
          case 'nome_drs':
            return 'rhd_name';
          case 'cod_drs':
            return 'rhd_cod';
          case 'pop':
            return 'est_pop';
          case 'pop_60':
            return 'est_pop60';
          case 'area':
            return 'area';
          case 'map_leg': ;
            return 'map_sub_label';
          case 'map_leg_s':
            return 'map_sub_cod';
          case 'latitude':
            return 'latitude';
          case 'longitude':
            return 'longitude';
          case 'semana_epidem':
            return 'epidem_week';
        }

        return 'not_found';
      }
    };
    this.papa.parse(environment.source, config);
  }

  get data() {
    return this._data;
  }

  getCityData(id: string) {
    return this._cities.get(id);
  }

  getCityName(id: string) {
    return this._citiesIdx.get(id);
  }

  getCitiesList() {
    const cities = [];
    for (const [id, name] of this._citiesIdx.entries()) {
      cities.push({ id: id, name: name });
    }
    return cities;
  }

  parseCompleted() {
    return this._parseCompleted;
  }
}
