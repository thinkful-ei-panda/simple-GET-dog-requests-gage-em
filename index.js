'use strict';

function getDogImage() {
  const dnumber = $('.dogcount').val();
  console.log('dnumber= ', dnumber);
  fetch(`https://dog.ceo/api/breeds/image/random/${dnumber}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function numberHandler() {
  $('.dogform').submit(event => {
    // prevent default
    event.preventDefault();
    // get number
    const dnumber = $('.dogcount').val();
    console.log(dnumber);
    return dnumber;
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  let arr = [];
  for (let i = 0; i < responseJson.message.length; i++) {
    arr.push(`<img src="${responseJson.message[i]}" class="results-img">`);
  }
  $('.results-img').replaceWith(arr.join('\n'));
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
    // numberHandler();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
