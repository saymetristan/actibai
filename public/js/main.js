AOS.init({
  once: true,
  disable: 'phone',
  duration: 700,
  easing: 'ease-out-cubic',
});

const testimonialEl = document.querySelectorAll('.testimonial-carousel');
if (testimonialEl.length > 0) {
  const testimonial = new Swiper('.testimonial-carousel', {
    slidesPerView: 1,
    watchSlidesProgress: true,
    effect: 'fade',
    pagination: {
      el: '.testimonial-carousel-pagination',
      clickable: true
    },
  });
}

let stripePublicKey;

fetch('/config-stripe').then((result) => {
    return result.json();
}).then((config) => {
    stripePublicKey = config.publicKey;
    stripe = Stripe(stripePublicKey);
}).catch((error) => {
    console.error('Error fetching Stripe config:', error);
});

// Asegúrate de reemplazar 'tu_stripe_public_key' con tu clave pública real de Stripe
const stripe = Stripe('stripePublicKey');
document.getElementById('order-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Desactivar el botón de envío para prevenir envíos múltiples
    document.getElementById('order-submit-btn').disabled = true;

    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               gender: document.getElementById("gender").value,
               weight: document.getElementById("weight").value,
               height: document.getElementById("height").value,
               age: document.getElementById("age").value,
               intensity: document.getElementById("intensity").value,
               goal: document.getElementById("goal").value,
               condition: document.getElementById("condition").value,
               equip: document.getElementById("equip").value,
               email: document.getElementById("email").value,
            })
        });

        if (response.ok) {
            const session = await response.json();

            // Redirige al usuario a Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                // Informa al usuario si hay un error
                alert(result.error.message);
                console.error(result.error.message);
            }
        } else {
            // Manejo de errores si la respuesta no es ok
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        // Manejo de errores en la solicitud fetch
        alert('Could not initiate Stripe Checkout. Please try again.');
        console.error('Error:', error);
    } finally {
        // Reactivar el botón de envío
        document.getElementById('order-submit-btn').disabled = false;
    }
});

