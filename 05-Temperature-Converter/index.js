function temperatureConverter() {
  const input = parseFloat(document.getElementById('temperatureInput').value);
  const conversionType = document.getElementById('conversionType').value;
  const outputField = document.getElementById('convertedTemperature');

  if (isNaN(input)) {
    outputField.value = '';
    return;
  }

  let result;

  if (conversionType === 'f-to-c') {
    result = ((input - 32) * 5) / 9;
    outputField.value = result.toFixed(2) + " °C";
  } else {
    result = (input * 9) / 5 + 32;
    outputField.value = result.toFixed(2) + " °F";
  }
}

function updateLabels() {
  const conversionType = document.getElementById('conversionType').value;
  const inputLabel = document.getElementById('inputLabel');
  const outputLabel = document.getElementById('outputLabel');

  if (conversionType === 'f-to-c') {
    inputLabel.innerText = "Enter Temperature (°F)";
    outputLabel.innerText = "Converted Temperature (°C)";
  } else {
    inputLabel.innerText = "Enter Temperature (°C)";
    outputLabel.innerText = "Converted Temperature (°F)";
  }

  // Clear values
  document.getElementById('temperatureInput').value = '';
  document.getElementById('convertedTemperature').value = '';
}