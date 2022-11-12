import icons from 'url:../../img/icons.svg'
import recipeView from "./recipeView.js";
import previewView from './previewView.js';
import View from "./View";

class BookmarksView extends View {
	_parentEl = document.querySelector('.bookmarks__list')
	_errorMessage = 'No bookmarks yet.Find a nice recipe and bookmark it. 🙂'
	_successMessage = '';

	_generateMarkup() {
		console.log(this._data);
		return this._data.map(bookmark => previewView.render(bookmark, false)).join('')

	}
}
export default new BookmarksView();