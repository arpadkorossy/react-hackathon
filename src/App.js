import { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Query from './components/Query'
import Recipe from './components/Recipe.js'
import Nutrition from './components/Nutrition.js';

function App() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [mealImage, setMealImage] = useState('');
  
  useEffect(() => {   
    const getRecipe = async () => {
      const serverData = await fetchRandomRecipe();
      setRecipe(serverData.data.meals[0])
      setMealImage(serverData.data.meals[0].strMealThumb)
      let ingredientsResult = [];
      for (let ingredient = 1; ingredient <= 20; ingredient++) {
        if (serverData.data.meals[0][`strIngredient${ingredient}`] != null && serverData.data.meals[0][`strIngredient${ingredient}`] != '') {
          ingredientsResult.push(serverData.data.meals[0][`strMeasure${ingredient}`] + ' ' + serverData.data.meals[0][`strIngredient${ingredient}`]);
        }
      }
      setIngredients(ingredientsResult);
    }

    getRecipe();

  },[]);

    // Fetch locations list from Server
  const fetchRandomRecipe = async () => {
    const res = axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    return res;
  }

  function ingredientNutrition(ingredient) {
    return (
      <Nutrition ingredient={ingredient} />
    )
  }

  function addCalories(calories) {
    setTotalCalories(totalCalories + calories);
  }
  
  const onSearch = async (searchRecipe) => {
      let urlEncodedSearch = searchRecipe.searchRecipe.replace(/ /gm, '%20').replace(/,/gm, '%2C');
      console.log('urlEncodedSearch', urlEncodedSearch)
      const serverData = await fetchRecipe(urlEncodedSearch);
      console.log(serverData)
      if (serverData.data.meals == null) {
        alert("Couldn't find meal")
      } else {
        setRecipe(serverData.data.meals[0])
        setMealImage(serverData.data.meals[0].strMealThumb)
        let ingredientsResult = [];
        for (let ingredient = 1; ingredient <= 20; ingredient++) {
          if (serverData.data.meals[0][`strIngredient${ingredient}`] != null && serverData.data.meals[0][`strIngredient${ingredient}`] != '') {
            ingredientsResult.push(serverData.data.meals[0][`strMeasure${ingredient}`] + ' ' + serverData.data.meals[0][`strIngredient${ingredient}`]);
          }
        }
        setIngredients(ingredientsResult);
      }
  }

  const fetchRecipe = async (searchRecipe) => {
    const res = axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRecipe}`)
    return res;
  }

  return (
    <>
      <div className="box-header">
        <h1 className="heading">React Recipe App</h1>
        <h6 className="subheading">Find recipes and nutrition information using TheMealDB and Edamam APIs</h6>
      </div>



      <div className="box">

        <Query onSearch={onSearch}/>

        <div className="box-results-recipe">
          { <Recipe recipe={recipe} addCalories={addCalories} /> }
          <p><br /><img src={mealImage}></img></p>
        </div>
        <div className='box-results-nutrition'>
          <h5><u>Calorie Count</u></h5>
          { ingredients.map(ingredient => ingredientNutrition(ingredient)) }
          <b>Total Calories:</b> { totalCalories}
          <div id="edamam-badge" data-color="transparent"></div>
        </div>

      </div>
    </>
  );
}

export default App;
