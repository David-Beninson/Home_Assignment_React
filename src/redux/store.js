import { createStore, combineReducers } from "redux";

// Define the initial state of the Redux store
const initialState = {
  categories: [],
  images: [],
  selectedCategory: "",
  startIndex: 0,
  selectedImage: null,
};

// Define action types
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_IMAGES = "SET_IMAGES";
const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
const SET_START_INDEX = "SET_START_INDEX";
const SET_SELECTED_IMAGE = "SET_SELECTED_IMAGE";

// Action creators for updating Redux state
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setImages = (images) => ({ type: SET_IMAGES, payload: images });

export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});

export const setStartIndex = (index) => ({
  type: SET_START_INDEX,
  payload: index,
});

export const setSelectedImage = (image) => ({
  type: SET_SELECTED_IMAGE,
  payload: image,
});

// Reducer for managing the 'categories' state
const categoriesReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

// Reducer for managing the 'images' state
const imagesReducer = (state = initialState.images, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return action.payload;
    default:
      return state;
  }
};

// Reducer for managing the 'selectedCategory' state
const selectedCategoryReducer = (
  state = initialState.selectedCategory,
  action
) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

// Reducer for managing the 'startIndex' state
const startIndexReducer = (state = initialState.startIndex, action) => {
  switch (action.type) {
    case SET_START_INDEX:
      return action.payload;
    default:
      return state;
  }
};

// Reducer for managing the 'selectedImage' state
const selectedImageReducer = (state = initialState.selectedImage, action) => {
  switch (action.type) {
    case SET_SELECTED_IMAGE:
      return action.payload;
    default:
      return state;
  }
};

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  categories: categoriesReducer,
  images: imagesReducer,
  selectedCategory: selectedCategoryReducer,
  startIndex: startIndexReducer,
  selectedImage: selectedImageReducer,
});

// Create the Redux store using the root reducer
export const store = createStore(rootReducer);
