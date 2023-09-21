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

function submitForm() {
  // Obtén los valores de los campos del formulario
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const age = document.getElementById("age").value;
  const intensity = document.getElementById("intensity").value;
  const goal = document.getElementById("goal").value;
  const condition = document.getElementById("condition").value;
  const equip = document.getElementById("equip").value;
  const email = document.getElementById("email").value;

  // Crea un objeto con los datos del formulario
  const formData = {
      gender: gender,
      weight: weight,
      height: height,
      age: age,
      intensity: intensity,
      goal: goal,
      condition: condition,
      equip: equip,
      email: email
  };

  // Realiza una solicitud POST al webhook de Zapier
  fetch('https://hook.us1.make.com/thvhwjhkapd9exkswfopz0pnpyu4swx3', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
      if (response.ok) {
          // Aquí puedes realizar acciones adicionales después de enviar el formulario, como redirigir al usuario o mostrar un mensaje de éxito.
          console.log('Formulario enviado con éxito. Revisa tu correo.');
      } else {
          console.error('Error al enviar el formulario');
      }
  })
  .catch(error => {
      console.error('Error al enviar el formulario', error);
  });
}