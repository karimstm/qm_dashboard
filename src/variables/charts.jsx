const stoppagePieChartOptions = (seriesOptions, drilldownSeries, getEvent) => {
  return {
    chart: {
      type: "pie",
      events: {
        drilldown: e => getEvent(e),
        drillup: e => getEvent(e)
      }
    },
    title: {
      text: ""
    },
    series: seriesOptions,
    drilldown: {
      series: drilldownSeries
    },
    plotOptions: {
      series: {
        size: "70%",
        innerSize: "60%"
      },
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        // dataLabels: {
        //   formatter: function() {
        //     return this.point.name;
        //   },
        //   color: "#ffffff",
        //   distance: -30
        // },
        showInLegend: true
      }
    },
    tooltip: {
      //   pointFormat:
      //     '<span style="color:{series.color}"></span><b>{point.y}</b> Hours <b>{point.y}</b> Minutes<br/>',
      // valueDecimals: 2
      formatter: function() {
        return (
          '<span style="color:' +
          this.color +
          '"></span><b>' +
          Math.floor(this.y) +
          "</b> Hours <b>" +
          Math.floor((this.y * 60) % 60) +
          "</b> Minutes<br/>"
        );
      }
    },
    lang: {
      drillUpText: "< Back"
    }
  };
};

const stoppageAreaChartOptions = seriesOptions => {
  return {
    chart: {
      type: "areaspline"
    },
    title: {
      text: ""
    },
    series: seriesOptions,
    plotOptions: {
      areaspline: {
        stacking: "normal"
        // lineColor: "#666666",
        // lineWidth: 1,
        // marker: {
        //   lineWidth: 1,
        //   lineColor: "#666666"
        // }
      },
      series: {
        connectNulls: true
      }
    },
    legend: {
      enabled: true,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            },
            legend: {
              enabled: true,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  };
};

const quantityChartOptions = seriesOptions => {
  return {
    chart: {
      type: "column"
    },
    title: {
      text: ""
    },
    series: seriesOptions,
    plotOptions: {
      column: {
        stacking: "normal"
      }
    }
  };
};

module.exports = {
  stoppagePieChartOptions,
  stoppageAreaChartOptions,
  quantityChartOptions
};
