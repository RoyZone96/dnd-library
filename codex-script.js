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


//Get monsters from API
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

// Show the monsters in format
function showMonster(responseJson) {
   console.log(responseJson)
  $('.monster-codex').empty();

  const actions = responseJson.actions.map(array => `<p>${array.name} - ${array.desc}</p>`);
  $('.monster-codex').append(`<ul class="stats">
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
  $(document).on('click', '#search', function (event) {
    const searchTerm = $('#monster-search').val();
    event.preventDefault();
    console.log(searchTerm)
    getMonster(searchTerm)
  });
}

$(runApp)