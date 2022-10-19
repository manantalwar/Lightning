import React from 'react';
// import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
<script src="http://code.highcharts.com/modules/heatmap.js"></script>

const heat = require('highcharts/modules/heatmap');
heat(Highcharts);

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

export class Pie3D extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const options = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Renewable Energy'
            },
            subtitle: {
                text: 'Renewable Sources'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Share',
                data: [
                    ['Samsung', 23],
                    ['Apple', 18],
                    {
                        name: 'Xiaomi',
                        y: 12,
                        sliced: true,
                        selected: true
                    },
                    ['Oppo*', 9],
                    ['Vivo', 8],
                    ['Others', 30]
                ]
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

export class Donut3D extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Resource Mix'
            },
            subtitle: {
                text: 'Resources'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Resources',
                data: [
                    ['Natural Gas', 41],
                    ['Nuclear', 26],
                    ['Net Imports', 16],
                    ['Hydro', 9],
                    ['Renewables', 7],
                    ['Other', 1],
                ]
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

function formatAsPercent(num) {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
}

export class PieChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        const options = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Browser market shares. January, 2022'
            },
            subtitle: {
                text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            series: [{
                name: "Browsers",
                colorByPoint: true,
                data: [
                        {
                            name: "Chrome",
                            y: 61.04,
                            drilldown: "Chrome"
                        },
                        {
                            name: "Safari",
                            y: 9.47,
                            drilldown: "Safari"
                        },
                        {
                            name: "Edge",
                            y: 9.32,
                            drilldown: "Edge"
                        },
                        {
                            name: "Firefox",
                            y: 8.15,
                            drilldown: "Firefox"
                        },
                        {
                            name: "Other",
                            y: 11.02,
                            drilldown: null
                        }
                    ]
                }
            ],
            drilldown: {
                series: [
                    {
                        name: "Chrome",
                        id: "Chrome",
                        data: [
                            [
                                "v97.0",
                                36.89
                            ],
                            [
                                "v96.0",
                                18.16
                            ],
                            [
                                "v95.0",
                                0.54
                            ],
                            [
                                "v94.0",
                                0.7
                            ],
                            [
                                "v93.0",
                                0.8
                            ],
                            [
                                "v92.0",
                                0.41
                            ],
                            [
                                "v91.0",
                                0.31
                            ],
                            [
                                "v90.0",
                                0.13
                            ],
                            [
                                "v89.0",
                                0.14
                            ],
                            [
                                "v88.0",
                                0.1
                            ],
                            [
                                "v87.0",
                                0.35
                            ],
                            [
                                "v86.0",
                                0.17
                            ],
                            [
                                "v85.0",
                                0.18
                            ],
                            [
                                "v84.0",
                                0.17
                            ],
                            [
                                "v83.0",
                                0.21
                            ],
                            [
                                "v81.0",
                                0.1
                            ],
                            [
                                "v80.0",
                                0.16
                            ],
                            [
                                "v79.0",
                                0.43
                            ],
                            [
                                "v78.0",
                                0.11
                            ],
                            [
                                "v76.0",
                                0.16
                            ],
                            [
                                "v75.0",
                                0.15
                            ],
                            [
                                "v72.0",
                                0.14
                            ],
                            [
                                "v70.0",
                                0.11
                            ],
                            [
                                "v69.0",
                                0.13
                            ],
                            [
                                "v56.0",
                                0.12
                            ],
                            [
                                "v49.0",
                                0.17
                            ]
                        ]
                    },
                    {
                        name: "Safari",
                        id: "Safari",
                        data: [
                            [
                                "v15.3",
                                0.1
                            ],
                            [
                                "v15.2",
                                2.01
                            ],
                            [
                                "v15.1",
                                2.29
                            ],
                            [
                                "v15.0",
                                0.49
                            ],
                            [
                                "v14.1",
                                2.48
                            ],
                            [
                                "v14.0",
                                0.64
                            ],
                            [
                                "v13.1",
                                1.17
                            ],
                            [
                                "v13.0",
                                0.13
                            ],
                            [
                                "v12.1",
                                0.16
                            ]
                        ]
                    },
                    {
                        name: "Edge",
                        id: "Edge",
                        data: [
                            [
                                "v97",
                                6.62
                            ],
                            [
                                "v96",
                                2.55
                            ],
                            [
                                "v95",
                                0.15
                            ]
                        ]
                    },
                    {
                        name: "Firefox",
                        id: "Firefox",
                        data: [
                            [
                                "v96.0",
                                4.17
                            ],
                            [
                                "v95.0",
                                3.33
                            ],
                            [
                                "v94.0",
                                0.11
                            ],
                            [
                                "v91.0",
                                0.23
                            ],
                            [
                                "v78.0",
                                0.16
                            ],
                            [
                                "v52.0",
                                0.15
                            ]
                        ]
                    }
                ]
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