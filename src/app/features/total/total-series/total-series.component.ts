import { Component, OnInit, ChangeDetectionStrategy, Input, Inject, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
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
  occurrLabel: string = $localize`Ocorrências`;
  deathsLabel: string = $localize`Óbitos`;
  options: EChartOption = {
    xAxis: {
      type: 'category',
      axisLabel: {
        formatter: (value) => {
          return formatDate(value, 'MMM d', this.locale)
        }
      }
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        // console.log(params);
        return `
          ${formatDate(params[0].name, 'shortDate', this.locale)}
          <span style="display:block;text-align:left;width:100%">
            ${params[0].marker} ${this.occurrLabel}: ${params[0].value}
          </span>
          <span style="display:block;text-align:left;width:100%">
            ${params[1].marker} ${this.deathsLabel}: ${params[1].value}
          </span>
        `;
      },
      extraCssText: 'text-align: center'
    }
  };
  merge: EChartOption;

  @Input() cityId: string;
  constructor(private data: DataService, @Inject(LOCALE_ID) private locale: string, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.data.parseCompleted()
      .pipe(take(1))
      .subscribe(() => {
        const city = this.data.getCity(this.cityId);
        const [axis, occurr, deaths] = city
          .reduce((array, record) => {
            array[0].push(record.datetime.valueOf());
            // array[0].push(formatDate(record.datetime.toDate(), 'MMM d', this.locale));
            array[1].push(record.occurr);
            array[2].push(record.deaths);
            return array;
          }, [[], [], []]);
        this.merge = {
          xAxis: {
            data: axis
          },
          series: [
            {
              data: occurr,
              type: 'line',
              areaStyle: {}
            },
            {
              data: deaths,
              type: 'line',
              areaStyle: {}
            }
          ]
        };
      });
  }
}
