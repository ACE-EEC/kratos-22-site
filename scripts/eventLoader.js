async function fetchEventCount() {
  let res = await fetch('https://storage.googleapis.com/kratos23.com/events/count');
  if (res.ok) {
    return Number((await res.text()));
  } else {
    console.error("Error fetching event count. ", res);
  }
}

async function fetchEventList() {
  let events = [];
  let count = await fetchEventCount();
  for (let i = 0; i < count; i++) {
    let res = await fetch(`https://storage.googleapis.com/kratos23.com/events/event${i}.json`);
    if (res.ok) {
      events.push(await res.json());
    } else {
      console.error("Error fetching event.", res);
    }
  }
  return events;
}

$('body').on('ready', loadEventCards());

async function loadEventCards() {
  let count = await fetchEventCount();
  let events = await fetchEventList();
  // Load all the events
  for (let i = 0; i < count; i++) {
    let event = events[i];
    let registerLogo = event.content.onlineRegistration ? 'fa-solid fa-arrow-right-long' : 'fa-solid fa-building-columns'
    let regHandler = event.content.onlineRegistration ? `registerClick(${i})` : ''
    let regButtonLabel = event.content.onlineRegistration ? "Add to registration" : "On spot Registraion"


    $(`#${event.category}Page`).find(`#${event.type}`)[0].innerHTML +=
      `<div class="card "  id="card${i}" >
        <div class="cardContent" >
          <div class="cardImage" id="cardImage${i}" >
            <h1 class="eventName">${event.content.name}</h1>
            <div class="icon">
              <img src="${event.content.image}"/>
            </div>
            <i id="plus${i}" onclick="setTimeout(function(){triggerDisplay(${i})}, 500); $('.transform').toggleClass('transform-active-another');" class="plus transform fa fa-plus"></i>
            <div class="details" id="details${i}">
              <div class="tag">₹${event.content.fee}</div>
              <div class="tag">${event.content.teamBased}</div>
              <div class="tag">${event.content.teamSize.length <= 2 ? event.content.teamSize + "v" + event.content.teamSize : event.content.teamSize}</div>
            </div>
            <div id="regButton${i}" class="reg-button reg-button-active" onclick="${regHandler}" >
              <div class="reg-button-label">${regButtonLabel}</div>
                <i class="${registerLogo}"></i>
              </div>
            <div class="vl" id="vl${i}"></div>
          </div>
          <div class="bText" id="bText${i}">
            <p class="content" id="content${i}">${event.content.description}</p>
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
