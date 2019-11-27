import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as d3 from 'd3';

function BarChart2() {

    useEffect(() => {

        //*create a vertical bar chart

        //todo: create chart and specify height and y range
        let margin = {top: 20, right: 30, bottom: 30, left: 40},
            height = 420,
            barWidth = 32;

        let chart = d3.select('.vertical-bar')
            .attr('height', height + margin.top + margin.bottom);
        let y = d3.scaleLinear()
            .range([height, 0]); //! note: need to draw 420 to 0, because 0 is at bottom for vertical chart
            
            //todo: read data from external source
            d3.csv('./data/data3a.csv').then(function(data) {
                data.forEach(function(d) {
                    d.value = +d.value
                    return d;
                })
                // console.log(data)
                
                //todo: specify y domain and chart width
                chart.attr('width', barWidth * data.length + margin.left + margin.right);
                let x = d3.scaleLinear()
                    .range([0, barWidth * data.length])
                y.domain([0, d3.max(data, function(d) { return d.value;})])
                let xAxis = d3.axisBottom(x);
                let yAxis = d3.axisLeft(y);

                //todo: add axis to graph
                chart.append('g')
                .attr('transform', `translate (${margin.left}, ${margin.top})`)
                .attr('class', 'y axis')
                .call(yAxis);

                chart.append('g')
                .attr('transform', `translate (${margin.left}, ${margin.top + height})`)
                .attr('class', 'x axis')
                .call(xAxis);

            // //todo: create and position .bar (rect) for each data
            let bar = chart.selectAll('.bar')
                .data(data)
                .enter().append('g')
                .attr('class', 'bar')
                .attr('transform', function(d,i) { return `translate (${margin.left + barWidth * i}, ${margin.top})`})
                

            //todo: append element (rect) to each g
            bar.append('rect')
            .attr('width', barWidth - 1)
            .attr('height', function(d) {return height - y(d.value);}) //! y range is [height, 0]
            .attr('y', function(d) {return y(d.value)});

            //todo: append text to each g
            bar.append('text')
            .attr('x', barWidth /2)
            .attr('y', function(d) { return y(d.value) - 2})
            .text(function(d) { return d.value});
            
            //?============================== 2nd method (less efficient):================================
            // todo create and position .bar (rect) for each data
            // let bar = chart.selectAll('.bar')
            //     .data(data)
            //     .enter().append('rect')
            //     .attr('class', 'bar')
            //     .attr('transform', function(d,i) { return `translate (${margin.left}, ${margin.top})`})
            //     .attr('width', barWidth - 1)
            //     .attr('height', function(d) { return height - y(d.value)})
            //     .attr('y', function(d) { return y(d.value)})
            //     .attr('x', function(d, i) { return `${barWidth * i}`})

            // //todo: append text
            // chart.selectAll('.text')
            // .data(data)
            // .enter().append('text')
            // .attr('class', 'text')
            // .attr('transform', function(d,i) { return `translate (${margin.left}, ${margin.top})`})
            // .attr('dy', '0.75em')
            // .attr('x', function(d, i) {return barWidth * i + barWidth/2})
            // .attr('y', function(d) {return y(d.value) + 3;})
            // .text(function(d) { return d.value})
        })

    }, [])

    //todo: render a vertical bar chart with a letter ordinal
    useEffect(() => {
        //todo: step 1 create chart and initial setup
        let margin = {top: 20, right: 30, bottom: 30, left: 40},
            height = 500,
            width = 960;

        let chart = d3.select('.ordinal-data')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);

        //* scales
        let y = d3.scaleLinear()
            .range([height, 0]);
        let x = d3.scaleOrdinal();


        //* axis
        let yAxis = d3.axisLeft(y),
            xAxis = d3.axisBottom(x);

        //todo: step 2, import data and update initial setup
        d3.csv('./data/data3a.csv').then(function(data) {
            //* convert to number
                data.forEach(function(d) {
                    d.value = +d.value;
                    return d;
                });
                console.log(data)
            //* update initial setups
            let barWidth = width / data.length;
            y.domain([0, d3.max(data, function(d) { return d.value})]); //data range to max of data value
            
            let xRange = [],
                xDomain = [];
            data.forEach((d, i) => {
                xRange.push(barWidth * (i + 0.5))
                xDomain.push(d.name)
            })
            console.log(xRange, xDomain);
            x.domain(xDomain) // x domain to the name of data point
            .range(xRange) // x range
            //! is there a better way to setup xRange??

            //* add and position axis
            chart.append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate (${margin.left}, ${margin.top + height})`)
                .call(xAxis);

            chart.append('g')
                .attr('class', 'y axis')
                .attr('transform', `translate (${margin.left}, ${margin.top})`)
                .call(yAxis);
            
            //* add g for each data point
            let bar = chart.selectAll('.bar')
                .data(data)
                .enter().append('g')
                .attr('class', 'bar')
                .attr('transform', (d, i) => (`translate (${margin.left + i * barWidth}, ${margin.top})`));

            //* add element (rect) for each bar
            bar.append('rect')
                .attr('width', barWidth - 1.5)
                .attr('height', (d) => (height - y(d.value)))
                .attr('y', (d) => (y(d.value)));

            //* add label (text) for each bar
            bar.append('text')
                .attr('x', barWidth / 2)
                .attr('y', (d) => ( y(d.value) - 2 ))
                .text((d) => (d.value));
        });



        // let height = 500,
        //     width = 960;

        // let chart = d3.select('.ordinal-data')
        //     .attr('width', width)
        //     .attr('height', height)

        // //todo x scale with letter, preivous use default, not set
        // let x = d3.scaleOrdinal()
        //     .range([0, width], 0.1)
        //     // .domain(["A", "B", "C", "D", "E", "F"]) //example
        //     // .range([0, 1, 2, 3, 4, 5, 6]) // one to one

        // let y = d3.scaleLinear()
        //     .range([height, 0]);

        // // load data
        // d3.csv('./data/data3a.csv').then(function(data) {
        //     data.forEach(function(d) {
        //         d.value = +d.value;
        //         return d;
        //     });
        //     console.log(data); //*passed

        //     let barWidth = width / data.length;

        //     // set domain for x and y;
        //     // console.log(data.map(function(d) {return d.name}))
        //     y.domain([0, d3.max(data, function(d) { return d.value })]);
        //     x.domain(data.map(function(d) { return d.name})); //todo 2nd step to set an ordinal x bar.

        //     //append g to each data and position it
        //     let bar = chart.selectAll('g')
        //         .data(data)
        //         .enter().append('g')
        //         .attr('transform', function(d, i) {return `translate (${barWidth*i}, 0)`});

        //     //append rect to each g, set dimension and position it.
        //     bar.append('rect')
        //     .attr('width', barWidth - 1)
        //     .attr('height', function(d) {return height - y(d.value)})
        //     .attr('y', function(d) {return y(d.value)});

        //     //append text to each rect
        //     bar.append('text')
        //     .attr('x', barWidth/2)
        //     .attr('y', function(d) {return y(d.value) + 10})
        //     .text(function(d) {return d.value})


        // })


    }, [])

    return (
        <div>
            <h2>Advanced Bar Charts</h2>
            <div>
                <Link to='/barchart'>Basic Bar Charts</Link> | {' '}
                <Link to ='/barchart2'>Advanced Charts</Link>
            </div>

            <div className="chart">
                <h3>A Vertical Bar Chart</h3>
                <svg className="vertical-bar"></svg>
            </div>

            <div className="chart">
                <h3>Ordinal Data</h3>
                <svg className="ordinal-data">

                </svg>
            </div>
        </div>
    )
}

export default BarChart2;