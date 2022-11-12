import icons from 'url:../../img/icons.svg'
import PreviewView from './previewView.js';
import View from "./View.js";

class BookmarksView extends View {
	_parentEl = document.querySelector('.bookmarks__list')
	_errorMessage = 'No bookmarks yet.Find a nice recipe and bookmark it. 🙂'
	_successMessage = '';

	addHandlerRender(handler) {
		window.addEventListener('load', handler)
	}

	_generateMarkup() {
		return this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
	}
}
export default new BookmarksView();