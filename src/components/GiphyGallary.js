import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../views/Card";
import Model from "../views/Model";

const GiphyGallary = () => {
  const [img, setImg] = useState();
  const [searchGiphy, setsearchGiphy] = useState();
  const [searchStr, setSearchStr] = useState();
  async function getGiphy() {
    await axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f"
      )
      .then((res) => {
        const response = res.data.data;
        setImg(response);
      });
  }

  useEffect(() => {
    getGiphy();
  }, []);

  async function getSearchData(textsearch) {
    console.log(textsearch);
    await axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f&q=${textsearch}`
      )
      .then((res) => {
        const response = res.data.data;
        setsearchGiphy(response);
      });
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchStr && getSearchData(searchStr);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchStr]);

  const handleChange = (event) => {
    const textSearch = event.target.value || null;
    setSearchStr(textSearch);
  };

  const handleOnClick = (imgUrl, imgTitle) => {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = imgUrl;
    modalImg.alt = imgTitle;
  };
  const handleClose = () => {
    const modal = document.getElementById("imgModal");
    modal.style.display = "none";
  };

  return (
    <>
      <div className="search">
        <input
          type="search"
          value={searchStr}
          placeholder="Search giphy images..."
          className="searchInput"
          id="search"
          onChange={handleChange}
        />
        <button onClick={() => getSearchData(searchStr)}>Search</button>
      </div>
      <div className="container">
        {!Array.isArray(searchGiphy) &&
          img &&
          img.map((item) => (
            <Card
              imgUrl={item.images.preview_gif.url}
              imgTitle={item.title}
              key={item.id}
              id={item.images.slug}
              handleOnClick={handleOnClick}
            />
          ))}
        {Array.isArray(searchGiphy) && searchGiphy.length > 0 && (
          <div className="search-results">Search result</div>
        )}
        {Array.isArray(searchGiphy) &&
          searchGiphy.length > 0 &&
          searchGiphy.map((item) => (
            <Card
              imgUrl={item.images.preview_gif.url}
              imgTitle={item.title}
              key={item.id}
              id={item.images.slug}
              handleOnClick={handleOnClick}
            />
          ))}
        {Array.isArray(searchGiphy) && searchGiphy.length === 0 && (
          <div>Oops... No result found</div>
        )}
      </div>
      <Model>
        <div id="imgModal" class="modal">
          <span class="close" onClick={handleClose}>
            &times;
          </span>
          <img class="modal-content" id="img01" alt="" />
        </div>
      </Model>
    </>
  );
};

export default GiphyGallary;
