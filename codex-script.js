'use strict';



//Enter the app
$('.enter').on('click', function (event) {
  event.preventDefault();
  $('#main-stage').toggle();
  $('.utility').toggle();
  $('#welcome').hide()
});

//Exit app
$('#return-to-welcome').on('click', function (event) {
  event.preventDefault();
  $('#main-stage').toggle();
  $('#welcome').show()
  $('.utility').toggle()
  $('.codex').empty()
   $('#error-message').text("")
});



//Get spells
function getSpell(searchSpell) {
  const searchSpellStr = searchSpell.replace(' ', '-');
  console.log(searchSpellStr);
  const searchUrl = `https://www.dnd5eapi.co/api/spells/${searchSpellStr}`;
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
      $('.codex').empty()
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

// show spells in the folling format
function showSpell(responseJson) {
   $('.codex').empty();
  console.log(responseJson)
   $('#error-message').text("");
  $('.codex').append(`<ul class="status">
  <li><h3>${responseJson.name}</h3></li>
 <li>Range: ${responseJson.range}</li> 
  <li>Duration: ${responseJson.duration}</li>
 <li>Casting Time: ${responseJson.casting_time}</li>
 <li> Level: ${responseJson.level}</li>
 </ul>
<div class="description">
<p>${responseJson.desc}</p>
</div>
<div class="high-level">
<p>${responseJson.higher_level}</p>
</div>
  `)
}



//Get monsters from API
function getMonster(searchTerm) {
  const searchMonster = searchTerm.replace(' ', '-')
  const searchUrl = `https://api.open5e.com/monsters/${searchMonster}`;

  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showMonster(responseJson))
    .catch(err => {
      $('.codex').empty();
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}


// Show the monsters in format
function showMonster(responseJson) {
  console.log(responseJson)
  $('.codex').empty();
  $('#error-message').text("")
const actions = responseJson.actions.map(array => `<p>${array.name} - ${array.desc}</p>`);

  $('.codex').append(`
        <h3>${responseJson.name}</h3>
        <ul class="status">
        <li>Armor Class: ${responseJson.armor_class}</li>
        <li>Hit Points: ${responseJson.hit_points}</li>
        <li>Strength: ${responseJson.strength}</li>
        <li>Dexterity: ${responseJson.dexterity}</li>
        <li>Constitution: ${responseJson.constitution}</li>
        <li>Wisdom: ${responseJson.wisdom}</li>
        <li>Charisma: ${responseJson.charisma}</li>
        </ul>
        <div class = "actions">
        <h4>Actions:</h4>
        <li>${actions.join("")}</li>
        </div>
        `)

      if (responseJson.special_abilities){
          const sa = responseJson.special_abilities.map(array => `<p>${array.name} - ${array.desc}<p>`);
         $('.codex').append(`<div class="specials">
         <h4>Special Abilities:</h4>
         <li>${sa.join("")}</li>
         </div>`)
      }
     
      if (responseJson.legendary_actions) {
       const la = responseJson.legendary_actions.map(array => `<p>${array.name} - ${array.desc}</p>`);
        $('.codex').append(`
        <div class="legendary"
        <h4>Legendary Actions:</h4>
       <li> ${la.join("")}</li>
       </div>`)
      }
     }

//Run the app
function runApp() {
  $(document).on('click', '#search-monster', function (event) {
   event.preventDefault(); 
   const searchTerm = $('#monster-search').val();
    if (searchTerm.length == 0){
      $('.codex').empty();
      $('#error-message').text('Please type in a search monster');
    }
    else{
      getMonster(searchTerm.toLowerCase());
    }
  });
  $(document).on('click', '#search-spell-button', function (event) {
    event.preventDefault();
    const searchSpell = $('#search-spell-input').val();
    if (searchSpell.length == 0){
      $('.codex').empty();
      $('#error-message').text('Please type in a search spell');
    }
    else{
      getSpell(searchSpell.toLowerCase())
    }
  })
}

$(runApp)