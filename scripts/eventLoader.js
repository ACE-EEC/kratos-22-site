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
        `<div class="card">
        <div class="cardContent">
          <div class="cardImage">
            <h1 class="eventName">${event.content.name}</h1>
            <div class="icon"><img src="${event.content.image}"></div>
            <i id="plus" onclick="setTimeout(function(){triggerDisplay(${i})}, 500); $('.transform').toggleClass('transform-active-another');" class="plus transform fa fa-plus"></i>
            <div class="details">
              <div class="tag">₹${event.content.fee}</div>
              <div class="tag">${event.content.teamBased ? "Team" : "Solo"}</div>
              <div class="tag">${event.content.teamSize} v ${event.content.teamSize}</div>
            </div>
            <div class="vl"></div>
          </div>
          <div class="bText">
            <p class="content">${event.content.description}</p>
          </div>
          <div class="cardRules">
            <h3>Rules</h3>
            <scroller>
              <section>
                <p>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>- sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed libero enim sed faucibus.
                  Gravida arcu ac tortor dignissim convallis aenean et.</p>
                <p>- Feugiat in ante metus dictum at tempor commodo ullamcorper a. Nisi est sit amet facilisis magna.
                </p>
                <p>- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et
                  dolore magna aliqua. Sed libero enim sed faucibus. Gravida arcu ac tortor dignissim convallis aenean
                  et.
                </p>
                <p>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </section>
              <section>
                <p>- sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed libero enim sed faucibus.
                  Gravida arcu ac tortor dignissim convallis aenean et.</p>
                <p>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>- sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed libero enim sed faucibus.
                  Gravida arcu ac tortor dignissim convallis aenean et.</p>
                <p>- Feugiat in ante metus dictum at tempor commodo ullamcorper a. Nisi est sit amet facilisis magna.
                </p>
                <p>- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et
                  dolore magna aliqua. Sed libero enim sed faucibus. Gravida arcu ac tortor dignissim convallis aenean
                  et.
                </p>
              </section>
            </scroller>
          </div>
        </div>
        <i id="upArrow" onclick="reset(${i})" class="upArrow fa fa-caret-up fa-2x"></i>
      </div>`;
    } else {
      console.error(`Error fetching event${i}.json`);
    }
  }
});
