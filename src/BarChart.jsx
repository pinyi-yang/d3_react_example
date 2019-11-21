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

    useEffect(() => {
        //render a simple barchart
        d3.select('.simple-barchart')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .style("width", function(d) { return `${d}px` })
        .text(function(d) { return d })
    }, [])

   

    return (
        <div>
            <h2>
                This will render some bar charts
            </h2>

            <div className="simple-barchart">
                <h3>A simple bar chart</h3>
            </div>

        </div>
    )
}

export default BarChart;