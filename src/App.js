/**
 * 
 * A simple recipe finding web app, made with React.
 * 
 * It gathers data from http://food2fork.com/
 * 
 * @author Sujay Chand
 * @version 1.0 
 * 
 */

 // Imports components
import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';
import Loader from './components/Preloader';

const API_KEY = "a53faf17f3fd5cd0dd3a472f5730d839";       // My personal API key

class App extends Component {

  // Default state
  state = {
    recipes: [],
    isLoading: false,
    doOnce: true,
    isPopular: true,
    isAlphabetical: false
  }

  /*
   * Gets recipes from the database 
   */
  getRecipe = async (e) => {
    this.setState({recipes: undefined, isLoading:true});

    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();

    // The first link is used to 'trick' food2fork that the app is hosted
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`);

    const searchResults = await api_call.json();
    this.setState({recipes: searchResults.recipes, isLoading:false});

    console.log(this.state.recipes);
  }

  /*
   * Sorts the recipes in order of popularity  
   */
  getPopularityOrder = async (e) => {
    e.preventDefault();
    console.log(`IsPopular: ${this.state.isPopular} IsAlpha: ${this.state.isAlphabetical}`);
    
    if(this.state.isPopular === true){
      return;
    }
   
    let tempRecipes = this.state.recipes;
    
    if(tempRecipes === undefined){
      return;
    }

    this.setState({ recipes: tempRecipes, isPopular:true, isAlphabetical:false });

    // Sorting function
    tempRecipes.sort((a, b) => a.social_rank > b.social_rank);
  }

  /*
   * Sorts the recipes in alphabetical order  
   */
  getAlphabeticalOrder = async (e) => {
    e.preventDefault();
    console.log(`IsPopular: ${this.state.isPopular} IsAlpha: ${this.state.isAlphabetical}`);

    if(this.state.isAlphabetical === true){
      return;
    }
    
    let tempRecipes = this.state.recipes;
    
    if(tempRecipes === undefined){
      return;
    }

    this.setState({ recipes: tempRecipes, isPopular:false, isAlphabetical:true });

    // Sorting function
    tempRecipes.sort((a, b) => {
      const firstData = a.title;
      const SeconndData = b.title;
      
      return (firstData < SeconndData) ? -1 : (firstData > SeconndData) ? 1 : 0;
    })
  }

/*
 * Stores pervious search result on page, when user goes back  
 */
componentDidMount = () => {
  const json = localStorage.getItem("recipes");
  const recipes = JSON.parse(json);
  this.setState({recipes})
}

/*
 * Updates the local storage of recipes 
 */
componentDidUpdate = () => {
  const recipes = JSON.stringify(this.state.recipes);
  localStorage.setItem("recipes", recipes);
}

/*
 * A do once function that loads recipes on start-up  
 */
loadFirstRecipes = () => {
  if(this.state.doOnce){
    this.setState({ doOnce:false });
    this.getRecipe;
    return;
  }
  return;
}

  /* 
   * Render canvas and draws recipe data
   */
  render() {
    
    // initialise variables linked to states 
    const recipes = this.state.recipes;
    const isPopular = this.state.isPopular;
    const isAlphabetical = this.state.isAlphabetical;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}  
        getPopularityOrder={this.getPopularityOrder} isPopular={isPopular}
        getAlphabeticalOrder={this.getAlphabeticalOrder} isAlphabetical={isAlphabetical}/>
        { recipes !== undefined ?(
        <Recipes recipes={this.state.recipes}/>
       ) :  this.loadFirstRecipes()  }
        {
          // The Loading effect
          this.state.isLoading ? <Loader /> : "" 
          }
        </div>
       );
  }
}

export default App;
