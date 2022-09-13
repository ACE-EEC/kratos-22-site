$('document').ready(async function () {
  // Get event count
  let count;
  let res = await fetch('public/events/count');
  if (res.ok) {
    count = await res.text();
  } else {
    console.error("Error fetching event count. ", res);
  }

  // Load all the events
  for (let i = 0; i < count; i++) {
    let res = await fetch(`public/events/event${i}.json`);
    if (res.ok) {
      const event = await res.json();

      // innerHTML lol
      $(`#${event.category}Page`).find(`#${event.type}`)[0].innerHTML +=
        `<div class="card" id="card${i}">
        <div class="cardContent">
          <div class="cardImage" id="cardImage${i}">
            <h1 class="eventName">${event.content.name}</h1>
            <div class="icon"><img src="${event.content.image}"></div>
            <i id="plus${i}" onclick="setTimeout(function(){triggerDisplay(${i})}, 500); $('.transform').toggleClass('transform-active-another');" class="plus transform fa fa-plus"></i>
            <div class="details" id="details${i}">
              <div class="tag">₹${event.content.fee}</div>
              <div class="tag">${event.content.teamBased ? "Team" : "Solo"}</div>
              <div class="tag">${event.content.teamSize} v ${event.content.teamSize}</div>
            </div>
            <div class="vl" id="vl${i}"></div>
          </div>
          <div class="bText" id="bText${i}">
            <p class="content" id="content${i}">${event.content.description}</p>
          </div>
          <div class="cardRules" id="cardRules${i}">
            <h3>Rules</h3>
            <scroller>
              ${event.content.rules.map((x) => `<p>- ${x}</p>`).reduce((p, c, a) =>  p + c )}
            </scroller>
          </div>
        </div>
        <i id="upArrow${i}" onclick="reset(${i})" class="upArrow fa fa-caret-up fa-2x" style="display: none;"></i>
      </div>`;
    } else {
      console.error(`Error fetching event${i}.json`);
    }
  }
});
