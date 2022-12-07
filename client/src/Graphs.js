import React, {useEffect, useRef, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Graphs.css'

const heat = require('highcharts/modules/heatmap');
heat(Highcharts);

export /* class */ function ScatterPlot(props) /* extends React.Component */ {
    /* constructor(props) {
        super(props);
    } */
    const [stateData, setStateData] = useState({})
    const [linepoints, setLinePoints] = useState([])
    const [slope, setSlope] = useState(1);
    const [yint, setYint] = useState(0);
    const {data, height} = props;
    const [graphData, setGraphData] = useState()

    function grabData(obj){
        let ret = {}
        let cap = 0;
        try{cap = obj.PNODE_NAME.length}catch{cap = 0}

        let n = cap;
        let sumxy = 0;
        let sumx = 0;
        let sumy = 0;
        let sumxsqure = 0
        let minx = Infinity;
        let maxx = -Infinity;

        let entered = false;
        for(let i = 0; i < cap; i++){
            let index = obj["PNODE_NAME"][i].toString() + obj["PERIOD_ID"][i].toString();
            if(!ret.hasOwnProperty(index)){ret[index] = {x: null, y: null, z: obj["PNODE_NAME"][i], time: new Date(obj["PERIOD_ID"][i]).getTime(), yset: false}}
            if(obj["SCENARIO_ID"][i] === '1') {
                ret[index].x = parseFloat(obj["LMP"][i])
                ret[index].y = parseFloat(obj["LMP"][i])

                minx = Math.min(minx, ret[index].x)
                maxx = Math.max(maxx, ret[index].x)

                sumx += ret[index].x;
                sumxsqure += (ret[index].x * ret[index].x);
            }
            else {
                ret[index].y = parseFloat(obj["LMP"][i])
                ret[index].yset = true;
                entered=true;
                sumy += ret[index].y;
            }
            if(ret[index].x !== null && ret[index].yset){
                sumxy += ret[index].x * ret[index].y;
            }
        }

        ret = Object.values(ret)

        let points = [[minx,minx],[maxx,maxx]]
        
        if(!entered){
            setSlope(1)
            setYint(0)
        }else{
            let slope = ((n * sumxy) - (sumx * sumy)) / ((n * sumxsqure) - (sumx * sumx))
            let yinter = (sumy / n) - (slope * (sumx / n))

            function getPoint(xval){
                return {x: xval, y: (xval*slope+yinter) }
            }
/* 
            setYint(yinter);
            setSlope(slope); */
            handleSlope(slope, yinter)
            points = [getPoint(minx), getPoint(maxx)];
        }
        
        return [ret, points];
    }

    useEffect(() => {
        setStateData(data)
    }, [data])

    
    function handleSlope(slp, y){
        setYint(y)
        setSlope(slp);
    }

    useEffect(() => {
        const grab = grabData(stateData)

        setGraphData(grab[0]);
        setLinePoints(grab[1]);
        
        //console.log(graphData)
    }, [stateData])

    /*
    useEffect(() => {
        setLinePoints(startEndPoints(graphData))
        console.log(linepoints)
    }, [graphData])
    */
    /*
    function startEndPoints(data){
        let n = data?.length
        let sumxy = 0;
        let sumx = 0;
        let sumy = 0;
        let sumxsqure = 0
        let minx = Infinity;
        let maxx = -Infinity;
        for(let i = 0; i < n; ++i){
            minx = Math.min(minx, data[i].x)
            maxx = Math.max(maxx, data[i].x)
            sumxy += data[i].x * data[i].y;
            sumx += data[i].x;
            sumy += data[i].y;
            sumxsqure += (data[i].x * data[i].x);
        }
        let slope = ((n * sumxy) - (sumx * sumy)) / ((n * sumxsqure) - (sumx * sumx))
        let yinter = (sumy / n) - (slope * (sumx / n))
        function getPoint(xval){
            return {x: xval, y: (xval*slope+yinter) }
        }
        setSlope(slope);
        return [ getPoint(minx), getPoint(maxx) ]
    }  
    */

    /* render() { */
        const options = {
            chart: {
                height: height+'%',
            },
            title: {
                text: 'Scatter Plot with Regression Line'
            },
            xAxis: {
                title: {
                    text: 'Base Case LMP'
                },
            },
            yAxis: {
                title: {
                    text: 'Simulation Case LMP'
                },
                lineWidth: 1,
                lineColor: '#E2E7FF'
            },
        series: [
            {
                type: 'scatter',
                name: 'Node Data',
                data: graphData
                    /*[{x: 30 , y : 30 , z: "help"},]  or  [1, 1.5, 2.8, 3.5, 3.9, 4.2] */,
                marker: {
                    radius: 4
                },
                tooltip: {
                    pointFormat: 'Base Case: {point.x} <br/> Scenario: {point.y} <br/> Name: {point.z} <br/> Time: {point.time:%Y-%m-%d %H:%M:%S}'
                },
            },
            {
                type: 'line',
                name: 'Regression Line',
                data: linepoints, //[dat[0], dat[dat.length-1]],
                color: "#60A4FC",
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 0
                    }
                },
                enableMouseTracking: true,
                tooltip: {
                    headerFormat: "X: ",
                    pointFormat: '{point.x:.5f} <br/> Y : {point.y:.5f} <br/> Slope: ' + slope.toFixed(5) + '<br/> Y-int: ' + yint.toFixed(5),
                },
            },
            /*
            {
                type: 'scatter',
                name: 'Simulation Case',
                data: dat.set2
                // [
                    [1,1.8],
                    [4,3.5],
                    [3,3],
                    [2,2],
                    [2.5,2.6],
                ] //,
                marker: {
                    radius: 2,
                },
                color:"#19B5D5",
                visible:false
            },
            */
        ]
    }
    return (
        <div
            style={{
                width: "100%",
                height: "100%"
                // border: "1px solid #ccc",
                // padding: "10px",
                // cursor: "pointer"
            }}
        >
            <HighchartsReact
                containerProps={{ style: { height: "100%" } }}
                highcharts={Highcharts}
                options={options}
                allowChartUpdate={true}
            /* ref={chartComponent} */
            />
        </div>
    );
    /* } */
}

export function Histogram(props) {
        const { mainText, subText, data, bucket, metric , height} = props;

        const [stateMetric, setStateMetric] = useState(metric);
        const [stateData, setStateData] = useState({});
        const [graphData, setGraphData] = useState([]);

        useEffect(() => {
            if(metric !== undefined){
            setStateMetric(metric);
            }
        },[metric])

        useEffect(() => {
            if(data !== undefined){
            setStateData(data);
            }
        },[data])

        function grabData(data, metric){
            if(data === undefined && metric !== undefined && Object.keys(data).length !== 0){return undefined;}
            //console.log(data)

            let ret ={xAxis:[], series:null};

            let cap = 0;
            try{cap = data[metric].length} catch{cap = 0;}

            let min = Infinity;
            let max = -Infinity;
            data[metric]?.forEach((elem) => {
                if(elem)
                min = Math.min(min,elem); 
                max = Math.max(max,elem)
            })

            /* console.log(min)
            console.log(max) */

            let ser = [];

            for(let i = min; i <= max; i+=bucket){
                let obj = {y:0, percent:"0%"}
                ser.push(obj)

                let str = i.toFixed(2) + "-" + (i+bucket).toFixed(2);
                ret.xAxis.push(str)
            }

            //console.log(ser)

            let elems = 0;
            
            for(let i = 0; i < cap; ++i){
                if(data.base && data["SCENARIO_ID"][i] === '1' && data[metric][i] !== ''){
                    let valBuck = Math.floor((data[metric][i] - min) / bucket);
                    ser[valBuck].y += 1;
                    elems += 1;
                } else if(!data.base && data["SCENARIO_ID"][i] !== '1' && data[metric][i] !== ''){
                    let valBuck = Math.floor((data[metric][i] - min) / bucket);
                    ser[valBuck].y += 1;
                    elems += 1;
                }
            }

            for(let i = 0; i < ret.xAxis.length; ++i){
                ser[i].percent = ((ser[i].y / elems)*100).toFixed(2) + "%";
            }

            ret.series = ser;

            return ret;
        }

        useEffect(() => {
            const grab = grabData(stateData, stateMetric)
            setGraphData(grab);
        }, [stateMetric, stateData]);

        const options = {
            chart: {
                type: 'column',
                height: height+"%",
            },
            series: [{
                name: 'Value (' + stateMetric + ")",
                data: graphData.series
            },],
            title: {
                text: mainText
            },
            subtitle: {
                text: subText
            },
            xAxis: {
                categories: graphData.xAxis,
                
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Occurences'
                },
                lineWidth: 1,
                lineColor: '#E2E7FF'
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px">Range: {point.x}</span><br/>',
                pointFormat: 'Occurences: : {point.y:.0f} <br/> Percent: {point.percent} ',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 1,
                    groupPadding: 0,
                    shadow: false
                },
            },
            
        }

        return (
            <HighchartsReact
                // containerProps={{ style: { height: "100%"}}}
                highcharts={Highcharts}
                options={options}
            />
        );
}

function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

/* function makeCells() {
    let cells = [];
    for (let i = 0; i < 24; ++i) {
        for (let j = 0; j < 12; ++j) {
            cells.push([j, i, Math.floor(Math.random() * 10)])
        }
    }
    return cells;
} */

export function HeatMap (props){

        const {data, inc, name, height} = props;
        const [stateData, setStateData] = useState(data);
        const [graphData, setGraphData] = useState();
        const [stateMetric, setStateMetric] = useState("LMP");
        const [includeBase, setIncludeBase] = useState(inc);
        const [stateName, setStateName] = useState(name);

        useEffect(() => { 
            setStateName(name)
        }, [name])

        useEffect(()=>{
            setIncludeBase(inc);
        },[inc])

        /* useEffect(()=>{
            setStateMetric(metric)
        },[metric]) */

        useEffect(()=>{
            setStateMetric("LMP");
        },[])
        
        useEffect(()=>{
            if(data !== undefined){
            setStateData(data);
            }
        },[data])

        useEffect(()=>{
            if(stateData !== undefined && stateMetric !== undefined){
            const grab = grabData(stateData, stateMetric, includeBase, stateName)
            setGraphData(grab)
            //console.log(graphData)
            }
            
        }, [stateData, stateMetric, includeBase, stateName])

        function grabData(data, metric, inc, name){
            if(data !== undefined){
            let arr = []
            for(let month = 0; month < 12; ++month){
                arr.push(new Array(24))
            }

            let totalexpected = 0;
            for(let i = 0; i < data[metric]?.length; ++i){
                totalexpected += parseFloat(data[metric][i])
            }
            totalexpected = totalexpected / data[metric]?.length;

            //console.log(data)
            for(let i = 0; i < data[metric]?.length; ++i){
                if((data["SCENARIO_ID"][i] !== "1" || inc) && data[metric][i] !== '' && (name === "All" || data["PNODE_NAME"][i] === name)){
                    let tempDate = new Date(data["PERIOD_ID"][i])
                    let hour = tempDate.getHours();
                    let month = tempDate.getMonth();
                    if (arr[month][hour] === undefined) { arr[month][hour] = {sum: 0, count: 0 , max:-Infinity , node: null, scen: null}}
                    let val = data[metric][i];
                    let error = Math.abs((((totalexpected) - val) / val)*100);
                    //console.log(error)
                    arr[month][hour].sum += error
                    arr[month][hour].count += 1;
                    //arr[month][hour].max = Math.max(error, arr[month][hour].max)
                    if(arr[month][hour].max < error){
                        arr[month][hour].max = error;
                        arr[month][hour].node = data["PNODE_NAME"][i];
                        arr[month][hour].scen = data["SCENARIO_ID"][i];
                    }
                }
            }
            
            let ret = [];

            for(let month = 0; month < 12; ++month){
                for(let hour = 0; hour < 24; ++hour){
                    if(arr[month][hour] === undefined){ret.push([month,hour,undefined])}
                    else{
                        ret.push({x:month, y:hour, value: parseFloat((arr[month][hour].max).toFixed(2)), name:arr[month][hour].node, count:arr[month][hour].count, ave:(arr[month][hour].sum/arr[month][hour].count).toFixed(2), scen:arr[month][hour].scen})
                        //ret.push([month,hour, parseFloat((arr[month][hour].max).toFixed(3)), "hello"])
                    }
                }
            }

            
            return ret;
            }
        }

        const options = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1,
                height: height+'%',
            },


            title: {
                text: 'Maximum Absolute Percent Errors (LMP)'
            },

            xAxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                title: {
                    text: 'Months'
                }
            },

            yAxis: {
                categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                title: {
                    text: 'Hour'
                },
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
                symbolHeight: 226.5
           },

            tooltip: {
                headerFormat: '',
                formatter: function () {
                    return '<b> ' + this.point.value +
                        ' </b>% at <b> ' + this.point.y +
                        ':00 </b> on <b>  ' + getPointCategoryName(this.point, 'x') +
                        '</b> <br/> Node: <b>' + this.point.name +
                        ' </b> <br/> Count: <b>' + this.point.count +
                        '</b> <br/> Average: <b>' + this.point.ave +
                        '%</b> <br/> Scen: <b>' + this.point.scen + '</b>';
                }
                //pointFormat: '<b> '+'this.point.value'+' </b>% at <b> {point.y}:00 </b> on <b>  ' + getPointCategoryName(this.point, 'x') + ' </b> <br/> Count: <b>{point.count}</b> <br/> Average: <b>{point.ave:.2f}%</b>'
                /* formatter: function () {
                    return '<b>' + this.point.value + ' </b>% at <b>'    + getPointCategoryName(this.point, 'y') + '</b> on <b>' + getPointCategoryName(this.point, 'x') + '</b> <br/> ' + getPointCategoryName(this.point, 'hello');
                } */
            },

            series: [{
                name: 'Month',
                borderWidth: 1,
                data: graphData,
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
                    // chartOptions: {
                    //     yAxis: {
                    //         labels: {
                    //             formatter: function () {
                    //                 return this.value.charAt(0);
                    //             }
                    //         }
                    //     }
                    // }
                }]
            }
        }

        return (
            <div
            style={{
                width: "100%",
                height: "100%"
                // border: "1px solid #ccc",
                // padding: "10px",
                // cursor: "pointer"
            }}
            >
            <HighchartsReact
                containerProps={{ style: { height: "100%"}}}
                highcharts={Highcharts}
                options={options}
            />
            </div>

        );
}

export function LineChart(props) {
    /*
    Have some function receive Data as a Constructor/Parameter
    Format for Specific Graph
    Display
    */
    const {data, height, metric} = props

    function grabData(obj){
        let newret = [{name: "Actual (" + metric + ") Scenario (1)", data: [], scen: '1', color: "#3333FF"}]
        let cap = 0;
        try{cap = obj.PERIOD_ID.length}catch{cap = 0}

        for(let i = 0; i < cap; i++){
            let scen = obj["SCENARIO_ID"][i];
            let pointer = newret.find((elem) => elem.scen === scen);
            if(pointer === undefined){ pointer = {name: "Forcasted (" + metric + ") Scenario ("+scen+")", data: [], scen: scen, color: "#FF3333"}; newret.push(pointer);}
            let toPush = {x: new Date(obj["PERIOD_ID"][i]).getTime(), y:  parseFloat(obj[metric][i]), z: (obj['PNODE_NAME'][i])};

            pointer.data.push(toPush);

           /*  if(obj["SCENARIO_ID"][i] === '1'){
                ret.set1.push(toPush)
            }
            else{   
                ret.set2.push(toPush)
            } */

        }
        /* return ret; */
        return newret;
    }
    let dat = grabData(data);
    /* console.log(dat) */

    const options = {
        chart: {
            height: height+'%',
            type: 'spline'
        },
        title: {
            text: 'System ('+metric+")"
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
            lineWidth: 1,
            lineColor: '#E2E7FF'
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Time: {point.x:%Y-%m-%d %H:%M:%S} <br/> MW: {point.y:.2f} <br/> Name: {point.z}'
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
        series: dat
    }

    const chartComponent = useRef(null);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                // border: "1px solid #ccc",
                // padding: "10px",
                // cursor: "pointer"
            }}
        >
            <HighchartsReact
                containerProps={{ style: { height: "100%" } }}
                ref={chartComponent}
                highcharts={Highcharts}
                options={options}
                allowChartUpdate={true}
            />
        </div>
    );
}


export function PeroidButton(props){
    const [period, setPeriod] = useState("All")
    const {setParentPeriod} = props;
    const [allButton, setAllButton] = useState("blackButton")
    const [yearButton, setYearButton] = useState("blackButton")
    const [quarterButton, setQuarterButton] = useState("blackButton")
    const [monthButton, setMonthButton] = useState("blackButton")
    const [weekButton, setWeekButton] = useState("blackButton")
    const [dayButton, setDayButton] = useState("blackButton")
    const [hourButton, setHourButton] = useState("blackButton")
    const [minButton, setMinButton] = useState("blackButton")

    const handleChange = (str) => {
        setPeriod(str);
    };
    
    useEffect(() => {
        if(period === "All") {setAllButton("whiteButton")}
        else{setAllButton("blackButton")}

        if(period === "Year") {setYearButton("whiteButton")}
        else{setYearButton("blackButton")}

        if(period === "Quarter") {setQuarterButton("whiteButton")}
        else{setQuarterButton("blackButton")}

        if(period === "Month") {setMonthButton("whiteButton")}
        else{setMonthButton("blackButton")}

        if(period === "Week") {setWeekButton("whiteButton")}
        else{setWeekButton("blackButton")}

        if(period === "Day") {setDayButton("whiteButton")}
        else{setDayButton("blackButton")}

        if(period === "Hour") {setHourButton("whiteButton")}
        else{setHourButton("blackButton")}

        if(period === "Min") {setMinButton("whiteButton")}
        else{setMinButton("blackButton")}


        setParentPeriod(period);
        
    }, [period])

    return (
    <div className='buttonBox'>
      <button className={allButton} onClick={() => handleChange('All')}>All</button>
      <button className={quarterButton} onClick={() => handleChange('Quarter')}>Quarterly</button>
      <button className={yearButton} onClick={() => handleChange('Year')}>Yearly</button>
      <button className={monthButton} onClick={() => handleChange('Month')}>Monthly</button>
      <button className={weekButton} onClick={() => handleChange('Week')}>Weekly</button>
      <button className={dayButton} onClick={() => handleChange('Day')}>Daily</button>
      <button className={hourButton} onClick={() => handleChange('Hour')}>Hourly</button>
      <button className={minButton} onClick={() => handleChange('Min')}>Minutely</button>
    </div>

    );
}

export function DataTable(props) {
    const { period, data, metric, group } = props;
    const [stateData, setStateData] = useState();
    const [stats, setStats] = useState([]);
    const [stateMetric, setStateMetric] = useState(metric);
    const [statePeriod, setStatePeriod] = useState(period);
    const [groupby, setGroupby] = useState(group);
    
    useEffect(() => {
        setGroupby(group)
    }, [group])

    useEffect(() => {
        setStateData(data)
    }, [data])

    useEffect(() => {
        setStatePeriod(period)
    }, [period])

    useEffect(() => {
        setStateMetric(metric)
    }, [metric])

    useEffect(() => {
        const grab = grabData(stateData)
        setStats(grab);
    }, [stateData, statePeriod, stateMetric, groupby])


    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    function grabData(data) {
        if (data === undefined || Object.keys(data).length === 0) { return []; }
        //console.log(data)

        let start = new Date();
        let end = new Date(0);


        data["PERIOD_ID"]?.forEach((date) => {
            start = Math.min(new Date(date), start)
            end = Math.max(new Date(date), end)
        })

        start = new Date(start)
        end = addMinutes(new Date(end), 0);

        let editDate;
        if (statePeriod === 'All') {
            editDate = (elem) => end;
        }
        else if (statePeriod === 'Year') {
            editDate = (elem) => new Date(Math.min(addMinutes(elem, 525600), end));
        }
        else if (statePeriod === 'Quarter') {
            editDate = (elem) => new Date(Math.min(addMinutes(elem, 525600 / 4), end));
        }
        else if (statePeriod === 'Month') {
            editDate = (elem) => new Date(Math.min(addMinutes(elem, 43800), end));
        }
        else if (statePeriod === 'Day') {
            editDate = (elem) => new Date(Math.min(addMinutes(elem, 1440), end));
        }
        else if (statePeriod === 'Hour') {
            editDate = (elem) => new Date(Math.min(addMinutes(elem, 60), end));
        }
        else if (statePeriod === 'Min') {
            editDate = (elem) => new Date(Math.min(addMinutes(elem, 1), end));
        } else {
            editDate = (elem) => end;
        }

        let ret = []

        for (let i = start; i < end; i = editDate(i)) {
            let objtotal = { startdate: i, group: 'All', min: Infinity, max: -Infinity, mean: null, dev: null, count: 0, sum:0, arr: []}
            let objarr = []

            let tempEnd = addMinutes(editDate(i), -(1 / 60.0));

            for (let j = 0; j < data[stateMetric]?.length; ++j) {

                let thisDate = new Date(data["PERIOD_ID"][j]);

                if (thisDate >= i && thisDate <= tempEnd) {
                    if (data[stateMetric][j] !== "") {
                        let val = parseFloat(data[stateMetric][j]);

                        /* if (data["SCENARIO_ID"][j] === '1') {
                            objbase.min = Math.min(objbase.min, val)
                            objbase.max = Math.max(objbase.max, val)
                            objbase.count += 1;
                            objbase.sum += val
                            objbase.arr.push(val);

                        } else { */
                        let group = data[groupby][j];
                        let point = objarr.find((elem) => elem.group === group)

                        if (point === undefined && group !== undefined) {
                            point = { startdate: i, group: group, min: Infinity, max: -Infinity, mean: null, dev: null, count: 0, sum: 0, arr: [] };
                            objarr.push(point);
                        }

                        if (group !== undefined) {
                            point.min = Math.min(point.min, val)
                            point.max = Math.max(point.max, val)
                            point.count += 1;
                            point.sum += val
                            point.arr.push(val);

                            objtotal.min = Math.min(objtotal.min, val)
                            objtotal.max = Math.max(objtotal.max, val)
                            objtotal.count += 1;
                            objtotal.sum += val
                            objtotal.arr.push(val);
                        }
                    }
                }
            }
            objarr.push(objtotal);

            /* if(objbase.count !== 0){
                objbase.mean = basesum / objbase.count;
                objbase.dev = Math.sqrt(basedat.reduce((prev,elem)=>(prev+(elem-objbase.mean)*(elem-objbase.mean)),0) / objbase.count);
                ret.push(objbase);
            } */

            objarr.forEach((objscen) => {
                if (objscen.scen !== null && objscen.count !== 0) {
                    objscen.mean = objscen.sum / objscen.count;
                    objscen.dev = Math.sqrt(objscen.arr.reduce((prev, elem) => (prev + ((elem - objscen.mean) * (elem - objscen.mean))), 0) / objscen.count);
                    ret.push(objscen);
                }
            });
        }

        return ret;
    }

    return (
        <div className='DataTable'>
            <table>
                <tbody>
                    <tr>
                        <th>Period Start</th>
                        <th>Group <br></br>({groupby})</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Mean</th>
                        <th>STD-Dev</th>
                        <th>Count</th>
                    </tr>
                    {
                        stats?.map((elem) => {
                            return (
                                <tr key={elem.startdate + elem.group}>
                                    <td>{elem.startdate.toISOString().split("T")[0]} <br /> {"T" + elem.startdate.toISOString().split("T")[1]}</td>
                                    <td>{elem.group}</td>
                                    <td>{elem.min}</td>
                                    <td>{elem.max}</td>
                                    <td>{elem.mean.toFixed(3)}</td>
                                    <td>{elem.dev.toFixed(4)}</td>
                                    <td>{elem.count}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}


                /*
        <tr>
          <td>Date 1</td>
          <td>Scen</td>
          <td>Min</td>
          <td>Max</td>
          <td>Std-Dev</td>
          <td>Mean</td>
          <td>Count</td>
        </tr>
         <tr>
          <td>Date 1</td>
          <td>Scen</td>
          <td>Min</td>
          <td>Max</td>
          <td>Std-Dev</td>
          <td>Mean</td>
          <td>Count</td>
        </tr>
        <tr>
          <td>Date 1</td>
          <td>Scen</td>
          <td>Min</td>
          <td>Max</td>
          <td>Std-Dev</td>
          <td>Mean</td>
          <td>Count</td>
        </tr> */
            


// export class LineChart extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         const options = {
//             chart: {
//                 type: 'spline'
//             },
//             title: {
//                 text: 'System Demand'
//             },
//             subtitle: {
//                 text: 'Forecasted & Actual'
//             },
//             xAxis: {
//                 type: 'datetime',
//                 dateTimeLabelFormats: { // don't display the dummy year
//                     hour: '%H:%M',
//                     year: '%b'
//                 },
//                 title: {
//                     text: 'Hour'
//                 }
//             },
//             yAxis: {
//                 title: {
//                     text: 'MW'
//                 },
//                 min: 0
//             },
//             tooltip: {
//                 headerFormat: '<b>{series.name}</b><br>',
//                 pointFormat: '{point.x:%H:%M}: {point.y:.2f} MW'
//             },

//             plotOptions: {
//                 series: {
//                     marker: {
//                         enabled: true,
//                         radius: 2.5
//                     }
//                 }
//             },

//             colors: ['Crimson', 'DeepSkyBlue'],
//             // colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

//             // Define the data points. All series have a dummy year of 1970/71 in order
//             // to be compared on the same x axis. Note that in JavaScript, months start
//             // at 0 for January, 1 for February etc.
//             series: [
//                 {
//                     name: "Forecasted (MW)",
//                     data: [
//                         [Date.UTC(2022, 9, 19, 0, 0), 8250],
//                         [Date.UTC(2022, 9, 19, 1, 0), 7777],
//                         [Date.UTC(2022, 9, 19, 2, 0), 5677],
//                         [Date.UTC(2022, 9, 19, 3, 0), 4077],
//                         [Date.UTC(2022, 9, 19, 4, 0), 3600],
//                         [Date.UTC(2022, 9, 19, 5, 0), 2200],
//                         [Date.UTC(2022, 9, 19, 6, 0), 7450],
//                         [Date.UTC(2022, 9, 19, 7, 0), 9870],
//                         [Date.UTC(2022, 9, 19, 8, 0), 11897],
//                         [Date.UTC(2022, 9, 19, 9, 0), 12789],
//                         [Date.UTC(2022, 9, 19, 10, 0), 11567],
//                         [Date.UTC(2022, 9, 19, 11, 0), 10456],
//                         [Date.UTC(2022, 9, 19, 12, 0), 10897],
//                         [Date.UTC(2022, 9, 19, 13, 0), 10453],
//                         [Date.UTC(2022, 9, 19, 14, 0), 9853],
//                         [Date.UTC(2022, 9, 19, 15, 0), 10234],
//                         [Date.UTC(2022, 9, 19, 16, 0), 11456],
//                         [Date.UTC(2022, 9, 19, 17, 0), 12678],
//                         [Date.UTC(2022, 9, 19, 18, 0), 14357],
//                         [Date.UTC(2022, 9, 19, 19, 0), 15340],
//                         [Date.UTC(2022, 9, 19, 20, 0), 16790],
//                         [Date.UTC(2022, 9, 19, 21, 0), 13335],
//                         [Date.UTC(2022, 9, 19, 22, 0), 9340],
//                         [Date.UTC(2022, 9, 19, 23, 0), 8950],
//                     ]
//                 }, {
//                     name: "Actual (MW)",
//                     data: [
//                         [Date.UTC(2022, 9, 19, 0, 0), 8350],
//                         [Date.UTC(2022, 9, 19, 1, 0), 7677],
//                         [Date.UTC(2022, 9, 19, 2, 0), 5877],
//                         [Date.UTC(2022, 9, 19, 3, 0), 4177],
//                         [Date.UTC(2022, 9, 19, 4, 0), 3500],
//                         [Date.UTC(2022, 9, 19, 5, 0), 2800],
//                         [Date.UTC(2022, 9, 19, 6, 0), 7750],
//                         [Date.UTC(2022, 9, 19, 7, 0), 9370],
//                         [Date.UTC(2022, 9, 19, 8, 0), 12897],
//                         [Date.UTC(2022, 9, 19, 9, 0), 11789],
//                         [Date.UTC(2022, 9, 19, 10, 0), 11667],
//                         [Date.UTC(2022, 9, 19, 11, 0), 10756],
//                         [Date.UTC(2022, 9, 19, 12, 0), 10697],
//                         [Date.UTC(2022, 9, 19, 13, 0), 10753],
//                         [Date.UTC(2022, 9, 19, 14, 0), 9833],
//                         [Date.UTC(2022, 9, 19, 15, 0), 10334],
//                         [Date.UTC(2022, 9, 19, 16, 0), 11756],
//                         [Date.UTC(2022, 9, 19, 17, 0), 12478],
//                         [Date.UTC(2022, 9, 19, 18, 0), 14657],
//                         [Date.UTC(2022, 9, 19, 19, 0), 15740],
//                         [Date.UTC(2022, 9, 19, 20, 0), 16890],
//                         [Date.UTC(2022, 9, 19, 21, 0), 14535],
//                         [Date.UTC(2022, 9, 19, 22, 0), 7360],
//                         [Date.UTC(2022, 9, 19, 23, 0), 6940],      
//                     ]
//                 }, 
//             ]
//         }


//         return (
//             <HighchartsReact
//                 containerProps={{ style: { height: "100%"}}}
//                 highcharts={Highcharts}
//                 options={options}
//             />

//         );
//     }
// }

