const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=4f4a66e5-46aa-4de3-9bef-13d690177b37";
const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?limit=2&api_key=4f4a66e5-46aa-4de3-9bef-13d690177b37";

const spanError = document.querySelector("#error");

//Promise
/*fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const img = document.querySelector("img");
    img.src = data[0].url;
  });
*/

//async await
const loadRandomMichis = async () => {
  try {
    const resAPI = await fetch(API_URL_RANDOM);
    const data = await resAPI.json();
    console.log("Random");
    console.log(data);

    if (resAPI.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + resAPI.status;
    } else {
      const img1 = document.getElementById("img1");
      const img2 = document.getElementById("img2");

      img1.src = data[0].url;
      img2.src = data[1].url;
    }
  } catch (error) {
    console.log(error);
  }
};

const loadFavoritesMichis = async () => {
  try {
    const resAPI = await fetch(API_URL_FAVORITES);
    const data = await resAPI.json();
    console.log("Favorites");
    console.log(data);

    if (resAPI.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + resAPI.status;
    }
  } catch (error) {
    console.log(error);
  }
};

loadRandomMichis();
loadFavoritesMichis();

const restartImage = document.querySelector("#restart__button");

restartImage.addEventListener("click", loadRandomMichis);
