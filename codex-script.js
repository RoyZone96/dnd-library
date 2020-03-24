'use strict';




//Enter the app
$('.enter').on('click', function (event) {
  event.preventDefault();
  $('#main-stage').toggle()
  $('#welcome').hide()
});

//Exit app
$('#return-to-welcome').on('click', function (event) {
  event.preventDefault();
  $('#main-stage').toggle();
  $('#welcome').show()
});



//Get spells
function getSpell(searchSpell) {
  const searchUrl = `https://www.dnd5eapi.co/api/spells/${searchSpell}`;
  console.log(searchUrl)
  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showSpell(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

function showSpell(responseJson){
  $('.codex').empty();
  console.log(responseJson)
  
  $('.codex').append(`<ul class="status">
  <li><h3>${responseJson.name}</h3></li>
  <li>${responseJson.desc}</li>
  <li>${responseJson.range}</li>
  <li>${responseJson.higher_level}</li>
  <li>${responseJson.range}</li>
  <li>${responseJson.duration}</li>
  <li>${responseJson.casting_time}</li>
  <li>${responseJson.level}</li>
  </ul>`)
}



//Get cards from API
function getMonster(searchTerm) {
  const searchUrl = `https://www.dnd5eapi.co/api/monsters/${searchTerm}`;

  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showMonster(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}


// Show the cards in format
function showMonster(responseJson) {
  console.log(responseJson)
  $('.codex').empty();

  const actions = responseJson.actions.map(array => `<p>${array.name} - ${array.desc}</p>`);

  $('.codex').append(`<ul class="status">
        <li><h3>${responseJson.name}</h3></li>
        <li>Armor Class: ${responseJson.armor_class}</li>
        <li>Hit Points: ${responseJson.hit_points}</li>
        <li>Strength: ${responseJson.strength}</li>
        <li>Dexterity: ${responseJson.dexterity}</li>
        <li>Constitution: ${responseJson.constitution}</li>
        <li>Wisdom: ${responseJson.wisdom}</li>
        <li>Charisma: ${responseJson.charisma}</li>
        <li>Actions: ${actions.join("")}</li>
        </ul>`)

        if (responseJson.special_abilities != undefined){
          const sa = responseJson.special_abilities.map(array => `<p>${array.name} - ${array.desc}<p>`)
          $('.stats').append(`<li>Special Abilities: ${sa.join("")}</li>`)
        }
        else{
          return null
        }
        
        if (responseJson.legendary_actions != undefined){
         const la = responseJson.legendary_actions.map(array => `<p>${array.name} - ${array.desc}</p>`);
        $('.stats').append(`<li>Legendary Actions:${la.join("")}</li>`)
         }
        else{
          return null
        }
      }

  

//Run the app
function runApp() {
  $(document).on('click', '#search-monster', function (event) {
    const searchTerm = $('#monster-search').val();
    event.preventDefault();
    console.log(searchTerm)
    getMonster(searchTerm);
  });
  $(document).on('click', '#search-spell-button', function (event) {
    const searchSpell = $('#search-spell-input').val();
    event.preventDefault();
    console.log(searchSpell)    
    getSpell(searchSpell)
  })
}

$(runApp)