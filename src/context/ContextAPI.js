import { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}&part=snippet`).then((response) => {
      // console.log(response); // Log the entire response

      const videosWithDetails = response?.data?.items?.map((video) => {
        const { videoId } = video.id;
        const {
          title,
          description,
          channelTitle,
          thumbnails,
          liveBroadcastContent,
        } = video.snippet;

        return {
          videoId,
          title,
          description,
          channelTitle,
          thumbnail: thumbnails, // Adjust as needed based on the desired thumbnail size
          isLive: liveBroadcastContent,
        };
      });

      // console.log(videosWithDetails);
      setSearchResults(videosWithDetails);
      setLoading(false);
    });
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        setSearchResults,
        selectCategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
