import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

if (module.hot) {
  module.hot.accept()
}

const controlRecipes = async function () {
  //Loading Recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    //Rendering Recipe
  } catch (err) {
    console.error(err)
    recipeView.renderError()
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.loadSearchResults(query)

    //Render results
    resultsView.render(model.getSearchResultsPage())

    // Render initial pagination buttons

    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage))

  // Render initial pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  //Update recipe servings (in state)
  model.updateServings(newServings);
  //update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerclick(controlPagination);

}
init();