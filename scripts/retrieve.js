let apiOrigin = 'https://api.kratos23.com'
// let apiOrigin = 'http://localhost:3555'

// Not using window.sessionStorage, since it survives reloads
let _forms = null;

$('body').ready(async function () {
  let res = await axios.get(apiOrigin + '/retrieve');
  _forms = res.data;
  $('paidOnly').attr('checked', false)
  $('#count')[0].textContent = _forms.length
  renderForms(_forms)
});

// Note: doesn't clear the parent before rendering
function renderForms(forms) {
  for (let i = 0; i < forms.length; i++) {
    let tl = forms[i].team_events.length
    let teamEvents = forms[i].team_events.map((x, j, a) => `
      ${j == 0
        ? `<td>${x}</td> 
           <td class='col-darker'>${forms[i][x].full_name}, ${forms[i][x].member1_full_name || '_'}, ${forms[i][x].member2_full_name || '_'}, ${forms[i][x].member3_full_name || '_'}</td>`
        : `<tr>
            <td>${x}</td>
            <td class='col-darker'>${forms[i][x].full_name}, ${forms[i][x].member1_full_name || '_'}, ${forms[i][x].member2_full_name || '_'}, ${forms[i][x].member3_full_name || '_'}</td>
          </tr>`}
    `)

    if (!tl) {
      teamEvents = `<td></td><td class='col-darker'></td>`
    }

    $('#tbody').append(`
      <tr rowspan="${tl || 1}">
        <td rowspan="${tl || 1}">${forms[i].full_name}</td>
        <td rowspan="${tl || 1}" class='col-darker'>${forms[i].college_name}</td>
        <td rowspan="${tl || 1}">${forms[i].email}</td>
        <td rowspan="${tl || 1}" class='col-darker'>${forms[i].mobile}</td>
        <td rowspan="${tl || 1}">${forms[i].screenshot
        ? `<a href="${forms[i].screenshot}"target="_blank" rel="noopener noreferrer">Link</a></td>`
        : 'none'
      }
        <td rowspan="${tl || 1}" class='col-darker'>${forms[i].solo_events.length == 0
        ? ''
        : forms[i].solo_events
      }</td>
        
        ${teamEvents}
      </tr>
    `)
  }
}

function updateFilter() {
  $('#tbody').empty()
  let paid = $('#paidOnly')[0]
  if (paid.checked) {
    let forms = _forms.filter((x) => x.hasOwnProperty('screenshot'))
    renderForms(forms)
    $('#count')[0].textContent = forms.length
  } else {
    renderForms(_forms)
    $('#count')[0].textContent = _forms.length
  }
}
