import React, { useEffect, useState } from 'react';
import './App.css'; 

const StarRating = ({ rating }) => {
  // Round to nearest half
  const stars = Math.round(rating * 2) / 2;
  
  const renderStars = () => {
    const starArray = [];
    // Full stars
    for (let i = 1; i <= Math.floor(stars); i++) {
      starArray.push(<span key={`star-${i}`}>⭐</span>);
    }
    // Half star
    if (stars % 1 !== 0) {
      starArray.push(<span key="half-star">⭐</span>);
    }
    return starArray;
  };

  return (
    <div className="recipe-rating">
      <div className="stars">{renderStars()}</div>
      <span className="rating-number">({rating})</span>
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('data changed', data);
  }, [data]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/recipes');
      const json = await res.json();
      setData(json.recipes); // Correctly extract recipes from API response
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
     <div  className="listimg">
     <h1>Recipes</h1>
      <img src="https://cdn-icons-png.flaticon.com/128/10551/10551576.png"></img>
      </div>
      
      <ol className="recipes-list">
        {data.map((recipe) => (
          <li key={recipe.id} className="recipe-card">
            <div className="recipe-image-container">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="recipe-image"
              />
            </div>
            <div className="recipe-info">
              <div className="title-type">
              <h2 className="recipe-title">{recipe.name}</h2>
              <p className="recipe-type">Meal Type: {recipe.mealType}</p>
              </div>
             <p className="recipe-ingrediants">Ingrediants: {recipe.ingredients}</p> 
             <h3 className="recipe-instructions"> Instruction: {recipe.instructions}</h3>
             
             <div className="cook-preptime"> 
             <p className="recipe-cook"> Cooking Time: {recipe.cookTimeMinutes}</p>
             <p className="recipe-prep"> Preparation Time: {recipe.prepTimeMinutes}</p>
           </div>
             
           <div className="serving-cuisine"> 
           <p className="recipe-serving">Serving: {recipe.servings}</p>
            <p className="recipe-cuisine">Cuisine: {recipe.cuisine}</p>
             </div>
             
              <StarRating rating={recipe.rating} />

            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
