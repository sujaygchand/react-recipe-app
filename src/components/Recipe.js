import React, { Component } from 'react';

import { Link } from 'react-router-dom';

const API_KEY = "a53faf17f3fd5cd0dd3a472f5730d839";

class Recipe extends Component {

    state = {
        activeRecipe: []
    }

    componentDidMount = async () => {
        const title = this.props.location.state.recipe;

        const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${title}`);
        const searchResponse = await api_call.json();

        this.setState({ activeRecipe: searchResponse.recipes[0] });
        console.log(this.state.activeRecipe);
    }

    render() {
        const recipe = this.state.activeRecipe;
        return (
            <div className="container">
                {
                    this.state.activeRecipe.length !== 0 &&
                    <div className="active-recipe">
                        <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title} />
                        <h3 className="active-recipe__title"> {recipe.title} </h3>
                        <h4 className="active-active-recipe__publisher">
                            Publisher: <span>{recipe.publisher}</span>
                        </h4>
                        <p className="active-recipe__website">Website:
                  <span><a href={recipe.source_url
                            } target="_blank">{recipe.source_url
                                }</a></span>
                        </p>
                        <button className="active-recipe__button">
                        <Link to="/"> GO BACK </Link>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default Recipe;