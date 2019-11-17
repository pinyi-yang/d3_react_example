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

    setBooks(books.concat(
        {
            name: "50 vegan dishes",
            author: "Antti Leppanen",
            genre: "non-fiction"
        }
    ))

    d3.select(refs.myDiv).style("bbackground_color", "blue")
    

    return (
        <div ref="myDiv">
            <h1>
                This will render a bar chart
            </h1>

        </div>
    )
}

export default BarChart;