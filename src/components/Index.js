import React, { useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategories,
  setImages,
  setSelectedCategory,
  setStartIndex,
  setSelectedImage,
} from "../redux/store";

function Index() {
  // Retrieve data from the Redux store
  const categories = useSelector((state) => state.categories);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const images = useSelector((state) => state.images);
  const startIndex = useSelector((state) => state.startIndex);
  const selectedImage = useSelector((state) => state.selectedImage);

  const dispatch = useDispatch();

  // Fetch categories from the Pixabay API
  const getCategories = () => {
    axios
      .get("https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736")
      .then((response) => {
        const uniqueTags = new Set();
        response.data.hits.forEach((hit) => {
          const tags = hit.tags.split(",");
          tags.forEach((tag) => uniqueTags.add(tag.trim()));
        });
        // Update the categories in the Redux store
        dispatch(setCategories(Array.from(uniqueTags).sort()));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  // Fetch images for the selected category and start index
  const getImages = (category, startIndex) => {
    axios
      .get(
        `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&per_page=9&page=${
          startIndex / 9 + 1
        }`
      )
      .then((response) => {
        // Update the images in the Redux store
        dispatch(setImages(response.data.hits));
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  // Handle the category selection change
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    // Update the selected category in the Redux store
    dispatch(setSelectedCategory(category));
    // Reset the start index to 0
    dispatch(setStartIndex(0));
    // Fetch images for the selected category and start index
    getImages(category, 0);
  };

  // Handle the "NEXT" button click
  const handleNextClick = () => {
    if (startIndex + 9 < images.length) {
      const newIndex = startIndex + 9;
      // Update the start index in the Redux store
      dispatch(setStartIndex(newIndex));
      // Fetch images for the selected category and new start index
      getImages(selectedCategory, newIndex);
    }
  };

  // Handle the "PREV" button click
  const handlePrevClick = () => {
    if (startIndex - 9 >= 0) {
      const newIndex = startIndex - 9;
      // Update the start index in the Redux store
      dispatch(setStartIndex(newIndex));
      // Fetch images for the selected category and new start index
      getImages(selectedCategory, newIndex);
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    getCategories();
  }, []);

  // Handle the image click event
  const handleImageClick = (image) => {
    // Update the selected image in the Redux store
    dispatch(setSelectedImage(image));
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={handlePrevClick}>PREV</button>
        <button onClick={handleNextClick}>NEXT</button>
      </div>
      <div className="select-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select category</option>
          {categories.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="img-container">
        <table>
          <tbody>
            {[...Array(3)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(3)].map((_, colIndex) => {
                  const index = startIndex + rowIndex * 3 + colIndex;
                  const image = images[index];
                  return (
                    <td key={index}>
                      {image && (
                        <img
                          src={image.previewURL}
                          alt=""
                          onClick={() => handleImageClick(image)}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedImage && (
        <div className="modal">
          <h2>Image Details</h2>
          <p>Views: {selectedImage.views}</p>
          <p>Downloads: {selectedImage.downloads}</p>
          <p>Collections: {selectedImage.collections}</p>
          <button onClick={() => dispatch(setSelectedImage(null))}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Index;
