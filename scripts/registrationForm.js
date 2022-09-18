// const apiURI = "https://api.kratos23.com"
const apiURI = "http://127.0.0.1:3555"

function truncateString(str, size) {
  if (str.length > size - 3 + 1) {
    let slice = str.slice(0, size)
    if (slice[slice.length - 1] == '.') {
      return slice.concat('..');
    } else {
      return slice.concat('...');
    }
  } else {
    return str;
  }
}

function toCodeName(titleName) {
  return titleName.toLowerCase().replaceAll("'", "").replaceAll('-', ' ').replaceAll(' ', '_');
}

function toTitleNameList(codeNameList) {
  return codeNameList.map((x) => x.toLowerCase().replace('_', ' ').split(' ').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).reduce((a, x) => a + ' ' + x));
}

async function getChosenSoloEventTitleList() {
  let allEvents = await fetchEventList();
  let soloEvents = [];
  let chosenEventTitles = toTitleNameList(getRegistrationList());

  for (let i = 0; i < allEvents.length; i++) {
    if (allEvents[i].content.teamBased.toLowerCase() === "solo" && chosenEventTitles.includes(toTitleNameList([allEvents[i].content.name])[0])) {
      soloEvents.push(allEvents[i].content.name);
    }
  }
  return soloEvents;
}

async function getChosenTeamEventDetailsList() {
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

$('event-list').ready(() => {
  loadSoloEventList();
});

async function loadSoloEventList() {
  let elist = document.getElementsByClassName('event-list')[0];
  let soloList = await getChosenSoloEventTitleList();

  for (let i = 0; i < soloList.length; i++) {
    elist.innerHTML += `<div class="event-list-item">${soloList[i]}</div>`
  }

  // Skip solo details flow. Removed to streamline the flow even more
  if (soloList.length === 0) {
    elist.innerHTML += `<div class="event-list-item" style="background: var(--kratos-grey-lighter); color: var(--kratos-white-dull);">None</div>`
    //   $('.section-header').find('h4')[0].innerHTML = "You haven't chosen any solo events";
    //   $('.section-header').find('h5')[0].innerHTML = "Skip ahead to the next page for team events"
    //   $('.section-header').find('h5').after($('#soloFormNext'));
    //   $('#soloFormNext')[0].style.alignSelf = 'center';
    //   $('.event-list')[0].style.display = 'none';

    //   // $('.section-header').find('.event-list')[0].style.display = 'none';
    //   // $('.form-title')[0].style.display = 'none';
    //   // $('.form-title-hr')[0].style.display = 'none';
    //   // $('form')[0].style.display = 'none';

    //   $('form').find('input').attr('disabled', true);
    //   $('form').find('input').attr('placeholder', 'Currently Disabled');
    //   $('#soloFormNext')[0].innerHTML = "Skip";
    //   // $('#soloFormNext').attr('onclick', 'skipSoloRegistration()');
  }
}

const namePattern = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/

$('input').focusout(function () {
  console.log('fired focus out') // TODO remove debug logging
  this.reportValidity();
});

// TODO Remove the logs
$('#formName').on('invalid', function (ev) {
  console.log('validityState: ', ev.currentTarget.validity);
  this.setCustomValidity('Please enter a valid name! (Only Alphabets, spaces, hyphens, dots, and apostrophes')
})

$('#formCollege').on('invalid', function (ev) {
  console.log('validityState: ', ev.currentTarget.validity);
  this.setCustomValidity('Please enter a valid name! (Only Aplhabets, spaces, hyphens, dots, and apostrophes')
})

$('#formEmail').on('invalid', function (ev) {
  console.log('validityState: ', ev.currentTarget.validity);
  this.setCustomValidity('Please enter a valid Email address!')
})

$('#formMobile').on('invalid', function (ev) {
  console.log('validityState: ', ev.currentTarget.validity);
  this.setCustomValidity('Please enter a valid, 10 digit, Indian phone number')
})

let formData = {}
let teamEvIndex = -1;

async function toTeamEvents() {
  const name = document.getElementById('formName');
  const email = document.getElementById('formEmail');
  const clg = document.getElementById('formCollege');
  const mobile = document.getElementById('formMobile');

  if (!(name.reportValidity() && email.reportValidity() && clg.reportValidity() && mobile.reportValidity())) {
    return // form in not valid
  }

  // Get all the previous pages values to store in object
  for (let i = 0; i < 4; i++) {
    formData[$('#soloForm')[0][i].name] = $('#soloForm')[0][i].value;
  }
  formData['solo_events'] = await getChosenSoloEventTitleList();

  let teamEvents = await getChosenTeamEventDetailsList();
  formData['team_events'] = (await getChosenTeamEventDetailsList()).map((x) => toCodeName(x.content.name))
  $('#soloSection')[0].style.display = 'none';
  if (teamEvents.length === 0) {
    await toFinalPage();
  } else {
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
          <div>
          <label>College</label>
          <input id="formCollege" type="text" name="college_name" placeholder="e.g. SRM IST Ramapuram"
            value="${formData.college_name}" pattern="^[A-Za-z]+((\s)?(('|-|.)?([A-Za-z])+))*$" required />
          </div>
          <div>
            <label>Leader's Email</label>
            <input id="formEmail" type="text" name="email" value="${formData.email}" placeholder="e.g. user@example.com" autocomplete="email" 
            pattern="^[a-z0-9!#$%&'*+/=?^_\`{|} ~-]+(?: \.[a - z0 - 9!#$ %& '*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" />
          </div >
          <div>
            <label>Leader's Phone Number</label>
            <input id="formMobile" type="text" name="mobile" value="${formData.mobile}" placeholder="e.g. 1234567890" minlength="10" size="10" autocomplete="mobile" pattern="^[0-9]{10}$"/>
          </div>
          <div style="margin-bottom: 2em;">
          <label>Leader's Full Name</label>
          <input id="formName" type="text" name="full_name" value="${formData.full_name}" placeholder="e.g. Joe Mama" autocomplete="name" size="30"
            required pattern="^[A-Za-z]+((\s)?(('|-|.)?([A-Za-z])+))*$" />
          </div>
          <button id='teamFormNext${teamEvIndex}' type="button" class="next-button" onclick="nextTeamSection()">Next</button>
        </form>
      </div> `);

    let lowerBound;
    let upperBound;
    if (teamEvents[teamEvIndex].content.teamSize.includes('-')) {
      // variable team size
      lowerBound = teamEvents[teamEvIndex].content.teamSize.split("-")[0];
      upperBound = teamEvents[teamEvIndex].content.teamSize.split("-")[1];
    } else {
      // fixed team size
      lowerBound = teamEvents[teamEvIndex].content.teamSize;
      upperBound = teamEvents[teamEvIndex].content.teamSize;
    }

    for (let i = 1; i < upperBound; i++) {
      $(`#teamFormNext${teamEvIndex}`).before(`
        <div>
          <label>Member ${i}'s Full Name</label>
          <input id="formMemberName${i}" type="text" name="member${i}_full_name" placeholder="e.g. Joe Mama" size="30"
            pattern="^[A-Za-z]+((\s)?(('|-|.)?([A-Za-z])+))*$" />
        </div >
      `);
    }

    // Set the minimum team size based mandatory fields
    for (let i = 1; i < lowerBound; i++) {
      $(`formMemberName${i}`).attr('reqired', 'required')
    }

    $("html, body").animate(
      { scrollTop: $("#blockQuote").position().top },
      "slow"
    );


  }
}

async function nextTeamSection() {
  let teamEvents = await getChosenTeamEventDetailsList();
  formData[toCodeName(teamEvents[teamEvIndex].content.name)] = {}; // create the subobject for this event's data
  for (let i = 0; i < $(`#teamForm${teamEvIndex}`)[0].length; i++) {
    // ignore the checkbox value, and any other input fields
    if ($(`#teamForm${teamEvIndex}`)[0][i].type == "text") {
      formData[toCodeName(teamEvents[teamEvIndex].content.name)][$(`#teamForm${teamEvIndex}`)[0][i].name] = $(`#teamForm${teamEvIndex}`)[0][i].value;
    }
  }
  $(`#teamSection${teamEvIndex}`)[0].style.display = 'none';

  let lowerBound;
  let upperBound;
  if (teamEvents[teamEvIndex].content.teamSize.includes('-')) {
    // variable team size
    lowerBound = teamEvents[teamEvIndex].content.teamSize.split("-")[0];
    upperBound = teamEvents[teamEvIndex].content.teamSize.split("-")[1];
  } else {
    // fixed team size
    lowerBound = teamEvents[teamEvIndex].content.teamSize;
    upperBound = teamEvents[teamEvIndex].content.teamSize;
  }

  // normalize the member name fields (add empty ones, as form is required to have all 3)
  for (let i = upperBound; i < 4; i++) {
    formData[`member${i}_full_name`] = ""
  }

  // go to next page
  if (teamEvIndex === teamEvents.length - 1) {
    await toFinalPage();
  } else {
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
          <div>
          <label>College</label>
          <input id="formCollege" type="text" name="college_name" placeholder="e.g. SRM IST Ramapuram"
            value="${formData.college_name}" pattern="^[A-Za-z]+((\s)?(('|-|.)?([A-Za-z])+))*$" required />
          </div>
          <div>
            <label>Leader's Email</label>
            <input id="formEmail" type="text" name="email" value="${formData.email}" placeholder="e.g. user@example.com" autocomplete="email" 
            pattern="^[a-z0-9!#$%&'*+/=?^_\`{|} ~-]+(?: \.[a - z0 - 9!#$ %& '*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" />
          </div >
          <div>
            <label>Leader's Phone Number</label>
            <input id="formMobile" type="text" name="mobile" value="${formData.mobile}" placeholder="e.g. 1234567890" minlength="10" size="10" autocomplete="mobile" pattern="^[0-9]{10}$"/>
          </div>
          <div style="margin-bottom: 2em;">
          <label>Leader's Full Name</label>
          <input id="formName" type="text" name="full_name" value="${formData.full_name}" placeholder="e.g. Joe Mama" autocomplete="name" size="30"
            required pattern="^[A-Za-z]+((\s)?(('|-|.)?([A-Za-z])+))*$" />
          </div>
          <button id='teamFormNext${teamEvIndex}' type="button" class="next-button" onclick="nextTeamSection()">Next</button>
        </form>
      </div> `);

    let lowerBound;
    let upperBound;
    if (teamEvents[teamEvIndex].content.teamSize.includes('-')) {
      // variable team size
      lowerBound = teamEvents[teamEvIndex].content.teamSize.split("-")[0];
      upperBound = teamEvents[teamEvIndex].content.teamSize.split("-")[1];
    } else {
      // fixed team size
      lowerBound = teamEvents[teamEvIndex].content.teamSize;
      upperBound = teamEvents[teamEvIndex].content.teamSize;
    }

    for (let i = 1; i < upperBound; i++) {
      $(`#teamFormNext${teamEvIndex}`).before(`
        <div>
          <label>Member ${i}'s Full Name</label>
          <input id="formMemberName${i}" type="text" name="member${i}_full_name" placeholder="e.g. Joe Mama" size="30"
            pattern="^[A-Za-z]+((\s)?(('|-|.)?([A-Za-z])+))*$" />
        </div >
      `);
    }

    // Set the minimum team size based mandatory fields
    for (let i = 1; i < lowerBound; i++) {
      $(`formMemberName${i}`).attr('reqired', 'required')
    }

    $("html, body").animate(
      { scrollTop: $("#blockQuote").position().top },
      "slow"
    );
  }
}

async function toFinalPage() {
  console.log('Final Form Data: ', JSON.stringify(formData))
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
    <button id='submitAndPay' type="button" class="submit-button" onclick="submitAndPay()">Submit & Pay</button>
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

  let chosenTeamEvents = await getChosenTeamEventDetailsList();
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
              👑 ${truncateString(formData[event_code]['leader_full_name'], 15)}
            </div>

          </div>
          <div class="contacts">
            <div class="label">Email</div>
            <div class="contact-detail">${truncateString(formData[event_code]['email'], 18)}</div>
            <div class="label">Mobile</div>
            <div class="contact-detail">${formData[event_code]['mobile']}</div>
          </div>
        </div>
      </div>
    `);

    let lowerBound;
    let upperBound;
    if (teamEvents[teamEvIndex].content.teamSize.includes('-')) {
      // variable team size
      lowerBound = teamEvents[teamEvIndex].content.teamSize.split("-")[0];
      upperBound = teamEvents[teamEvIndex].content.teamSize.split("-")[1];
    } else {
      // fixed team size
      lowerBound = teamEvents[teamEvIndex].content.teamSize;
      upperBound = teamEvents[teamEvIndex].content.teamSize;
    }

    for (let j = 1; j < upperBound; j++) {
      $('#leaderName').after(`
      <div class="name">
        ${truncateString(formData[event_code][`member${j}_full_name`], 15)}
      </div>
      `);
    }
  }
}

function onclickotherCollege() {
  $("#otherOption").addClass('switch-active')
  $("#easwariOption").removeClass('switch-active')
  $("#formCollege").css('display', 'block')
  $(".college-switch").css({
    'height': '3em',
    'font-size': '.8em'
  })
  $("#formCollege").attr('value', '')

}

function onclickEaswari() {
  $("#otherOption").removeClass('switch-active')
  $("#easwariOption").addClass('switch-active')
  $("#formCollege").css('display', 'none')
  $(".college-switch").css({
    'height': 'auto',
    'font-size': '1em'
  })
  $("#formCollege").attr('value', 'Easwari Engineering College')
}

function normalizeFormData(form) {
  // TODO
  console.error('implement normalizeFormData dumbass!')
}

async function submitAndPay() {
  // TODO: remove
  let formData = {
    "full_name": "Nithish Kumar",
    "college_name": "EEC",
    "email": "nithish24x7@gmail.com",
    "mobile": "7338954471",
    "solo_events": [
      "CSS",
      "Shipwreck"
    ],
    "team_events": [
      "paper_presentation",
      "debugging"
    ],
    "paper_presentation": {
      "college_name": "EEC",
      "email": "nithish24x7@gmail.com",
      "mobile": "7338954471",
      "leader_full_name": "Nithish Kumar",
      "member1_full_name": "Rohith C",
      "member2_full_name": "Jayanth",
      "member3_full_name": ""
    },
    "debugging": {
      "college_name": "EEC",
      "email": "nithish24x7@gmail.com",
      "mobile": "7338954471",
      "leader_full_name": "Nithish Kumar",
      "member1_full_name": "Rohith C"
    }
  }

  // Do the submission and get the response
  normalizeFormData(formData);
  let subRes = await axios.post(apiURI + '/submit', formData);

  // Razorpay stuff
  var options = {
    "key": subRes.data.key,
    "amount": subRes.data.amount,
    "currency": "INR",
    "name": "Kratos 2023",
    "description": "Test Transaction",
    "image": "https://kratos23.com/public/images/kratos_logo.png",
    "order_id": subRes.data.order_id,
    "handler": function (res) { paymentSuccess(res, subRes) },

    // These prefill values must cover most people, even when there are no team 
    //  events, it will return undefined, which is fine.
    "prefill": {
      "name": formData.full_name,
      "email": formData.email,
      "contact": formData.mobile
    },
    // "notes": {
    // },
    "theme": {
      "color": "#dc3545" // --kratos-red
      // "backdrop_color":
    }
  };

  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', paymentFailed);
  rzp1.open();
}

async function paymentSuccess(successRes, submissionRes) {
  successRes['form_id'] = submissionRes.data.form_id
  let verifyRes = await axios.post(apiURI + '/submit/verify', successRes)
  // console.log('payment success: ', successRes)

  if (verifyRes.status === 200) {
    window.location.assign('/success')
  }
}

async function paymentFailed(res) {
  console.log('payment failed: ', res)
}


