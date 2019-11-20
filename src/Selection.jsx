import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

function Selection() {

    useEffect(() => {
        console.log("Selection Mounted");
        d3.select('p').style('color', 'blue');
        d3.select('.select-by-class').style('background-color', 'yellow');
        d3.select('.alter-shade')
            .style('background-color', 'black')
            .selectAll('p')
            .style('color', function(d, i) {
                return i % 2 ? "#fff":"red";
            })

        d3.select('.data-option').selectAll('p')
            .data([12, 16, 20])
            .style('font-size', function(d) {return d + "px"});
            
        // add nodes
        d3.select('.add-node').selectAll('p')
        .data([4, 8, 15, 16, 23, 42])
        .enter().append('p')
        .text(function(d){
            return `I am number ${d} !`;
        })
        
        //todo if forget orginal data length. updating become 3 step
        //update content
        var newText = d3.select('.add-node').selectAll('p')
                        .data([1,2,3,4,5]) //* will not create more nodes. Only update to the previous length
                        .text(function(d) {return d});

        // enter nodes
        newText.enter().append('p').text(function(d) {return d;});

        // remove nodes
        newText.exit().remove();

    }, [])

    return (
        <div className="selection">
            <h2>This is test for d3 selection function</h2>
            <p>
                This text will turn blue by d3 with <br/>
                d3.select('p').style('color', 'blue')
            </p>
            <div className="select-by-class">
                The background of this div will change to yellow through select class (.className)
            </div>
            <div className="alter-shade">
                <p>Select with</p>
                <p>funtion to</p>
                <p>alter shade of</p>
                <p>even and odd</p>
                <p>nodes</p>
                <p>multi selector: d3.select('.alter-shade')<br/>
                    .style('background-color', 'black')<br/>
                    .selectAll('p')<br/>
                    .style('color', callback)
                </p>
            </div>
            <hr/>

            <div className="data-option">
                <p>data potion in d3 function</p>
                <p>can format context with data in array</p>
                <p>by function (data, index) or function(d, i)</p>
                <p></p>
                <p></p>
            </div>
            <hr/>

            <div className="container">
                <h3>Enter and Exit (add, remove and update nodes)</h3>
                <div className="add-node">

                </div>
            </div>
        </div>
    )
}

export default Selection;