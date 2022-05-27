import React, {useCallback, useEffect, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);

    useEffect(()=>{
        const requestOption = {
            method:'GET',
            headers:{'Content-Type': 'application/json'},
        }
        fetch("https://react-http-f69a0-default-rtdb.firebaseio.com/extraHook.json",requestOption)
            .then((response)=>{
                return(response.json());
            })
            .then((responseData) =>{
                const loadedIngredients = [];
                for(let key in responseData){
                    loadedIngredients.push({
                        id:key,
                        title: responseData[key].title,
                        amount:responseData[key].amount,
                    })
                }
                setUserIngredients(loadedIngredients);

            })
    },[]);

    useEffect(()=>{
        console.log("test", userIngredients);
    },[userIngredients]);

    const addIngredientHandler = (ingredient) => {
        const requestOption = {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(ingredient)
        }

        fetch("https://react-http-f69a0-default-rtdb.firebaseio.com/extraHook.json",requestOption)
            .then((response)=>{
                return(
                    response.json()
                )
            })
            .then((responseData) => {
                return(
                    setUserIngredients((prevIngredients) => {
                        return(
                            [...prevIngredients,{id: responseData.name, ...ingredient}]
                        )
                    })
                )
            })

    }
    const removeItemHandler = (ingredientId) => {
        setUserIngredients((prevIngredients) => {
            return(
                prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
            )
        });
    }

    const filteredIngredientsHandler =useCallback((filteredIngredients) => {
        setUserIngredients(filteredIngredients);
    },[])

    return (
        <div className="App">
            <IngredientForm  onAddIngredient={addIngredientHandler} />

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList
                    ingredients={userIngredients}
                    onRemoveItem={removeItemHandler}
                />
            </section>
        </div>
    );
}

export default Ingredients;
