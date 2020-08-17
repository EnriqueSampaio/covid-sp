import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { EChartOption } from 'echarts';
import { take } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import '../../../shared/themes/brabo';

@Component({
  selector: 'app-total-series',
  templateUrl: './total-series.component.html',
  styleUrls: ['./total-series.component.scss']
})
export class TotalSeriesComponent implements OnInit {
  occurrLabel: string = $localize`Casos confirmados`;
  deathsLabel: string = $localize`Óbitos`;
  initOpts = {
    renderer: 'svg'
  };
  options: EChartOption = {
    legend: {
      data: [this.occurrLabel, this.deathsLabel]
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        formatter: (value) => {
          return formatDate(value, 'MMM d', this.locale)
        },
        rotate: 45,
      }
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let tooltip = `${formatDate(params[0]?.name, 'shortDate', this.locale)}`;
        if (params[0]) {
          tooltip += `
            <span style="display:block;text-align:left;width:100%">
              ${params[0].marker} ${this.occurrLabel}: ${params[0].value}
            </span>
          `;
        }

        if (params[1]) {
          tooltip += `
            <span style="display:block;text-align:left;width:100%">
              ${params[1].marker} ${this.deathsLabel}: ${params[1].value}
            </span>
          `;
        }
        return tooltip;
      },
      extraCssText: 'text-align: center'
    }
  };
  merge: EChartOption;

  @Input() cityId: string;
  constructor(private dataService: DataService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    this.dataService.getCityData(this.cityId)
      .subscribe((city) => {
        const docs = city.docs;
        const [axis, occurr, deaths] = docs
          .filter((doc) => {
            return doc.get('datetime').toMillis;
          })
          .reduce((array, record) => {
            array[0].push(record.get('datetime').toMillis());
            array[1].push(record.get('occurr'));
            array[2].push(record.get('deaths'));
            return array;
          }, [[], [], []]);

        this.merge = {
          xAxis: {
            data: axis
          },
          series: [
            {
              name: this.occurrLabel,
              data: occurr,
              type: 'line',
              areaStyle: {}
            },
            {
              name: this.deathsLabel,
              data: deaths,
              type: 'line',
              areaStyle: {}
            }
          ]
        };
      });
  }
}
