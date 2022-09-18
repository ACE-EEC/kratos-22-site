function getCookie(key) {
    let c = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1];

    if (!c) {
        return "";
    }
    return atob(c);
}

function setCookie(key, value) {
    // TODO: add domain attribute
    document.cookie = `${key}=${btoa(value)}; max-age=172800; path='/'; samesite=lax;`;
}

function getRegistrationList() {
    return getCookie('registration_list').split(' ');
}

function appendRegistrationList(eventTitle) {
    let ckey = 'registration_list';
    let c = getCookie(ckey);
    if (c == "") {
        setCookie(ckey, eventTitle);
        return;
    }
    if (!c.includes(eventTitle)) {
        setCookie(ckey, `${c} ${eventTitle}`);
    }
}

function removeRegistrationListItem(eventCode) {
    let reg = getCookie('registration_list');
    reg = reg.replace(eventCode, '').replace('  ', ' ').trim()
    console.log('reg = ', reg)
    setCookie('registration_list', reg)
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
