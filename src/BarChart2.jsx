import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as d3 from 'd3';

function BarChart2() {

    useEffect(() => {

        //*create a vertical bar chart

        //todo: create chart and specify height and y range
        let height = 420,
            barWidth = 32;

        let chart = d3.select('.vertical-bar')
            .attr('height', height);
        let y = d3.scaleLinear()
            .range([height, 0]); //! note: need to draw 420 to 0, because 0 is at bottom for vertical chart

        //todo: read data from external source
        d3.csv('./data/data3a.csv').then(function(data) {
            data.forEach(function(d) {
                d.value = +d.value
                return d;
            })
            console.log(data)

            //todo: specify y domain and chart width
            chart.attr('width', barWidth * data.length);
            y.domain([0, d3.max(data, function(d) { return d.value;})])

            //todo: create and position g for each data
            let bar = chart.selectAll('g')
                .data(data)
                .enter().append('g')
                .attr('transform', function(d,i) { return `translate (${barWidth * i}, 0)`});

            //todo: append element (rect) to each g
            bar.append('rect')
            .attr('width', barWidth - 1)
            .attr('height', function(d) {return height - y(d.value);}) //! y range is [height, 0]
            .attr('y', function(d) {return y(d.value)})

            //todo: append text
            bar.append('text')
            .attr('dy', '0.75em')
            .attr('x', barWidth/2)
            .attr('y', function(d) {return y(d.value) + 3;})
            .text(function(d) { return d.value})
        })

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
        </div>
    )
}

export default BarChart2;