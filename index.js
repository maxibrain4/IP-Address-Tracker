// console.log('hello');
'use strict';
const inputbox = document.querySelector('.inputt');
const Btn = document.getElementById('btn');
const ipAddress = document.querySelector('.ip-main-text');
const Loc = document.querySelector('.location-main-text');
const timeZone = document.querySelector('.timez');
const isp = document.querySelector('.isp-main-text');
let map = L.map('map');

//onload of the page
const loadIpData = function (data) {
  htmlDatas(data);
  mapData(data);
};
document.querySelector('body').addEventListener('load', function () {
  getIpdata();
});

const getIpdata = function () {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_R45GyUDsLJuD9QMtt08XUc2dXn8Pt&ipAddress`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      loadIpData(data);
    });
};
getIpdata();

//input search
const renderCountry = function (data) {
  htmlDatas(data);
  mapData(data);
};
Btn.addEventListener('click', function () {
  getIpdata2();
});
const getIpdata2 = function () {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_R45GyUDsLJuD9QMtt08XUc2dXn8Pt&ipAddress=${inputbox.value}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderCountry(data);
    });
};

//map data
const mapData = function (data) {
  const latitude = data.location.lat;
  const longitude = data.location.lng;
  console.log(latitude, longitude);
  const coords = [latitude, longitude];

  map.setView(coords, 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  let greenIcon = new L.Icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [47, 47],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  L.marker(coords, { icon: greenIcon }).addTo(map);
};

//text data
const htmlDatas = function (data) {
  ipAddress.textContent = `${data.ip}`;
  isp.textContent = `${data.isp}`;
  timeZone.textContent = `${data.location.timezone}`;
  Loc.textContent = `${data.location.city} ${data.location.postalCode}`;
};
