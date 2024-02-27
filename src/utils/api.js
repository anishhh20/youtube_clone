import axios from "axios";

// const BASE_URL = "https://www.googleapis.com/youtube/v3/";
// const apiKey = "AIzaSyDR9Z3ntTbI_pwJpbFcL7jR-u8-ruGikFc"; //project main
// const apiKey = "AIzaSyCCuR9y3elgUB_Vt3AU_G5L8LPbyzqoFY0"; //project main
const apiKey = process.env.REACT_APP_YOUTUBE_KEY

const maxResults = 50


// export const fetchDataFromApi = async (url) => {
//   const { data } = await axios.get(`${BASE_URL}/${url}&key=${process.env.REACT_APP_YOUTUBE_KEY}`);
//   return data;
// };



export const fetchDataFromApi = async (url) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/${url}&key=${apiKey}&maxResults=${maxResults}`
    );
    // Handle the response data here
    console.log(response);
    return response 
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};



// import axios from "axios";

// const BASE_URL = "https://youtube138.p.rapidapi.com";

// const options = {
//     params: { hl: "en", gl: "US" },
//     headers: {
//         "X-RapidAPI-Key":
//             process.env.REACT_APP_YOUTUBE_KEY || "YOUR_API_KEY",
//         "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
//     },
// };

// export const fetchDataFromApi = async (url) => {
//     const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//     return data;
// };