import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../shared/Layout';
import ItemForm from '../shared/ItemForm';

//logic to create an item
function ItemCreate() {
    const navigate = useNavigate();
    const [item, setItem] = useState({
        title: '',
        link: ''
    })
    const [createdItem, setCreatedItem] = useState(null)

    const handleChange = (event) => {
        //grabbing the value from the user input form; place holder for new data
        const updatedField = {[event.target.name] : event.target.value}
        //assign the empty state with the updated field into one object
        const editedItem = Object.assign(item, updatedField)

        //assign the new object to be updated to state
        setItem(editedItem)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios({
            url: `http://localhost:3000/api/items`,
            method: 'POST',
            data: item
        }).then(res => setCreatedItem(res.data.item)).catch(console.error)
    }

    useEffect(() => {
        if (createdItem) {
            return navigate('/items')
        }
    }, [createdItem, navigate])

    return (
        <Layout>
            <ItemForm
            item={item}
            handleChange={(e) => handleChange(e)}
            handleSubmit={(e) => handleSubmit(e)}
            cancelPath={`/`}
            />
        </Layout>
    )

}

export default ItemCreate;