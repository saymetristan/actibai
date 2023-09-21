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
  const orderBtn = document.getElementById("order-submit-btn");
  orderBtn.disabled = true;
  orderBtn.innerText = "Loading...";

  const form = document.getElementById("order-form");
  const formData = new FormData(form);

  if (!formData.has("vegan")){
    formData.append("vegan", "false");
  }
  if (!formData.has("vegetarian")){
    formData.append("vegetarian", "false");
  }
  if (!formData.has("sugarFree")){
    formData.append("sugarFree", "false");
  }
  if (!formData.has("oilFree")){
    formData.append("oilFree", "false");
  }

  // const output = document.getElementById("output");
  //
  // for (const [key, value] of formData) {
  //   output.textContent += `${key}: ${value}\n`;
  // }

		let payload = {
        gender: formData.get('gender'),
        age: formData.get('age'),
        weight: formData.get('weight'),
        goal: formData.get('goal'),
        equip: formData.get('equip'),
        intensity: formData.get('intensity'),
        vegetarian: formData.get('vegetarian'),
        vegan: formData.get('vegan'),
        sugarFree: formData.get('sugarFree'),
        oilFree: formData.get('oilFree'),
        email: formData.get('email')
      }
										
  let url = 'https://app.mikeai.co/api/checkout-session';

  fetch(url, {
    method:'POST',
    body: JSON.stringify(payload) 
  })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      window.location.replace(json.url)
    }).catch(err => {
    alert('There has been an error, please contact us at nkrvivek@gmail.com');
    console.log(err);
  })
}
