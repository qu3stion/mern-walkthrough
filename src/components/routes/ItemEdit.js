import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../shared/Layout';
import ItemForm from '../shared/ItemForm';
import axios from 'axios';

//have to write logic that conforms to our schemas (models/item.js)
// therefore the initial value of the state must adhere
//  essentially becoming a copy of the schema

//first state saves data
function ItemEdit() {
    
    const navigate = useNavigate()
    //see lines 22-30 for useParams notes
    const { id } = useParams()
    const [item, setItem] = useState({
        title: '',
        link: ''
    })
//second state checking if updated
    const [updated, setUpdated] = useState(false)

    //now use useParams to extract ID from object of whatever
    //  URL page i am currently in
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:3000/api/items/${id}`)
                console.log('edit', response)
                setItem(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])

    //(will be shot down to share/ItemForm.js)
    const handleChange = (event) => {
        //grabbing the value from the user input form; place holder for new data
        const updatedField = {[event.target.name] : event.target.value}
        //assign the empty state with the updated field into one object
        const editedItem = Object.assign(item, updatedField)

        //assign the new object to be updated to state
        setItem(editedItem)
    }

    //this handleSubmit function is grabbing what the state is
    const handleSubmit = (event) => {
        //preventDefault prevents the page from submitting on every event
        //  it's used here because we want the data to load when the full operation is done
        event.preventDefault()
        axios({
            url: `http://localhost:3000/api/items/${id}`,
            method: 'PUT',
            data: item
        }).then(() => setUpdated(true)).catch(console.error)
    }
        //if i modify the item, the change will first reflect in the local state,
        //  then it will be sent to the database where the db saves that change

        useEffect(() => {
            if(updated) {
                return navigate(`/items/${id}`)
            }
        })
        
        return (
            <Layout>
                <ItemForm
                    item={item}
                    handleChange={(e) => handleChange(e)}
                    handleSubmit={(e) => handleSubmit(e)}
                    cancelPath={`/items/${id}`}
                />
            </Layout>
        )
    }


        

export default ItemEdit;