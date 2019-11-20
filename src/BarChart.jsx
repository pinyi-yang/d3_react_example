import React, {useEffect, useState} from 'react';
import * as d3 from 'react-d3-library';

function BarChart() {
    const initialBooks = [
        {
            name: "Harry Potter",
            author: "J. K. Rowling",
            genre: "fantasy",
        }, {
            name: "The PEdagogy of Freedom",
            author: "Bell Hooks",
            genre: "non-ficiton"
        }, {
            name: "Harry Potter 2",
            author: "J. K. Rowling",
            genre: "fantasy"
        }, {
            name: "Gilgamesh",
            author: "Derrek Hines",
            genre: "poetry"
        }
    ]
    const [books, setBooks] = useState(initialBooks);

    return (
        <div>
            <h1>
                This will render a bar chart
            </h1>

        </div>
    )
}

export default BarChart;