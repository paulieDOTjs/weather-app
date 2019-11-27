function initProgram() {
    const inputEl = document.getElementById("inputEl");
    const submitButtonEl = document.getElementById("submitBtn")
    const searchHistoryEL = document.getElementById("searchHistory")
    const mainSectionEl = document.getElementById("mainSection")
    const apiKey = "201eb0ee5ccf4e9d19410ecb6a7d9eba"
    let previousSearches;

    let cityName;
    let forecastInformationGathered;
    let uvInformationGathered;


    //Retrieves previous searches from local storage 
    //references function updateSearchHistory
    function renderStart() {
        previousSearches = JSON.parse(localStorage.getItem('previousSearches'))
        updateSearchHistory();
        if (previousSearches[previousSearches.length-1] === undefined){
            cityName = "Minneapolis"
        } else{
            cityName = previousSearches[previousSearches.length-1];

        }
        runProgram();
    }

    function runProgram() {
        saveInformation();
        updateSearchHistory();
        getForecasetInfo();
    }
    //Adds event listener to submit button 
    // references the following functions: saveInformation, updateSearchHistory, and getForecasetInfo
    submitButtonEl.addEventListener("click", function () {
        event.preventDefault();
        cityName = inputEl.value;
        runProgram();
    })

    //Checks the previousSearches array, removes any duplicates, 
    // will stop the array from getting to be more than 10 indexes long
    // saves information to local storage.
    function saveInformation() {
        const duplicateSearch = previousSearches.indexOf(cityName);
        if (duplicateSearch !== -1) {
            previousSearches.splice(duplicateSearch, 1);
        }

        if (previousSearches.length > 10) {
            previousSearches.splice(-11, 1);
        }
        previousSearches.push(cityName);
        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        // getForecasetInfo();
    }

    //erases previous search history list items
    //checks to see if there is anything in history
    //if there is nothing it turns it into an array
    //if there is not nothing it prepends the items to display on the page
    function updateSearchHistory() {
        ;
        searchHistoryEL.innerHTML = "";
        if (previousSearches !== null) {
            for (let i = 0; i < previousSearches.length; i++)
                $('#searchHistory').prepend(`
            <li class="previous-searches">
            `+ previousSearches[i] + `
            </li>
            `
                )
        } else {
            previousSearches = [];
        }
        handlePreviousSearchesClick();
    }

    //takes the value of the temperature in kelvins and returns in Fahrenheit
    function getFahrenheit(k) {
        return Math.floor((k - 273.15) * 1.8000 + 32.00);
    }

    //gets information from weather API
    //saves that information to forecastInformationGathered variable
    //runs renderWeather function
    function getForecasetInfo() {
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";

        axios.get(queryURL + cityName+ '&appid=' + apiKey)
            .then(function (response) {
                forecastInformationGathered = response.data;
                getUV();
            }
            )
    }

    function getUV() {
        const uvURL = "https://api.openweathermap.org/data/2.5/uvi?&appid="+apiKey+"&lat="+forecastInformationGathered.city.coord.lat+"&lon="+forecastInformationGathered.city.coord.lon;
        axios.get(uvURL)
            .then(function (response) {
                uvInformationGathered = response;
                console.log(uvInformationGathered)
                renderWeather();
            }
            )
    }

    //erases what was previously in the main section 
    //renders the new information for the main section
    function renderWeather() {

        mainSectionEl.innerHTML = ` <div class="row forecast-boxes" id="weatherForecast"> </div>`;


        $('#mainSection').prepend(`
            <div class="row today-weather ` + forecastInformationGathered.list[4].weather[0].main + `">
               <div class="col">
                   <h2>
                    ` + forecastInformationGathered.city.name + ` <span class="indent"> ` + forecastInformationGathered.list[0].dt_txt.slice(5, 10) + ` </span>
                   </h2>
                   <ul>
                     <li class="weather-dudes">
                           Conditions: `+ forecastInformationGathered.list[4].weather[0].main + `
                     </li>
                     <li class="weather-dudes">
                           Temperature: `+ getFahrenheit(forecastInformationGathered.list[4].main.temp) + ` ℉
                    </li>
                     <li class="weather-dudes">
                           Humidity: `+ forecastInformationGathered.list[4].main.humidity + `
                    </li>
                     <li class="weather-dudes">
                           Wind Speed: `+ forecastInformationGathered.list[4].wind.speed + `
                    </li>
                     <li class="weather-dudes">
                            UV Index: `+ uvInformationGathered.data.value + `
                        </li>
                   </ul>
                </div>
            </div>
               
            <div class="row forecast-words">
               <div class="col">
                    <h3>
                        5-Day Forecast:
                    </h3>
               </div>
           </div>`
        )

        for (let i = 0; i < 5; i++) {

            $('#weatherForecast').append(`
            <div class="col weather-card `+ forecastInformationGathered.list[i * 8 + 4].weather[0].main + `">
                <h4>
                `+ forecastInformationGathered.list[i * 8 + 4].dt_txt.slice(5, 10) + `
                </h4>
                <p>
                `+ forecastInformationGathered.list[i * 8 + 4].weather[0].main + `
                </p>
                <p>
                `+ getFahrenheit(forecastInformationGathered.list[i * 8 + 4].main.temp) + ` ℉
                </p>
                <p>
                Humidity: `+ forecastInformationGathered.list[i * 8 + 4].main.humidity + `
                </p>
             </div>
             `
            )
        }

    }

    //adds event listeners to the previous seaches
    function handlePreviousSearchesClick() {
        const previousSearchEls = document.querySelectorAll(".previous-searches")
        for (let i = 0; i < previousSearchEls.length; i++) {
            const SearchEl = previousSearchEls[i];
            SearchEl.addEventListener("click", function () {
                cityName = SearchEl.innerText;
                runProgram();
            }
            )
        }
    }

    renderStart();
} initProgram();

