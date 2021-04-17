// variables
const input = document.getElementById('ip-address');
const btn = document.querySelector('.loading-div');
const arrow = document.querySelector('.arrow');
const userIp = document.getElementById('ip-result');
const loadingEl = document.querySelector('.loading-div');
const userState = document.getElementById('state-result');
const userTimezone = document.getElementById('timezone-result');
const userISP = document.getElementById('isp-result');

// fetch data from ipify api
async function getApiData(api) {
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

const getIp = () => {
  const api =
    'https://geo.ipify.org/api/v1?apiKey=at_T2dAIMVQ78CBvi5V9SJv4twelfkUe';
  const getUserCurrentIp = async () => {
    try {
      const data = await getApiData(api);
      console.log(data);

      fetchIpDetails(data, userIp, userState, userTimezone, userISP);

      // initialize the renderMap() function to get the latitude and longitude from the ipify api
      let lat = data.location.lat;
      let lon = data.location.lng;
      renderMap(lat, lon);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  // generate map using the leaflet js library
  const renderMap = generateMap();
  getUserCurrentIp();
};

const fetchIpDetails = (data, userIp, userState, userTimezone, userISP) => {
  const { ip, isp } = data;
  const { city, timezone, region, postalCode, lat, lng } = data.location;

  userIp.textContent = ip;
  userState.innerHTML = `${city}, ${region} <br/> ${postalCode}`;
  userTimezone.textContent = `UTC${timezone}`;
  userISP.textContent = isp;
};

// get input ip details
const getInputIp = () => {
  const userInputValue = input.value;

  const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (userInputValue === '') {
    alert('Kindly input an IP address');
  } else {
    if (userInputValue.match(ipformat)) {
      // create loader
      const loading = document.createElement('div');
      loading.classList.add('loader');
      loading.id = 'loader';
      loadingEl.appendChild(loading);
      arrow.classList.add('active');

      const api = `https://geo.ipify.org/api/v1?apiKey=at_T2dAIMVQ78CBvi5V9SJv4twelfkUe&ipAddress=${userInputValue}`;

      const fetchIp = async () => {
        try {
          const data = await getApiData(api);
          console.log(data);

          fetchIpDetails(data, userIp, userState, userTimezone, userISP);

          // remove loader div
          loadingEl.removeChild(loading);

          arrow.classList.remove('active');

          // get the current ip address latitude and longitude
          let lat = data.location.lat;
          let lon = data.location.lng;
          renderMap(lat, lon);
        } catch (error) {
          console.log(`${error}`);
        }
      };
      // render the map
      const renderMap = generateMap();
      fetchIp();

      return true;
    } else {
      alert('You have entered an invalid IP address');
      return false;
    }
  }
};

// generate the map using leaflet js library
const generateMap = () => {
  // get the lat and long value from either the getIp or getInputIp function
  return (lat, lon) => {
    // reset the map div
    if (L.DomUtil.get('map') !== undefined) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    // indicate the location on the map using latitude and longitude
    var mymap = L.map('map').setView([lat, lon], 13);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VwZXJicmVlenkiLCJhIjoiY2tuNTZ5MDV4MDFjOTJ1czZoaTZmM2F4ayJ9.M0sixuRYQJl1ilKdXcYhQQ',
      {
        maxZoom: 18,
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(mymap);

    // set own icon
    var locationIcon = L.icon({
      iconUrl: './images/icon-location.svg',
    });
    // indicate a marker for thecurrent location on the map
    var marker = L.marker([lat, lon], { icon: locationIcon }).addTo(mymap);
  };
};

// fetch the input ip address on pressing of enter
const activateEnterKey = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    getInputIp();
  }
};

// event listeners
window.addEventListener('load', getIp);
btn.addEventListener('click', getInputIp);
input.addEventListener('keydown', activateEnterKey);
