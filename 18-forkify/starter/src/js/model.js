import { async } from 'regenerator-runtime'
import { API_URL } from './config.js'
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		resultsPerPage: RES_PER_PAGE,
		page: 1,

	},
	bookmarks: []
};

export const loadRecipe = async function (id) {
	try {

		const data = await getJSON(`${API_URL}/${id}`)
		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		}
		if (state.bookmarks.some(bookmark => bookmark.id === id))
			state.recipe.bookmarked = true;
		else state.recipe.bookmarked = false;
		// console.log(state.recipe);
	} catch (err) {
		console.error(`${err} 🔴`);
		throw err;
	}

};

export const loadSearchResults = async function (query) {
	try {
		state.search.query = query;
		const data = await getJSON(`${API_URL}?search=${query}`)
		// console.log(data);
		state.search.results = data.data.recipes.map(rec => {
			return {
				id: rec.id,
				title: rec.title,
				publisher: rec.publisher,
				image: rec.image_url
			}
		})
		state.search.page = 1;
	} catch (err) {
		console.error(`${err} 🔴`);
		throw err;
	}
}

export const getSearchResultsPage = function (page = state.search.page) {
	state.search.page = page
	const start = ((page - 1)) * state.search.resultsPerPage;
	const end = page * state.search.resultsPerPage;
	return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
	state.recipe.ingredients.forEach(ing => {
		ing.quantity = ing.quantity * newServings / state.recipe.servings;
	})

	state.recipe.servings = newServings
}
export const addBookmark = function (recipe) {
	//Add Bookmark
	state.bookmarks.push(recipe)
	//Mark current recipe as bookmarked
	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
	const index = state.bookmarks.findIndex(el => el.id === id);
	state.bookmarks.splice(index, 1);
	if (id === state.recipe.id) state.recipe.bookmarked = false;
}