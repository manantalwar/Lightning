import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const heat = require('highcharts/modules/heatmap');
heat(Highcharts);

export class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const options = {
            title: {
                text: 'Scatter plot with regression line'
            },
            xAxis: {
                min: 0,
                max: 5
            },
            yAxis: {
                min: 0
            },
            series: [{
                type: 'line',
                name: 'Regression Line',
                data: [[0, 1.11], [5, 4.51]],
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 0
                    }
                },
                enableMouseTracking: false
            }, {
                type: 'scatter',
                name: 'Observations',
                data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
                marker: {
                    radius: 4
                }
            }]
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}

export class Histogram extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { mainText, subText } = this.props;
        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: mainText
            },
            subtitle: {
                text: subText
            },
            xAxis: {
                categories: [
                2.5,
                17.5,
                32.5,
                47.5,
                62.5,
                77.5,
                107.5,
                122.5,
                137.5,
                152.5,
                167.5,
                182.5,
                197.5
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Percent'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px">Price: {point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">Percent: </td>' +
                '<td style="padding:0">{point.y:.1f} %<b></b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 1,
                    groupPadding: 0,
                    shadow: false
                }
            },
            series: [{
                name: 'HUB Node Prices',
                data: [2, 7, 17, 19, 13, 9, 7, 6, 5, 4, 3, 2, 1]

            }]
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}

function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

function makeCells() {
    let cells = [];
    for (let i = 0; i < 7; ++i) {
        for (let j = 0; j < 24; ++j) {
            cells.push([j, i, Math.floor(Math.random() * 10)])
        }
    }
    return cells;
}

export class HeatMap extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const options = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: 'MW of Electricity used every Hour per Day'
            },

            xAxis: {
                categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
            },

            yAxis: {
                categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                title: null,
                reversed: true,
            },

            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            xName = getPointCategoryName(point, 'x'),
                            yName = getPointCategoryName(point, 'y'),
                            val = point.value;
                        return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
                    }
                }
            },

            colorAxis: {
                min: 0,
                minColor: '#E0FFFF',
                maxColor: Highcharts.getOptions().colors[5]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.value + '</b> MW used at <b>' + getPointCategoryName(this.point, 'x') + '</b> Hrs Last <b>' + getPointCategoryName(this.point, 'y') + '</b>';
                }
            },

            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                data: makeCells(),
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return this.value.charAt(0);
                                }
                            }
                        }
                    }
                }]
            }
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}

export class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const options = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'System Demand'
            },
            subtitle: {
                text: 'Forecasted & Actual'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    hour: '%H:%M',
                    year: '%b'
                },
                title: {
                    text: 'Hour'
                }
            },
            yAxis: {
                title: {
                    text: 'MW'
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%H:%M}: {point.y:.2f} MW'
            },

            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 2.5
                    }
                }
            },

            colors: ['Crimson', 'DeepSkyBlue'],
            // colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

            // Define the data points. All series have a dummy year of 1970/71 in order
            // to be compared on the same x axis. Note that in JavaScript, months start
            // at 0 for January, 1 for February etc.
            series: [
                {
                    name: "Forecasted (MW)",
                    data: [
                        [Date.UTC(2022, 9, 19, 0, 0), 8250],
                        [Date.UTC(2022, 9, 19, 1, 0), 7777],
                        [Date.UTC(2022, 9, 19, 2, 0), 5677],
                        [Date.UTC(2022, 9, 19, 3, 0), 4077],
                        [Date.UTC(2022, 9, 19, 4, 0), 3600],
                        [Date.UTC(2022, 9, 19, 5, 0), 2200],
                        [Date.UTC(2022, 9, 19, 6, 0), 7450],
                        [Date.UTC(2022, 9, 19, 7, 0), 9870],
                        [Date.UTC(2022, 9, 19, 8, 0), 11897],
                        [Date.UTC(2022, 9, 19, 9, 0), 12789],
                        [Date.UTC(2022, 9, 19, 10, 0), 11567],
                        [Date.UTC(2022, 9, 19, 11, 0), 10456],
                        [Date.UTC(2022, 9, 19, 12, 0), 10897],
                        [Date.UTC(2022, 9, 19, 13, 0), 10453],
                        [Date.UTC(2022, 9, 19, 14, 0), 9853],
                        [Date.UTC(2022, 9, 19, 15, 0), 10234],
                        [Date.UTC(2022, 9, 19, 16, 0), 11456],
                        [Date.UTC(2022, 9, 19, 17, 0), 12678],
                        [Date.UTC(2022, 9, 19, 18, 0), 14357],
                        [Date.UTC(2022, 9, 19, 19, 0), 15340],
                        [Date.UTC(2022, 9, 19, 20, 0), 16790],
                        [Date.UTC(2022, 9, 19, 21, 0), 13335],
                        [Date.UTC(2022, 9, 19, 22, 0), 9340],
                        [Date.UTC(2022, 9, 19, 23, 0), 8950],
                    ]
                }, {
                    name: "Actual (MW)",
                    data: [
                        [Date.UTC(2022, 9, 19, 0, 0), 8350],
                        [Date.UTC(2022, 9, 19, 1, 0), 7677],
                        [Date.UTC(2022, 9, 19, 2, 0), 5877],
                        [Date.UTC(2022, 9, 19, 3, 0), 4177],
                        [Date.UTC(2022, 9, 19, 4, 0), 3500],
                        [Date.UTC(2022, 9, 19, 5, 0), 2800],
                        [Date.UTC(2022, 9, 19, 6, 0), 7750],
                        [Date.UTC(2022, 9, 19, 7, 0), 9370],
                        [Date.UTC(2022, 9, 19, 8, 0), 12897],
                        [Date.UTC(2022, 9, 19, 9, 0), 11789],
                        [Date.UTC(2022, 9, 19, 10, 0), 11667],
                        [Date.UTC(2022, 9, 19, 11, 0), 10756],
                        [Date.UTC(2022, 9, 19, 12, 0), 10697],
                        [Date.UTC(2022, 9, 19, 13, 0), 10753],
                        [Date.UTC(2022, 9, 19, 14, 0), 9833],
                        [Date.UTC(2022, 9, 19, 15, 0), 10334],
                        [Date.UTC(2022, 9, 19, 16, 0), 11756],
                        [Date.UTC(2022, 9, 19, 17, 0), 12478],
                        [Date.UTC(2022, 9, 19, 18, 0), 14657],
                        [Date.UTC(2022, 9, 19, 19, 0), 15740],
                        [Date.UTC(2022, 9, 19, 20, 0), 16890],
                        [Date.UTC(2022, 9, 19, 21, 0), 14535],
                        [Date.UTC(2022, 9, 19, 22, 0), 7360],
                        [Date.UTC(2022, 9, 19, 23, 0), 6940],      
                    ]
                }, 
            ]
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}