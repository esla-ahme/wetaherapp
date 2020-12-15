/* Global Variables */
const apiKey = "c9c7fbf170c4fc226fd4cf38288023e7";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="//${zip_code}&appid=${apiKey}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', runCode);

//excute code on click the button
function runCode(e) {
  //prevent default behaviour
  e.preventDefault();
  // get user input values
  const zip_code = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeatherData(baseURL, zip_code, apiKey)
    .then(function (userData) {
      // add data to thePOST request
      postData('/add', { date: newDate, temp: userData.main.temp, feelings })
    }).then(function () {
      // updatw ui
      updateUI()
    })
}

const getWeatherData = async (baseURL, zip_code, apiKey) => {
  const res = await fetch(baseURL + zip_code + "&units=metric&appid=" + apiKey);
  try {
    const weatherData = await res.json();
    console.log(weatherData);

    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      feelings: data.feelings
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const projectData = await request.json()
    document.getElementById('date').innerText = `today date is : ${projectData.date}`;
    document.getElementById('temp').innerText = `weather : ${projectData.temp}`;
    document.getElementById('content').innerText = `feeling : ${projectData.feelings}`;
  }
  catch (error) {
    console.log("error", error);
  }
};
