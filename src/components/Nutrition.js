import { useState, useEffect} from 'react';
import axios from 'axios';

function Nutrition({ingredient, addCalories}) {
    const [nutrition, setNutrition] = useState([])

    useEffect(() => {   
        const getNutrition = async () => {
            const serverData = await fetchNutrition();
            setNutrition(serverData);
            console.log('serverData', serverData)
            addCalories(serverData.calories);
        }
        getNutrition();
    
    },[nutrition.calories]);
  
    const fetchNutrition = async () => {
        let urlEncodedIngredient = ingredient.replace(/ /gm, '%20').replace(/,/gm, '%2C');
        const res = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&nutrition-type=cooking&ingr=${urlEncodedIngredient}`, 
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        );
        return res.data;
    }
  
    return (
      <>
        <span>{ingredient}: {nutrition.calories}</span><br/>
      </>
    )
  }

export default Nutrition;