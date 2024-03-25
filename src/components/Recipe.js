const formatRecipe = (meal) => {

    return (
      <>
        <h4>{meal.strMeal}</h4>
        <h5>Instructions</h5>
        <span>{meal.strInstructions}</span>
      </>
    )
  }
  
  function Recipe({recipe}) {
  
    return (
      <>
          { formatRecipe(recipe) }
      </>
    )
  }

export default Recipe;