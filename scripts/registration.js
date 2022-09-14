function getCookie(key) {
    let c = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1];

    if (!c) {
        return "";
    }
    console.log(`getCookie(${key}): ${c}`);
    return atob(c);
}

function setCookie(key, value) {
    // TODO: add domain attribute
    console.log(`setCookie(${key}, ${value}): ${key}=${btoa(value)}; max-age=172800; path='/'; samesite=lax;`)
    document.cookie = `${key}=${btoa(value)}; max-age=172800; path='/'; samesite=lax;`;
}

function appendRegistrationList(event_name) {
    let ckey = 'registration_list';
    let c = getCookie(ckey);
    if (!c.includes(event_name)) {
        setCookie(ckey, `${c} ${event_name}`);
    }
}

function registerClick(i) {
    let card = document.getElementById(`card${i}`);
    let cardName = card.getElementsByClassName('eventName')[0].textContent;
    let eventID = cardName.toLowerCase().replace(' ', '_');
    appendRegistrationList(eventID);
    
    let regButton = document.getElementById(`regButton${i}`);
    regButton.getElementsByClassName('reg-button-label')[0].textContent = "Added to Registration";
    regButton.classList.remove('reg-button-active')
    regButton.classList.add('reg-button-inactive')


    let icon = card.getElementsByClassName('fa-arrow-right-long')[0];
    icon.classList.remove('fa-arrow-right-long')
    icon.classList.add('fa-check');
}