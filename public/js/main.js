AOS.init({
  once: true,
  disable: 'phone',
  duration: 700,
  easing: 'ease-out-cubic',
});

const stripe = Stripe('pk_test_51OMgDnApwArWThSdWZlYPFINGQLiuVXNY1Qe5YMOvrz8xXCaq9GFCPRSwGTAOofF4b77zAQM5BoK1dI7N1qgZHXY00fUT9TSH4');

function validateForm(event) {
    event.preventDefault();
    // Obtén los valores del formulario
    const form = document.getElementById('order-form');
    const gender = form['gender'].value;
    const weight = form['weight'].value;
    const height = form['height'].value;
    const age = form['age'].value;
    const intensity = form['intensity'].value;
    const goal = form['goal'].value;
    const condition = form['condition'].value;
    const equip = form['equip'].value;
    const email = form['email'].value;
  
    // Validación simple de ejemplo (puedes expandirla según sea necesario)
    if (!form.checkValidity()) {
        // Si no es válido, mostrar los mensajes de error predeterminados
        form.reportValidity();
        return;
      }
  
    // Si el formulario es válido, procesa el pago
    createCheckoutSession(gender, weight, height, age, intensity, goal, condition, equip, email);
  }
  
  function createCheckoutSession(gender, weight, height, age, intensity, goal, condition, equip, email) {
    fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Incluye los datos del formulario en la solicitud
      body: JSON.stringify({
        gender,
        weight,
        height,
        age,
        intensity,
        goal,
        condition,
        equip,
        email
      })
    })
    .then(response => response.json())
    
    .then(session => {
      localStorage.setItem('stripeSessionId', session.id);
      return stripe.redirectToCheckout({ sessionId: session.id });
    })

    .then(result => {
      if (result.error) {
        alert(result.error.message);
      }
    })
    
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    const retryButton = document.getElementById('retry-button');
    const checkoutButton = document.getElementById('checkout-button'); // Asegúrate de que este ID exista en tu formulario

    if (checkoutButton) {
        checkoutButton.addEventListener('click', validateForm);
    }

    if (retryButton) {
        retryButton.addEventListener('click', () => {
            // Recupera el ID de la sesión de la almacenamiento local
            const sessionId = localStorage.getItem('stripeSessionId');
            if (sessionId) {
                stripe.redirectToCheckout({ sessionId: sessionId })
                .then(result => {
                    if (result.error) {
                        alert(result.error.message);
                    }
                });
            } else {
                // Manejar el caso en que no hay una sesión guardada
                console.log("No hay sesión guardada.");
            }
        });
    }
});


