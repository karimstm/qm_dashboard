const stoppagePieChartOptions = (seriesOptions, drilldownSeries, getEvent) => {
  return {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
      //   margin: [0, 0, 0, 0],
      events: {
        load: function(chart) {
          setTimeout(function() {
            chart.target.reflow();
          });
        },
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
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
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
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      margin: 0
    },
    tooltip: {
      //   pointFormat:
      //     '<span style="color:{series.color}"></span><b>{point.y}</b> Hours <b>{point.y}</b> Minutes<br/>',
      // valueDecimals: 2
      formatter: function() {
        const getHours = hours => {
          let h = Math.floor(this.y % 24);
          return h ? h + "</b> Hours <b>" : "";
        };
        const getDays = hours => {
          let d = Math.floor(this.y / 24);
          return d ? d + "</b> Days <b>" : "";
        };
        const getMinutes = hours => {
          let m = Math.floor((this.y * 60) % 60);
          return m ? m + "</b> Minutes<br/>" : "";
        };
        return (
          '<span style="color:' +
          this.color +
          '"></span><b>' +
          getDays(this.y) +
          getHours(this.y) +
          getMinutes(this.y)
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
      type: "areaspline",
      events: {
        load: function(chart) {
          setTimeout(function() {
            chart.target.reflow();
          });
        }
      }
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
    tooltip: {
      formatter: function() {
        const getHours = hours => {
          let h = Math.floor(this.y % 24);
          return h ? h + "</b> Hours <b>" : "";
        };
        const getDays = hours => {
          let d = Math.floor(this.y / 24);
          return d ? d + "</b> Days <b>" : "";
        };
        const getMinutes = hours => {
          let m = Math.floor((this.y * 60) % 60);
          return m ? m + "</b> Minutes<br/>" : "";
        };
        return (
          '<span style="color:' +
          this.color +
          '"></span><b>' +
          getDays(this.y) +
          getHours(this.y) +
          getMinutes(this.y)
        );
      }
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

const quantityChartOptions = (
  seriesOptions,
  drilldownSeries,
  getEvent,
  Highcharts
) => {
  return {
    lang: {
      drillUpText: "< Back"
    },
    chart: {
      //   animation: false,
      type: "column",
      // options3d: {
      //   enabled: true,
      //   alpha: 30,
      //   beta: 0
      // },
      events: {
        load: function(chart) {
          setTimeout(function() {
            chart.target.reflow();
          });
        },
        drilldown: e => getEvent(e),
        drillup: e => getEvent(e)
      }
    },
    title: {
      text: ""
    },
    xAxis: {
      title: {
        text: "Date",
        style: {
          color: "black"
        }
      },
      type: "datetime",
      labels: {
        // formatter: function() {
        //   return Highcharts.dateFormat("", this.value);
        // }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Metric Tonnes"
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray"
        }
      }
    },
    series: seriesOptions,
    drilldown: {
      series: drilldownSeries
    },
    plotOptions: {
      // series: {
      //   point: {
      //     events: {
      //       click: e => getClickEvent(e)
      //     }
      //   }
      // },
      column: {
        stacking: "normal",
        cursor: "pointer",
        // allowPointSelect: true,
        // depth: 40,
        dataLabels: {
          enabled: false,
          inside: true
        }
      }
    }
  };
};

module.exports = {
  stoppagePieChartOptions,
  stoppageAreaChartOptions,
  quantityChartOptions
};
