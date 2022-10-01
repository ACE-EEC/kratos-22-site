let _eventCount;
async function fetchEventCount() {
  if (_eventCount) {
    return _eventCount
  }

  let res = await fetch('https://storage.googleapis.com/kratos23.com/events/count');
  if (res.ok) {
    _eventCount = Number((await res.text()));
    return _eventCount;
  } else {
    console.error("Error fetching event count. ", res);
  }
}

let _eventList = [];
async function fetchEventList() {
  if (_eventList.length !== 0)
    return _eventList;

  let promises = [];
  let count = await fetchEventCount();
  for (let i = 0; i < count; i++) {
    promises.push(axios.get(`https://storage.googleapis.com/kratos23.com/events/event${i}.json`));
  }

  _eventList = (await Promise.all(promises)).map((x) => x.data)
  return _eventList;
}

$('body').on('ready', loadEventCards());

async function loadEventCards() {
  // Only do card loading in the main page. 
  // This module is linked in registration page too, for the fetchEventList() and fetchEventCount fns()
  if (document.location.pathname !== "/")
    return;

  let count = await fetchEventCount();
  let events = await fetchEventList();
  // Load all the events
  for (let i = 0; i < count; i++) {
    let event = events[i];
    let registerLogo = event.content.onlineRegistration ? 'fa-solid fa-arrow-right-long' : 'fa-solid fa-building-columns'
    let regHandler = event.content.onlineRegistration ? `registerClick(${i})` : ''

    let fee = event.content.teamBased.toLowerCase() !== 'solo' && (event.content.name !== "Paper Presentation" && event.content.name !== "Murder Mystery" && event.content.name !== "Code Play")
      ? '' + (event.content.fee / (event.content.teamSize.split('-')[1] ? event.content.teamSize.split('-')[1] : event.content.teamSize)).toPrecision(2) + ' Per Head'
      : event.content.fee + ' Per Team'
    let regButtonLabel = event.content.onlineRegistration ? "Add to registration" : "On spot Registraion"
    let regButton = event.type == "offline" ?
      `<div id="regButton${i}" class="reg-button reg-button-active" onclick="${regHandler}" >
        <div class="reg-button-label">${regButtonLabel}</div>
        <i class="${registerLogo}"></i>
      </div>`
      :
      `<div id="regButton${i}" class="reg-button reg-button-active" onclick="location.href='${event.gform}'" >
        <div class="reg-button-label">Fill out Google Form</div>
        <i class="${registerLogo}"></i>
      </div>`


    $(`#${event.category}Page`).find(`#${event.type}`)[0].innerHTML +=
      `<div class="card "  id="card${i}">
        <div class="cardContent" >
          <div class="cardImage" id="cardImage${i}" >
            <h1 class="eventName">${event.content.name}</h1>
            <div class="icon">
              <img src="${event.content.image}"/>
            </div>
            <i id="plus${i}" onclick="setTimeout(function(){triggerDisplay(${i})}, 300); $('.transform').toggleClass('transform-active-another');" class="plus transform fa fa-plus"></i>
            <div class="details" id="details${i}">
              <div class="tag">₹${fee}</div>
              <div class="tag">${event.content.teamBased}</div>
              <div class="tag">${event.content.teamSize.length <= 2 ? event.content.teamSize + "v" + event.content.teamSize : event.content.teamSize + " Members"}</div>
            </div>
            ${regButton}
            <div class="vl" id="vl${i}"></div>
          </div>
          <div class="bText" id="bText${i}">
            <p class="content" id="content${i}">${event.content.description}</p>
            <p class="contact">👤 ${event.content.contact}</p>
          </div>
          <div class="cardRules" id="cardRules${i}">
            <h3>Rules</h3>
            <scroller>
              ${event.content.rules.map((x) => `<p>- ${x}</p>`).reduce((p, c, a) => p + c)}
            </scroller>
          </div>
        </div>
        <i id="upArrow${i}" onclick="reset(${i})" class="upArrow fa fa-caret-up fa-2x" style="display: none;"></i>
      </div>`;

    if (isEventCodeAdded(event.content.name.toLowerCase().replaceAll("'", "").replaceAll('-', ' ').replaceAll(' ', '_'))) {
      let card = document.getElementById(`card${i}`);
      let regButton = document.getElementById(`regButton${i}`);
      regButton.getElementsByClassName('reg-button-label')[0].textContent = "Added to Registration";
      regButton.classList.remove('reg-button-active')
      regButton.classList.add('reg-button-inactive')

      let icon = card.getElementsByClassName('fa-arrow-right-long')[0];
      icon.classList.remove('fa-arrow-right-long')
      icon.classList.add('fa-check');
    }
  }
}
