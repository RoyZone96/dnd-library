'use strict';

//Enter the app
$('.enter').on('click', function (event) {
  event.preventDefault();
  $('#main-stage').toggle();
  $('#search-menu').toggle();
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

//changing searches
function openSearch(event, searchName) {
  // Declare all variables
  var i, tab_search, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tab_search = document.getElementsByClassName("tab_search");
  for (i = 0; i < tab_search.length; i++) {
    tab_search[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(searchName).style.display = "block";
  event.currentTarget.className += " active";
}


//get races
function getRace(searchRace) {
  const searchRaceStr = searchRace.replace(' ', '-');
  console.log(searchRaceStr);
  const searchUrl = `https://api.open5e.com/races/${searchRaceStr}`;
  console.log(searchUrl)
  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showRace(responseJson))
    .catch(err => {
      $('.codex').empty()
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

//show Race
function showRace(responseJson) {
  $('.codex').empty();
  console.log(responseJson)

  $('#error-message').text("");
  const asi_values = responseJson.asi.map(array => `<p>${array.attributes} - ${array.value}</p>`);

  $('.codex').append(`
 <h1>${responseJson.name}</h1>
 <div class="description">
 <p>${responseJson.desc}</p>
 </div>
 <ul class="status">
 <li>
 <p>${responseJson.asi_desc}</p>
 </li>
 <li>
 <div>
 <p>${responseJson.age}</p> 
 </div>
 </li>
<li><div>
<p>${responseJson.alignment}</p> 
</div></li>
<li>${responseJson.size}</li>
<div>
 <p>${responseJson.speed_desc}</p> 
 </div>
 <div>
 <p>${responseJson.languages}</p> 
 </div>
 <div>
 <p>${responseJson.vision}</p> 
 </div>
 <div>
 <p>${responseJson.traits}</p> 
 </div>
</ul>
 `)

  if (responseJson.subraces) {
    const subraces = responseJson.subraces.map(array => `
  <h3>${array.name}</h3>  
  <p>${array.desc}</p>
  <ul class="status">
    <li>${array.asi_desc}
    <li>${array.traits}
  </ul>

  `);
    $('.codex').append(`
      <div class="subraces"
      <h3>Subraces:</h3>
     <li> ${subraces.join("")}</li>
     </div>`)
  }

}


//Get Classes
function getClass(searchClass) {
  const searchClassStr = searchClass.replace(' ', '-');
  console.log(searchClassStr);
  const searchUrl = `https://api.open5e.com/classes/${searchClassStr}`;
  console.log(searchUrl)
  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showClass(responseJson))
    .catch(err => {
      $('.codex').empty()
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

//Show Classes
function showClass(responseJson) {
  $('.codex').empty();
  console.log(responseJson)
  const archetypes = responseJson.archetypes.map(array => `<p>${array.name} - ${array.desc}</p>`)
  $('#error-message').text("");
  $('.codex').append(`
  <h1>${responseJson.name}</h1>
    <ul class="status">  
      <li>${responseJson.hit_dice}</li>
      <li>${responseJson.hp_at_1st_level}</li>
      <li>${responseJson.hp_at_higher_levels}<li>
    </ul>
  <h2>Proficiencies<h2>
    <ul class="proficiencies">
      <li>${responseJson.prof_armor}</li>
      <li>${responseJson.prof_weapons}</li>
      <li>${responseJson.prof_tools}</li>
      <li>${responseJson.prof_saving_throws}</li>
      <li>${responseJson.prof_skills}</li>
      <li>${responseJson.spellcasting_ability}</li>
    </ul>
<p>${responseJson.equipment}</p
<h3>${responseJson.subtypes_name}</h3>
<li>${archetypes.join("")}</li>
 `)
}

// //Get Backgrounds
// function getBackground(searchBackground) {
//   const searchBackgroundStr = searchBackground.replace(' ', '-');
//   console.log(searchBackgroundStr);
//   const searchUrl = `https://www.dnd5eapi.co/api/backgrounds/${searchBackgroundStr}`;
//   console.log(searchUrl)
//   fetch(searchUrl)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson => showBackground(responseJson))
//     .catch(err => {
//       $('.codex').empty()
//       $('#error-message').text(`Something went wrong: ${err.message}`);
//     });
// }

// //Show Backgrounds
// function showBackground(responseJson) {
//   $('.codex').empty();
//   console.log(responseJson)
//   $('#error-message').text("");
//   const starting_proficiencies = responseJson.starting_proficiencies.map(array => `<p>${array.name}</p>`);
//   const starting_equipment = responseJson.starting_equipment.map(array => )

//   $('.codex').append(`<ul class="status">
//   <h3>${responseJson.name}</h3>
//   <p> Starting Proficiencies </p>
//   <li>${starting_proficiencies.join("")}</li>
//   <li>Duration: ${responseJson.duration}</li>
//  <li>Casting Time: ${responseJson.casting_time}</li>
//  <li> Level: ${responseJson.level}</li>
//  </ul>
// <div class="description">
// <p>${responseJson.desc}</p>
// </div>
// <div class="high-level">
// <p>${responseJson.higher_level}</p>
// </div>
//   `)
// }


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

// show spells in the following format
function showSpell(responseJson) {
  $('.codex').empty();
  console.log(responseJson)
  $('#error-message').text("");
  $('.codex').append(`<h1>${responseJson.name}</h1>
      </<ul class="status">
      <li>School: ${responseJson.school}</li>
      <li>Material: ${responseJson.material}</li>
      <li>Ritual: ${responseJson.concentration}</li>
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

//Get Magic Item from Api
function getMagicItem(searchMagicItem) {
  const searchMagicItemStr = searchMagicItem.replace(' ', '-');
  console.log(searchMagicItemStr);
  const searchUrl = `https://www.dnd5eapi.co/api/spells/${searchMagicItemStr}`;
  console.log(searchUrl)
  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showMagicItem(responseJson))
    .catch(err => {
      $('.codex').empty()
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

//Show Magic Item
function showMagicItem(responseJson) {
  $('.codex').empty();
  console.log(responseJson)
  $('#error-message').text("");
  $('.codex').append(`
  <h1>${responseJson.name}</h1>
  <p>Type: ${responseJson.type}</p> 
  <p>Rarity: ${responseJson.rarity}</p>
    <div class="description">
      <p>${responseJson.desc}</p>
    </div>
    <div class="attunement">
      <p>${responseJson.requires_attunement}</p>
    </div>
  `)
}


//Get monsters from API
function getMonster(searchTerm) {
  const searchMonster = searchTerm.replace(/ /g, '-')
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
      $('#error-message').text(`Something went wrong: Please narrow down your search`);
    });
}


// Show the monsters in format
function showMonster(responseJson) {
  console.log(responseJson)
  $('.codex').empty();
  $('#error-message').text("")
  const actions = responseJson.actions.map(array => `<p>${array.name} - ${array.desc}</p>`);

  $('.codex').append(`
        <h1>${responseJson.name}</h1>
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
        <h2>Actions:</h2>
        <li>${actions.join("")}</li>
        </div>
        `)

  if (responseJson.special_abilities) {
    const sa = responseJson.special_abilities.map(array => `<p>${array.name} - ${array.desc}<p>`);
    $('.codex').append(`<div class="specials">
         <h2>Special Abilities:</h2>
         <li>${sa.join("")}</li>
         </div>`)
  }

  if (responseJson.legendary_actions) {
    const la = responseJson.legendary_actions.map(array => `<p>${array.name} - ${array.desc}</p>`);
    $('.codex').append(`
        <div class="legendary"
        <h2>Legendary Actions:</h2>
       <li> ${la.join("")}</li>
       </div>`)
  }
}

//Run the app
function runApp() {

  var input = document.getElementById("race-search");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search-race").click();
    }
  });

  var input = document.getElementById("class-search");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("class-search").click();
    }
  });

  var input = document.getElementById("magicItem-search");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("magicItem-search").click();
    }
  });

  var input = document.getElementById("monster-search");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search-monster").click();
    }
  });

  var input = document.getElementById("search-spell-input");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search-spell-button").click();
    }
  });

  $(document).on('click', '#search-race', function (event) {
    event.preventDefault();
    const searchTerm = $('#race-search').val();
    if (searchTerm.length == 0) {
      $('.codex').empty();
      $('#error-message').text('Please type in a search race');
    } else {
      getRace(searchTerm.toLowerCase());
    }
  });
  $(document).on('click', '#search-class', function (event) {
    event.preventDefault();
    const searchTerm = $('#class-search').val();
    if (searchTerm.length == 0) {
      $('.codex').empty();
      $('#error-message').text('Please type in a search race');
    } else {
      getClass(searchTerm.toLowerCase());
    }
  });
  $(document).on('click', '#search-magicItem', function (event) {
    event.preventDefault();
    const searchTerm = $('#magicItem-search').val();
    if (searchTerm.length == 0) {
      $('.codex').empty();
      $('#error-message').text('Please type in a search race');
    } else {
      getMagicItem(searchTerm.toLowerCase());
    }
  });
  $(document).on('click', '#search-monster', function (event) {
    event.preventDefault();
    const searchTerm = $('#monster-search').val();
    if (searchTerm.length == 0) {
      $('.codex').empty();
      $('#error-message').text('Please type in a search monster');
    } else {
      getMonster(searchTerm.toLowerCase());
    }
  });
  $(document).on('click', '#search-spell-button', function (event) {
    event.preventDefault();
    const searchSpell = $('#search-spell-input').val();
    if (searchSpell.length == 0) {
      $('.codex').empty();
      $('#error-message').text('Please type in a search spell');
    } else {
      getSpell(searchSpell.toLowerCase())
    }
  })
}

$(runApp)