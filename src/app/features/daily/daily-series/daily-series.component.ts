import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { EChartOption } from 'echarts';
import { formatDate } from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;


@Component({
  selector: 'app-daily-series',
  templateUrl: './daily-series.component.html',
  styleUrls: ['./daily-series.component.scss']
})
export class DailySeriesComponent implements OnInit {
  occurrLabel: string = $localize`Novos casos`;
  deathsLabel: string = $localize`Novos óbitos`;
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
            array[1].push(record.get('new_occurr'));
            array[2].push(record.get('new_deaths'));
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
              type: 'bar',
              areaStyle: {}
            },
            {
              name: this.deathsLabel,
              data: deaths,
              type: 'bar',
              areaStyle: {}
            }
          ]
        };
      });
  }

}
