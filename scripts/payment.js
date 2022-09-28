const canMakePaymentCache = 'canMakePaymentCache';
const paymentUnsupportedMsg = 'Payments using GPay is not supported in this browser. Please use Chrome/Safari.';

/**
 * Check whether can make payment with Google Pay or not. It will check session storage
 * cache first and use the cache directly if it exists. Otherwise, it will call
 * canMakePayment method from PaymentRequest object and return the result, the
 * result will also be stored in the session storage cache for future usage.
 */
async function checkCanMakePayment(request) {
  // Check canMakePayment cache, use cache result directly if it exists.
  if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
    return Promise.resolve(JSON.parse(sessionStorage[canMakePaymentCache]));
  }

  // If canMakePayment() isn't available, default to assume the method is
  // supported.
  var canMakePaymentPromise = Promise.resolve(true);

  if (request.canMakePayment) {
    canMakePaymentPromise = request.canMakePayment();
  }

  try {
    const result_1 = await canMakePaymentPromise;
    // Store the result in cache for future usage.
    sessionStorage[canMakePaymentCache] = result_1;
    return result_1;
  } catch (err) {
    console.log('Error calling canMakePayment: ' + err);
  }
}

async function submitAndPay() {
  // Do the submission and get the response
  $('#submitAndPay').attr('disabled', 'disabled')
  if (!window.PaymentRequest) {
    alert(paymentUnsupportedMsg);
    return;
  }
  setTimeout(() => { $('#submitAndPay').attr('disabled', 'disabled') }, 5000);
  let subRes = await axios.post(apiURI + '/submit', formData);
  const supportedInstruments = [
    {
      supportedMethods: ['https://tez.google.com/pay'],
      data: {
        pa: 'priyadharshini003@federal',
        pn: 'Kratos 2023',
        tr: subRes.form_id,  // form_id will be unique on each submit (non-idempotent), so it can be used as is.
        url: 'https://kratos23.com/form?id=12345', // TODO
        mc: '8220',
        // tn: 'Purchase in Merchant',
        // gstBrkUp: 'GST:16.90|CGST:08.45|SGST:08.45', // GST value break up
        // invoiceNo: 'BillRef123', // your invoice number
        invoiceDate: new Date().toISOString(), // your invoice date and time
        // gstIn: '29ABCDE1234F2Z5', // your GSTIN
      },
    }
  ];

  const details = {
    total: {
      label: 'Total',
      amount: {
        currency: 'INR',
        value: subRes.amount,
      },
    },
    // displayItems: [{
    //   label: 'Original Amount',
    //   amount: {
    //     currency: 'INR',
    //     value: subRes.amount,
    //   },
    // }],
  };

  let request = null;
  try {
    request = new PaymentRequest(supportedInstruments, details);
  } catch (e) {
    console.log('Payment Request Error: ' + e.message);
    return;
  }
  if (!request) {
    alert(paymentUnsupportedMsg);
    // TODO: Send request to invalidate form
    return;
  }

  let canPay = await checkCanMakePayment(request);
  showPaymentUI(request, canPay);

}

function showPaymentUI(request, canMakePayment) {
  if (!canMakePayment) {
    alert(paymentUnsupportedMsg);
    return;
  }

  // Set payment timeout.
  let paymentTimeout = window.setTimeout(function () {
    window.clearTimeout(paymentTimeout);
    request.abort()
      .then(function () {
        console.log('Payment timed out after 20 minutes.'); // TODO
      })
      .catch(function () {
        console.log('Unable to abort, user is in the process of paying.'); // TODO
      });
  }, 20 * 60 * 1000); /* 20 minutes */

  request.show()
    .then(function (instrument) {

      window.clearTimeout(paymentTimeout);
      processResponse(instrument); // Handle response from browser.
    })
    .catch(function (err) {
      console.log(err);
    });
}

function processResponse(instrument) {
  var instrumentString = JSON.stringify(instrument);
  console.log(instrumentString);

  fetch('http://localhost:3555/submit/verify', { // TODO: Change URL to https://api.kratos23.com/pay
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: instrumentString,
  })
    .then(function (buyResult) {
      if (buyResult.ok) {
        return buyResult.json();
      }
      console.log('Error sending instrument to server.');
    })
    .then(function (buyResultJson) {
      completePayment(instrument, buyResultJson.status, buyResultJson.message);

    })
    .catch(function (err) {
      console.log('Unable to process payment. ' + err);
    });
}

function completePayment(instrument, result, msg) {
  instrument.complete(result)
    .then(function () {
      console.log('Payment succeeds.');
      console.log(msg);
    })
    .catch(function (err) {
      console.log(err);
    });
}
