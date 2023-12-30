const apiKey = "jrXKcEBSSukgpVLLctpNHWuaoy2RgfdE65JlFBfg";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currImgContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

// function to fetch data to current date and display it
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getImageOfTheDay(currentDate);
}

// function to fetch data from apiKey to display it
function getImageOfTheDay(date) {
  fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      displayImageData(data);
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => {
      console.log(error);
    });
}

// function to display image data in the UI
function displayImageData(data) {
  const image = document.createElement("img");
  image.src = data.url;
  image.alt = data.title;

  const title = document.createElement("h3");
  title.textContent = data.title;

  const bio = document.createElement("p");
  bio.textContent = data.explanation;

  
  currImgContainer.innerHTML = "";
  currImgContainer.append(image, title, bio);
}

// function to save search data
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// function to addSearchToHistory on the UI
function addSearchToHistory() {
  searchHistory.innerHTML = "";
  let searches = JSON.parse(localStorage.getItem("searches")) || [];

  searches.forEach((date) => {
    if (!document.querySelector(`#search-history li[data-date="${date}"]`)) {
      const listItem = document.createElement("li");
      listItem.textContent = date;
      listItem.setAttribute("data-date", date);

      listItem.addEventListener("click", () => {
          updateHeading(date);
          getImageOfTheDay(date);
        });
      searchHistory.appendChild(listItem);
    }
  });
}

// function to update heading
function updateHeading(date) {
  const heading = document.querySelector(".head");
  heading.innerHTML = `Picture on ${date}`;
}

// Event listener for the form Submition
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectDate = searchInput.value;
  getImageOfTheDay(selectDate);
});

// Load the current image of the day when page is loaded
getCurrentImageOfTheDay();
addSearchToHistory();
