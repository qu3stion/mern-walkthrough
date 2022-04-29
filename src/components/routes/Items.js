import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Items() {
    //using empty array in useState because we'll be returning an array
    const [items, setItems] = useState([])

    //save response to state ('items, setItems') underneath the response
    const fetchData = async () => {
        try {
            const response = await axios('http://localhost:3000/api/items')
            console.log(response)
            setItems(response.data.items)
        } catch (error) {
            console.error(error);
        }
    }

        useEffect(() => {
            fetchData()
        }, [])

        //now mapping thru items state
        const itemsData = items.map((item) => {
            return <li key={item._id}>
                <NavLink to={`/items/${item._id}`}>{item.title}</NavLink>
            </li>
        })
    return (
        <div>
            <h4>Items</h4>
            <ul>
                {itemsData}
            </ul>
        </div>
    )
}

export default Items;