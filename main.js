const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3";

//Promise
/*fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const img = document.querySelector("img");
    img.src = data[0].url;
  });
*/

//async await
const getCat = async () => {
  try {
    const resAPI = await fetch(API_URL);
    const api = await resAPI.json();

    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");

    console.log(api);
    img1.src = api[0].url;
    img2.src = api[1].url;
    img3.src = api[2].url;
  } catch (error) {
    console.log(error);
  }
};
getCat();

const restartImage = document.querySelector("#restart__button");

restartImage.addEventListener("click", getCat);
