import { useState } from 'react';

function Query({onSearch}) {
    const [searchRecipe, setSearchRecipe] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(!searchRecipe) {
            alert('Please enter a recipe to search for');
            return;
        }

        onSearch({searchRecipe})
    }
        
    return (
        <div className="box-input">

            <form className="add-form" onSubmit={onSubmit}>

                <div>
                    <label for="query-recipe">Enter a recipe</label>
                    <input
                    type="text"
                    className="query-recipe"
                    id="query-recipe" 
                    name="query-recipe" 
                    placeholder='Pick a recipe to search for!'
                    value={searchRecipe}
                    onChange={(e) => setSearchRecipe(e.target.value)}
                    />
                </div>

                <div>
                    <button className="button">Search</button>
                </div>

            </form>

        </div>
    )
}

export default Query;