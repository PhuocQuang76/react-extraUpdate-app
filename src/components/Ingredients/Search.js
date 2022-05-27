import React, {useEffect, useRef, useState} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = props => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    //use useEffect to make http request
    useEffect(()=>{
        setTimeout(()=>{
            if(enteredFilter === inputRef.current.value){
                const query = enteredFilter.length === 0
                    ? ''
                    : `?queryBy="title"&equalTo="${enteredFilter}"`
                fetch("https://react-http-f69a0-default-rtdb.firebaseio.com/extraHook.json")
                    .then((response)=>response.json())
                    .then((responseData) => {
                        const loadedIngredients= [];
                        for(const key in responseData){
                            loadedIngredients.push({
                                id:key,
                                title:responseData[key].title,
                                amount:responseData[key].amount,
                            })

                        }
                        // props.onLoadIngredients(loadedIngredients);
                        onLoadIngredients(loadedIngredients);
                    })
            }
        },500);



    },[enteredFilter,onLoadIngredients])

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={enteredFilter}
                        onChange={(event)=>setEnteredFilter(event.target.value)}/>
                </div>
            </Card>
        </section>
    );
};

export default React.memo(Search);
