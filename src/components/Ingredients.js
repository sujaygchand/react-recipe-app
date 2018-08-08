import React from 'react';

const Ingredients = props => {
    
    const IngredientList = props.ingredients.map( ingredient => (
        <li key={props.ingredients.indexOf(ingredient)}>{ingredient}</li>
    ));
    
    return (
        <div>
            <p> ingredients: </p>
            <ul>{IngredientList}</ul>
        </div>
    );
};

export default Ingredients;