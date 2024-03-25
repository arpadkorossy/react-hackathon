import { useState, useEffect} from 'react';
import axios from 'axios';

const formatNutrition = (nutrient) => {

    return (
        <></>
    )
  }
  
function Nutrition({recipe, ingredients}) {
    const [nutrition, setNutrition] = useState([]);
    const [dailyByWeight, setDailyByWeight] = useState([]);
    const [dailyByPercent, setDailyByPercent] = useState([]);
    const [dailyNutrition, setDailyNutrition] = useState([]);

    useEffect(() => {   
        const getNutrition = async () => {
            const serverData = await fetchNutrition();
            setNutrition(serverData);
            setDailyByWeight(Object.entries(serverData.totalNutrients));
            setDailyByPercent(Object.entries(serverData.totalDaily));
            setDailyNutrition([Object.entries(serverData.totalNutrients), Object.entries(serverData.totalDaily)])
        }
        getNutrition();
    
    },[]);
  
    console.log('recipe', recipe)
    let urlEncodedIngredients = ingredients.join(', ').replace(/ /gm, '%20').replace(/,/gm, '%2C');
    
    const fetchNutrition = async () => {
        const res = await axios.post(`https://api.edamam.com/api/nutrition-details?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`, {
            title: "Chinon Apple Tarts",//recipe.strMeal,
            ingr: ["320g puff pastry", "4 tbs Dark Brown Soft Sugar"],//ingredients,
            url: "https://www.bbcgoodfood.com/recipes/chinon-apple-tarts"//recipe.strSource
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        );
        return res.data;
    }
  
    // console.log('nutrition', nutrition)
    // let dailyByPercent = Object.entries(nutrition.totalDaily);
    // console.log('dailyByPercent', dailyByPercent)
    // let dailyByWeight = Object.entries(nutrition.totalNutrients);
    // console.log('dailyByWeight', dailyByWeight)
    // let dailyNutrition = [dailyByWeight, dailyByPercent];

    // let dailyByWeight = nutrition.totalNutrients;
    // let dailyByPercent = nutrition.totalDaily;
    // console.log('nutrition', nutrition)
    // let dailyByPercent = Object.entries(nutrition.totalDaily);
    // console.log('dailyByPercent', dailyByPercent)
    // let dailyByWeight = Object.entries(nutrition.totalNutrients);
    // console.log('dailyByWeight', dailyByWeight)
    // let dailyNutrition = [dailyByWeight, dailyByPercent];
    // console.log(dailyByWeight.CA.label)
    console.log(dailyNutrition);

    return (
      <>
        <div className='box-results-nutrition'>
            <span><b>Calories:</b> {nutrition.calories}</span>
            <p> 
                {/* <span><b><u>Total Daily</u></b></span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CHOCDF.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span>
                <span><br/>{dailyByWeight.CA.label}: {dailyByWeight.CA.quantity.toFixed(2)}{dailyByWeight.CA.unit} / {dailyByPercent.CA.quantity.toFixed(2)}{dailyByPercent.CA.unit}</span> */}
            </p>
            <div id="edamam-badge" data-color="white"></div>
        </div>
      </>
    )
  }

export default Nutrition;