import { useState, useEffect } from 'react';

//useParams returns an object of key/value pairs of URL parameters. 
//  Use it to access match. params of the current <Route>
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../shared/Layout'

function Item() {
    const [item, setItem] = useState([])
    //accounting for deletion
    const [deleted, setDeleted] = useState(false)
    const { id } = useParams();
    //redirection
    let navigate = useNavigate()

    //getting ' {id} ' from useParams
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:3000/api/items/${id}`)
                console.log('params id', response)
                const result = response.data.item
                setItem(result)
            } catch (error) {
              console.error(error)
            }
        }
        fetchData()
    }, [id])

    //edge case for if there is no item or in between loading
    useEffect(() => {
        if (!item) {
        return <p>Loading...</p>
        }
    }, [item])

    const destroy = () => {
        axios({
            url: `http://localhost:3000/api/item/${id}`,
            method: 'DELETE'
        }).then(() => setDeleted(true)).catch(console.error)
    }
        //case to redirect (useNavigate) after an entry is deleted
        useEffect(() => {
            if (deleted) {
            return navigate('/')
            }
        }, [deleted, navigate])

    return (
        <Layout>
            <h4>{item.title}</h4>
            <p>Link:{item.link}</p>
            <button onClick={() => destroy()}>Delete Item</button>

            <NavLink to={`/items/${id}/edit`}>
                <button>Edit</button>
            </NavLink>

            <NavLink to='/items'>Back to All Items</NavLink>
        </Layout>
    )
}

export default Item;