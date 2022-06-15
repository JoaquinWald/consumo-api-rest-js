//Promise
/*fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const img = document.querySelector("img");
    img.src = data[0].url;
  });
*/

const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=4f4a66e5-46aa-4de3-9bef-13d690177b37";
const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?&api_key=4f4a66e5-46aa-4de3-9bef-13d690177b37";
const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?&api_key=4f4a66e5-46aa-4de3-9bef-13d690177b37`;

const spanError = document.querySelector("#error");

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
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");

      img1.src = data[0].url;
      img2.src = data[1].url;

      btn1.onclick = () => saveFavoriteMichi(data[0].id);
      btn2.onclick = () => saveFavoriteMichi(data[1].id);
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
    } else {
      const section = document.getElementById("favoritesMichis");
      section.innerHTML = "";

      const h2 = document.createElement("h2");
      const h2Text = document.createTextNode("Michis Favoritos");
      h2.appendChild(h2Text);
      section.appendChild(h2);

      data.forEach((michi) => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const btnText = document.createTextNode("Sacar michi de favoritos");

        img.src = michi.image.url;
        img.width = 150;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavoriteMichi(michi.id);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const saveFavoriteMichi = async (id) => {
  const resAPI = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await resAPI.json();

  console.log("Save");
  console.log(resAPI);

  if (resAPI.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + resAPI.status + data;
  } else {
    console.log("Michi guardado en favoritos");
    loadFavoritesMichis();
  }
};

const deleteFavoriteMichi = async (id) => {
  const resAPI = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await resAPI.json();

  if (resAPI.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + resAPI.status + data;
  } else {
    console.log("Michi borrado de favoritos");
    loadFavoritesMichis();
  }
};

loadRandomMichis();
loadFavoritesMichis();

const restartImage = document.querySelector("#restart__button");

restartImage.addEventListener("click", loadRandomMichis);
