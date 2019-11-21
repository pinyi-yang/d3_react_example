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
        var x = d3.scaleLinear()
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
        var width = 800,
            barHeight = 20;
        
        var x = d3.scaleLinear()
                .domain([0, d3.max(svgData)])
                .range([0, width]);

        var chart = d3.select('.svg-chart')
                    .attr('width', width)
                    .attr('height', barHeight * svgData.length);
                
        //2. create bar for each data
        var bar = chart.selectAll('g')
                    .data(svgData)
                    .enter().append('g')
                    .attr('transform', function(d, i) { return `translate(0, ${i * barHeight})` });

        bar.append('rect')
        .attr("width", x)
        .attr('height', barHeight - 1);

        bar.append('text')
        .attr('x', function(d) { return x(d) - 10;}) // x position of text, 
        .attr('y', barHeight/2) // y position of text
        .attr('dy', '.35em') //y offset to center text
        .text(function(d) { return d });

        
    }, [])
   

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

        </div>
    )
}

export default BarChart;