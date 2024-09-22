let Id = localStorage.getItem('sessionId')

const statusOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        stripeSecretKey: 'sk_test_51Pee8D2KbQAq57kGAnP7cKv0gNIBjpRhcNTuZ9MKXdrAm5Js2ERVfaZNhMNHcvr5dtC3SEc06qxCUj0nLOPWo3N500kaI5dx8z',
        sessionId: Id
    })
}


const checkPaymentStatus = () => {
    return fetch('https://techthoth-stripe-server.onrender.com/check-payment-status', statusOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        })
        .then(data => {
            console.log(data.payment_status); // Log the full response data to inspect it
            return data.payment_status; // Return the payment status so it can be used elsewhere
        })
        .catch(err => {
            console.error('An Error Occurred:', err.message);
            return Promise.reject(err.message); // Reject the promise with the error message
        });
}

module.exports = checkPaymentStatus