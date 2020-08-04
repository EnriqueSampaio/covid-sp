import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import * as L from 'leaflet';
import 'leaflet-boundary-canvas';
import { DataService } from 'src/app/core/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-total-map',
  templateUrl: './total-map.component.html',
  styleUrls: ['./total-map.component.scss']
})
export class TotalMapComponent implements OnInit {
  initOpts = {
    renderer: 'svg'
  };
  options: EChartOption = {
    //@ts-ignore
    leaflet: {
      center: [-48.5962357, -22.286816],
      roam: true,
      zoom: 10,
      zoomSnap: 0.25,
      tiles: [{
        urlTemplate: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      }]
    },
    tooltip: {
      trigger: 'item'
    }
  };

  merge: EChartOption;

  ec: ECharts;
  map: L.Map;

  @Output() citySelected: EventEmitter<{ id: string, name: string }> = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onChartInit(ec) {
    this.ec = ec;
    this.dataService.parseCompleted()
      .pipe(take(1))
      .subscribe(() => {
        const cities = this.dataService.getCities();
        const data = [];

        for (const [, city] of cities.entries()) {
          const lastData = city[city.length - 1];
          data.push({
            id: lastData.ibge_cod,
            name: lastData.city,
            value: [lastData.longitude, lastData.latitude, lastData.occurr]
          });
        }

        const sortedData = data.sort((a, b) => b.value[2] - a.value[2]);

        this.merge = {
          visualMap: [{
            type: 'continuous',
            min: sortedData[sortedData.length - 1].value[2],
            max: sortedData[10].value[2],
            left: 'auto',
            right: 0,
            inRange: {
              color: ['orange', 'red'],
              opacity: [0.4, 0.8]
            },
          }],
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'leaflet',
              data: sortedData.slice(10),
              encode: {
                value: 2
              },
              symbolSize: function (value) {
                return value[2] > 0 ? Math.log(value[2]) * 3 : 0;
              },
              hoverAnimation: true
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'leaflet',
              data: sortedData.slice(0, 10),
              encode: {
                value: 2
              },
              symbolSize: function (value) {
                return value[2] > 0 ? Math.log(value[2]) * 3 : 0;
              },
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
            }
          ]
        };
      });
  }

  onChartFinished() {
    this.dataService.geoCompleted()
      .pipe(take(1))
      .subscribe(() => {
        //@ts-ignore
        this.map = this.ec.getModel().getComponent('leaflet').getLeaflet();
        this.map.whenReady(() => {
          this.map.removeControl(this.map.zoomControl);
          //@ts-ignore
          L.TileLayer.boundaryCanvas('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            boundary: this.dataService.geo,
          }).addTo(this.map);
          const geo = L.geoJSON(this.dataService.geo);
          const bounds = [
            [geo.getBounds().getNorthEast().lat, geo.getBounds().getNorthEast().lng],
            [geo.getBounds().getSouthWest().lat, geo.getBounds().getSouthWest().lng]
          ];
          //@ts-ignore
          this.map.fitBounds(bounds);

          let count = 0;
          this.map.eachLayer((layer: L.TileLayer) => {
            if (count === 0) {
              layer.removeFrom(this.map);
            }
            count++;
          });
        });
      });

    this.ec.off('finished');
  }

  onClick(event) {
    this.citySelected.emit({ id: event.data.id, name: event.data.name });
  }
}
