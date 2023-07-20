let hourlyRate;

chrome.storage.local.get(['hourlyRate'], function (obj) {
  obj.hourlyRate ? (hourlyRate = obj.hourlyRate) : (hourlyRate = 33.21);
  updateCurrentRate();
});

function updateHourlyRate() {
  hourlyRate = document.getElementById('input-rate').value;
  chrome.storage.local.set({ hourlyRate: hourlyRate });
  updateCurrentRate();
}

function updateCurrentRate() {
  document.getElementById('hourly-rate').innerHTML = hourlyRate;
}

document.getElementById('button').addEventListener('click', updateHourlyRate);
updateCurrentRate();
