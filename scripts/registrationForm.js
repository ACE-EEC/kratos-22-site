$('event-list').ready(() => {
  loadSoloEventList();
});

function truncate(str, size) {
  if (str.length > size - 3 + 1) {
    return str.slice(0, size).concat('...');
  } else {
    return str;
  }
}

function toCodeName(titleName) {
  // console.log('toCodeName(): ', titleName)
  return titleName.toLowerCase().replace(' ', '_');
}

function toTitleNameList(codeNameList) {
  return codeNameList.map((x) => x.toLowerCase().replace('_', ' ').split(' ').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).reduce((a, x) => a + ' ' + x));
}

async function getChosenSoloEventList() {
  let allEvents = await fetchEventList();
  let soloEvents = [];
  let chosenEventTitles = toTitleNameList(getRegistrationList());
  // console.log('chosenEventTitles(): ', chosenEventTitles);
  // console.log('fetchEventList(): ', allEvents);

  for (let i = 0; i < allEvents.length; i++) {
    // console.log('allEvents[i].content.teamBased.toLowerCase() === "solo" ', allEvents[i].content.teamBased.toLowerCase() === "solo");
    // console.log('chosenEventTitles.includes(allEvents[i].content.name) ', chosenEventTitles.includes(allEvents[i].content.name))
    // console.log('toTitleNameList([allEvents[i].content.name])[0]) ', toTitleNameList([allEvents[i].content.name])[0])
    if (allEvents[i].content.teamBased.toLowerCase() === "solo" && chosenEventTitles.includes(toTitleNameList([allEvents[i].content.name])[0])) {
      soloEvents.push(allEvents[i].content.name);
    }
  }
  // console.log('getChosenSoloEventList(): ', soloEvents)
  return soloEvents;
}

async function getChosenTeamEventList() {
  let allEvents = await fetchEventList();
  let teamEvents = [];
  let chosenEvents = toTitleNameList(getRegistrationList());

  for (let i = 0; i < allEvents.length; i++) {
    if (allEvents[i].content.teamBased.toLowerCase() !== "solo" && chosenEvents.includes(allEvents[i].content.name)) {
      teamEvents.push(allEvents[i]);
    }
  }

  return teamEvents;
}

async function loadSoloEventList() {
  let elist = document.getElementsByClassName('event-list')[0];
  let soloList = await getChosenSoloEventList();

  for (let i = 0; i < soloList.length; i++) {
    elist.innerHTML += `<div class="event-list-item">${soloList[i]}</div>`
  }

  if (soloList.length === 0) {
    $('.section-header').find('h4')[0].innerHTML = "You haven't chosen any solo events";
    $('.section-header').find('h5')[0].innerHTML = "Skip ahead to the next page for team events"
    $('.section-header').find('h5').after($('#soloFormNext'));
    $('#soloFormNext')[0].style.alignSelf = 'center';
    $('.event-list')[0].style.display = 'none';

    // $('.section-header').find('.event-list')[0].style.display = 'none';
    // $('.form-title')[0].style.display = 'none';
    // $('.form-title-hr')[0].style.display = 'none';
    // $('form')[0].style.display = 'none';

    $('form').find('input').attr('disabled', true);
    $('form').find('input').attr('placeholder', 'Currently Disabled');
    $('#soloFormNext')[0].innerHTML = "Skip";
    // $('#soloFormNext').attr('onclick', 'skipSoloRegistration()');
  }
}

let formData = {}
let teamEvIndex = -1;

async function toTeamEvents() {

  // Get all the previous pages values to store in object
  for (let i = 0; i < 4; i++) {
    // This "if" is to handle the case between skipping page and next page buttons.
    // In the case of nextPage button, the input need to be validated prior to this fn.
    if ($('#soloForm')[0][i].value) {
      formData[$('#soloForm')[0][i].name] = $('#soloForm')[0][i].value;
    } else {
      formData[$('#soloForm')[0][i].name] = 'none';
    }
  }
  formData['solo_events'] = await getChosenSoloEventList();
  console.log('Solo form data', formData);

  let teamEvents = await getChosenTeamEventList();
  $('#soloSection')[0].style.display = 'none';
  if (teamEvents.length === 0) {
    console.log('no team events, going to final page directly')
    await toFinalPage();
  } else {
    console.log('going to first team event page')
    teamEvIndex += 1;
    $('#blockQuote').after(`
      <div class="section" id="teamSection${teamEvIndex}">
        <div class="section-header">
          <h3>Team Events</h3>
          <h4>Registering for 
            <span class="team-event-title">${teamEvents[teamEvIndex].content.name}</span>
          </h4>
          <div class="image-container">
            <img src="${teamEvents[teamEvIndex].content.image}"/>
          </div>
        </div>

        <div class="form-title">Team's Details</div>
        <div class="form-title-hr"></div>

        <form id="teamForm${teamEvIndex}">
          <!-- TODO: make this checkbox work -->
          <div class='checkbox-row'>
            <input class='checkbox' type='checkbox' name='leader' id='leader'/>
            <label for='leader'>I'm the leader</label>
          </div>
          <div>
            <label>College</label>
            <input id="formCollege" type="text" name="college_name" placeholder="e.g. Easwari Engineering College" />
          </div>
          <div>
            <label>Leader's Email</label>
            <input id="formEmail" type="text" name="email" placeholder="e.g. user@example.com" autocomplete="email" />
          </div>
          <div>
            <label>Leader's Phone Number</label>
            <input id="formMobile" type="text" name="mobile" placeholder="e.g. 1234567890" minlength="10" size="10" autocomplete="mobile" />
          </div>
          <div style="margin-bottom: 2em;">
            <label>Leader's Full Name</label>
            <input id="formLeaderName" type="text" name="leader_full_name" placeholder="e.g. Joe Mama" autocomplete="name" size="30" />
          </div>
          <button id='teamFormNext${teamEvIndex}' type="button" class="next-button" onclick="nextTeamSection()">Next</button>
        </form>
      </div>`);
    for (let i = 1; i < teamEvents[teamEvIndex].content.teamSize.split("-")[1]; i++) {
      $(`#teamFormNext${teamEvIndex}`).before(`
          <div>
            <label>Member ${i}'s</label>
            <input id="formMemberName${i}" type="text" name="member${i}_full_name" placeholder="e.g. Joe Mama" size="30"/>
          </div>
        `);
    }
    $("html, body").animate(
      { scrollTop: $("#blockQuote").position().top },
      "slow"
    );


  }
}

async function nextTeamSection() {
  let teamEvents = await getChosenTeamEventList();
  console.log('Team events list: ', teamEvents);
  formData[toCodeName(teamEvents[teamEvIndex].content.name)] = {}; // create the subobject for this event's data
  for (let i = 0; i < $(`#teamForm${teamEvIndex}`)[0].length; i++) {
    // ignore the checkbox value, and any other input fields
    if ($(`#teamForm${teamEvIndex}`)[0][i].type == "text") {
      formData[toCodeName(teamEvents[teamEvIndex].content.name)][$(`#teamForm${teamEvIndex}`)[0][i].name] = $(`#teamForm${teamEvIndex}`)[0][i].value;
    }
  }
  console.log('form data after team event ', teamEvIndex, formData);
  $(`#teamSection${teamEvIndex}`)[0].style.display = 'none';


  // go to next page
  if (teamEvIndex === teamEvents.length - 1) {
    console.log('Going to final page.')
    await toFinalPage();
  } else {
    teamEvIndex += 1;
    console.log(`going to ${teamEvIndex} team event page`)
    $('#blockQuote').after(`
      <div class="section" id="teamSection${teamEvIndex}">
        <div class="section-header">
          <h3>Team Events</h3>
          <h4>Registering for 
            <span class="team-event-title">${teamEvents[teamEvIndex].content.name}</span>
          </h4>
          <div class="image-container">
            <img src="${teamEvents[teamEvIndex].content.image}"/>
          </div>
        </div>

        <div class="form-title">Team's Details</div>
        <div class="form-title-hr"></div>

        <form id="teamForm${teamEvIndex}">
          <!-- TODO: make this checkbox work -->
          <div class='checkbox-row'>
            <input class='checkbox' type='checkbox' name='sameTeam' id='sameTeam'/>
            <div>
              <label for='sameTeam'>Same team as previous</label>
              <div class="checkbox-info">First N members will be taken if previous team is larger than required.</div>
            </div>
          </div>
          <div>
            <label>College</label>
            <input id="formCollege" type="text" name="college_name" placeholder="e.g. Easwari Engineering College" />
          </div>
          <div>
            <label>Leader's Email</label>
            <input id="formEmail" type="text" name="email" placeholder="e.g. user@example.com" autocomplete="email" />
          </div>
          <div>
            <label>Leader's Phone Number</label>
            <input id="formMobile" type="text" name="mobile" placeholder="e.g. 1234567890" minlength="10" size="10" autocomplete="mobile" />
          </div>
          <div style="margin-bottom: 2em;">
            <label>Leader's Full Name</label>
            <input id="formLeaderName" type="text" name="leader_full_name" placeholder="e.g. Joe Mama" autocomplete="name" size="30" />
          </div>
          <button id='teamFormNext${teamEvIndex}' type="button" class="next-button" onclick="nextTeamSection()">Next</button>
        </form>
      </div>`);
    for (let i = 1; i < teamEvents[teamEvIndex].content.teamSize.split('-')[1]; i++) {
      $(`#teamFormNext${teamEvIndex}`).before(`
          <div>
            <label>Member ${i}'s</label>
            <input id="formMemberName${i}" type="text" name="member${i}_full_name" placeholder="e.g. Joe Mama" size="30"/>
          </div>
        `);
    }
    $("html, body").animate(
      { scrollTop: $("#blockQuote").position().top },
      "slow"
    );
  }
}

async function toFinalPage() {
  $('#blockQuote').after(`
  <div class="section" id="reviewSection">
    <div class="section-header">
      <h3>Review & Pay</h3>
    </div>
    
    <div class="form-title">Solo Events</div>
    <div id="soloEventsTitle" class="form-title-hr"></div>

    <div class="form-title">Team Events</div>
    <div id="teamEventsTitle" class="form-title-hr"></div>

    <div class='totalAmount'></div>
    <button id='submitAndPay' type="button" class="submit-button" onclick="alert('TODO replace with function')">Submit & Pay</button>
  </div>
  `);

  let allEvents = await fetchEventList();
  for (let i = 0; i < formData.solo_events.length; i++) {
    $('#soloEventsTitle').after(`
      <div class='review-solo-event-top'> 
        <div class='event-title'>${formData.solo_events[i]}</div>
        <div class='fee'>₹${allEvents.find((v) => toCodeName(v.content.name) == toCodeName(formData.solo_events[i])).content.fee}</div>
        <div class='remove-button'>❌</div>
      </div>
    `);
  }

  let chosenTeamEvents = await getChosenTeamEventList();
  for (let i = chosenTeamEvents.length - 1; i >= 0; i--) {

    let event_code = toCodeName(chosenTeamEvents[i].content.name);
    $('#teamEventsTitle').after(`
      <div class="review-team-event">
        <div class='review-team-event-top'>
          <div class='event-title'>${chosenTeamEvents[i].content.name}</div>
          <div class='fee'>₹${chosenTeamEvents[i].content.fee}</div>
          <div class='remove-button'>❌</div>
        </div>
        <div class='review-team-event-details'>
          <div class="names">
            <div class="name" id="leaderName" style="margin-left: -2em">
              👑 ${truncate(formData[event_code]['leader_full_name'], 15)}
            </div>

          </div>
          <div class="contacts">
            <div class="label">Email</div>
            <div class="contact-detail">${truncate(formData[event_code]['email'], 18)}</div>
            <div class="label">Mobile</div>
            <div class="contact-detail">${formData[event_code]['mobile']}</div>
          </div>
        </div>
      </div>
    `);

    for (let j = 1; j < chosenTeamEvents[i].content.teamSize.split('-')[1]; j++) {
      console.log('executing member name once')
      $('#leaderName').after(`
      <div class="name">
        ${truncate(formData[event_code][`member${j}_full_name`], 15)}
      </div>
      `)
    }
  }
}