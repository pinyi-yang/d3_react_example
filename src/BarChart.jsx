import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';

function BarChart() {
    //* Keywords

     // const initialBooks = [
    //     {
    //         name: "Harry Potter",
    //         author: "J. K. Rowling",
    //         genre: "fantasy",
    //     }, {
    //         name: "The PEdagogy of Freedom",
    //         author: "Bell Hooks",
    //         genre: "non-ficiton"
    //     }, {
    //         name: "Harry Potter 2",
    //         author: "J. K. Rowling",
    //         genre: "fantasy"
    //     }, {
    //         name: "Gilgamesh",
    //         author: "Derrek Hines",
    //         genre: "poetry"
    //     }
    // ]
    // const [books, setBooks] = useState(initialBooks);

    const [data, setData] = useState([30, 86, 168, 281, 303, 365]);
    const [svgData, setSvgData] = useState([4, 8, 15, 16, 23, 42]);

    useEffect(() => {
        //render a simple barchart
        d3.select('.simple-barchart') //chart
        .selectAll('div') //bar
        .data(data) //barUpdate
        .enter()
        .append('div') //barEnter
        .style("width", function(d) { return `${d}px` })
        .text(function(d) { return d })

        //scale to fit
        let x = d3.scaleLinear()
                .domain([0, d3.max(data)]) //?data space: domain set to be max
                .range([0, 800]) //?display space: div or image size
        
        d3.select('.scale-to-fit') // chart
        .selectAll('div') // bar
        .data(data) //barUpdate
        .enter().append('div') // barEnter
        .style("width", function(d) { return `${x(d)}px`; })
        .text(function(d) {return d; });

    }, [data])

    useEffect(() => {
        //todo render a svg image
        //1. define image size and scale
        let width = 800,
            barHeight = 20;
        
        let x = d3.scaleLinear()
                .domain([0, d3.max(svgData)])
                .range([0, width]);

        let chart = d3.select('.svg-chart')
                    .attr('width', width)
                    .attr('height', barHeight * svgData.length);
                
        //2. create bar for each data
        //todo enter the data; create g for each; then position them with translate
        let bar = chart.selectAll('g')
                    .data(svgData)
                    .enter().append('g')
                    .attr('transform', function(d, i) { return `translate(0, ${i * barHeight})` });

        //todo add element (rect) to each g, set their dimension
        bar.append('rect')
        .attr("width", x) //??? x is the same as function(d) {return x(d);} here ???
        .attr('height', barHeight - 1);

        //todo position the text with x, y and dy; then add content
        bar.append('text')
        .attr('x', function(d) { return x(d) - 10;}) // x position of text, 
        .attr('y', barHeight/2) // y position of text
        .attr('dy', '.35em') //y offset to center text
        .text(function(d) { return d });

        
    }, [svgData]);


    useEffect(() => {

        //* create chart from external data
        // size the chart before load data as data loading is Ajax
        //! note: height and x domain can't be decided here due to unknown data length
        let width = 420,
            barHeight = 20;

        let chart = d3.select('.load-data')
        .attr('width', width)

        let x = d3.scaleLinear()
                .range([0, width]);

        //* 2. load data, then create chart
        d3.csv("./data/load-data.csv").then(function(data) {
            data.forEach(function(d) {
                d.value=+d.value;
            });
            console.log(data.length)
            console.log(data) //check data format

            //todo decide chart height and x domain
            chart.attr('height', barHeight * data.length);
            x.domain([0, d3.max(data, function(d) {return d.value;})]);

            //todo create rect for each data item
            let bar = chart.selectAll('g')
                .data(data)
                .enter().append('g')
                .attr('transform', function(d, i) {return `translate (0, ${i * barHeight})`});

            bar.append('rect')
            .attr('width', function(d) {return x(d.value);})
            .attr('height', barHeight-1);

            bar.append('text')
            .attr('x', function(d) { return x(d.value) - 0})
            .attr('y', barHeight / 2)
            .attr('dy', '0.35em')
            .text(function(d) { return `${d.name} (${d.value})`});
        })

        d3.csv("/data/load-data.csv", type, function(error, data) {
            if (error) console.log(error);
            console.log(data)
            
            // //todo decide chart height and x domain
            // chart.attr('height', barHeight * data.length);
            // x.domain([0, d3.max(data, function(d) {return d.value;})]); //! note how to read value of data if it is not number[]
            
            // let bar = chart.selectAll("g")
            //     .data(data)
            //     .enter().append("g")
            //     .attr('transform', function(d, i) { return `translate (0, ${barHeight * i})`});

            // bar.append('rect')
            // .attr('width', x)
            // .attr('height', barHeight-1);
        }).then(function(data) {
            console.log(data);
        })

        function type(d) {
            d.value = +d.value; //coerce to number
            return d;
        }
    } , [])

    return (
        <div>
            <h2>
                This will render some bar charts
            </h2>

            <div className="simple-barchart chart">
                <h3>A simple bar chart</h3>
            </div>

            <div className="scale-to-fit chart">
                <h3>bar chart scale to fit</h3>
            </div>

            <div className="chart">
                <h3>Scallable Vector Graphics (SVG) Bar Chart</h3>
                <svg className="svg-chart">

                </svg>
            </div>

            <div className="chart">
                <h3>Create chart from data file</h3>
                <svg className="load-data">

                </svg>
            </div>

        </div>
    )
}

export default BarChart;