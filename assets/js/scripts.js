function initProgram() {
    const inputEl = document.getElementById("inputEl");
    console.log(inputEl);
    const submitButtonEl = document.getElementById("submitBtn")
    let cityName;

    let informationGathered;

    function getFahrenheit(k){
        return Math.floor((k - 273.15)* 1.8000+ 32.00);
    }

    function getInfo() {
        const apiKey = "&appid=201eb0ee5ccf4e9d19410ecb6a7d9eba"
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
        console.log(cityName);
        
        console.log(queryURL+cityName+apiKey);

        axios.get(queryURL+cityName+apiKey)
            .then(function (response) {
                informationGathered = response.data;
                renderWeather();
            }
            )
    }

    function renderWeather(){
        console.log(informationGathered);

        $('#mainSection').prepend(`

            <div class="row">
               <div class="col">
                   <h2>
                    ` +informationGathered.city.name+ `
                   </h2>
                   <ul>
                     <li id="uvIndex">
                           Conditions: `+ informationGathered.list[0].weather[0].main+`
                     </li>
                       <li id="temperature">
                           Temperature: `+ getFahrenheit(informationGathered.list[0].main.temp)+`
                       </li>
                       <li id="humidity">
                           Humidity: `+informationGathered.list[0].main.humidity+`
                       </li>
                       <li id="windSpeed">
                           Wind Speed: `+informationGathered.list[0].wind.speed+`
                       </li>
                   </ul>
               </div>
            </div>`
        )

        for (let i = 0; i<5; i++){
            $('#weatherForecast').append(`
            <div class="col weather-card">
                <h4>
                `+informationGathered.list[i+1].dt_txt.slice(5, 7)+`
                </h4>
                <p>
                Temperature: `+getFahrenheit(informationGathered.list[i+1].main.temp)+`
                </p>
                <p>
                Humidity: `+informationGathered.list[i+1].main.humidity+`
                </p>
             </div>
             `
             )} 

    } 

    submitButtonEl.addEventListener("click", function(){
        event.preventDefault();
        console.log(inputEl.value)
        cityName = inputEl.value;
        console.log(cityName);
        getInfo();
    })

} initProgram();













//<button data-searchterm="arnold schwarzenegger">

// const searchTerm = 

// const inputEl = document.getElementById("search");
// const result = inputEl.value
// console.log(result)

// searchButtonEl = document.getElementById("search-button");
// clearButtonEl = document.getElementById("clear-button");
// searchButtonEl.addEventListener("click", function (event) {
//     event.preventDefault();
//     const inputEl = document.getElementById("search");
//     const userInput = inputEl.value
//     const queryURL = "https://pokeapi.co/api/v2/pokemon/" + userInput;
//     let informationGathered;










//     function getInfo() {
//         axios.get(queryURL)
//             .then(function (response) {
//                 // const person = this.getAttribute("data-person");  
//                 // const results = response.data.data;=
//                 informationGathered = response.data.abilities;
//                 console.log(informationGathered)
//                 printInformation();
//             }
//          )

//     }












//     function printInformation() {
//         for (let i = 0; informationGathered.length; i++) {
//             $('#topArticles').append(`
//             <li class="section-articles">
//                 <span id ="resultTitle">
//                 `+ informationGathered[i].ability.name + `
//                 </span>
//                 <h3 id ="resultAuthor">
//                 `+ informationGathered[i].is_hidden + `
//                 </h3 id ="resultSection">
//                 <h3>
//                 `+ informationGathered[i].slot + `
//                 </h3>
//                 <h3 id ="resultDate">
//             I don't care
//                 </h3>
//                     <a href="https://google.com" id ="resultURL">google.com</a>
//                  </li>
//             `);
//         }
//     }

//     getInfo();
// })
// clearButtonEl.addEventListener("click", function (event) {
//     event.preventDefault();
//     console.log("You hit the clear button! I'm so proud of you.")
// })







