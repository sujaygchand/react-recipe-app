/*
 * Organises and displays the search results 
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = props => (
    <div className="container">
<div className="row">
{
    props.recipes[0] ? 
    props.recipes.map((recipe) => {

        return (
            <div key={recipe.title} className="col-md-4" style={{ marginBottom:"2rem"}}>
            <div className="recipes__box">
                <img className="recipe__box-img"
                 src={recipe.image_url}
                  alt={recipe.title} />
                  <div className="recipe__text">
                    <h5 className = "recipes__title">{ 

                        // Concatenates the string length of the title to keep box sizes even
                        recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 24)}....`
                        }</h5>
                    <p className = "recipes__subtitle">Publisher: <span> 
                        { recipe.publisher }
                        </span> </p>
                   </div>
                   <button className="recipe_buttons">
                   <Link to={{ 
                       // Creates a path and gives the information for a new recipe webpage
                       pathname: `/recipe/${recipe.recipe_id}`, state:{recipe: recipe.title} 
                       }}>
                        View Recipe </Link>
                   </button>
            </div>
                </div>
        );
    }) :
    
        // When no search reults can be found
        <div className="search-failed"> 
        <h2> Sorry no results were found</h2>
        </div>
}
</div>
    </div>
);

export default Recipes;

