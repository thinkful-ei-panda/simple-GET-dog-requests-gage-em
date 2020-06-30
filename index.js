



const breedStore = [];


const getBreeds = () =>{
  fetch('https://dog.ceo/api/breeds/list/all')
    .then((res) =>{
      return res.json();
    })
    .catch((error) => {
      throw new Error(error);
    })
    .then( data =>{
      let res = [];
      for(let i in data.message){
        res.push(`<option value="${i}">${i}</option>`);
      }
      res = res.join(' \n ');
      $('#breeds').html(res);
    });
};

function getDogImage() {
  const breed = $('#breeds').val();
  const count = $('#dogcount').val();
  const url= `https://dog.ceo/api/breed/${breed}/images/random/${count}`;
  
  fetch(url)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}



function displayResults(responseJson) {
  if($('#dogcount').val() === 1){
    $('.results-img').replaceWith(
      `<img src="${responseJson.message}" class="results-img">`
    );
    //display the results section
    $('.results').removeClass('hidden');
  }else{
    const res =[];
    responseJson.message.map( dog => res.push(`<img src="${dog}" class="results-img">`));
    $('.results-img').replaceWith(res.join(''));
    $('.results').removeClass('hidden');

  }
  
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

function main (){
  getBreeds();
  watchForm();
}

$(main);