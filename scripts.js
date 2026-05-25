// =========================
// SCROLL REVEAL ANIMATION
// =========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

  reveals.forEach((element) => {

    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }

  });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  try {

    const response = await fetch(
      "https://script.google.com/a/macros/skyline.design/s/AKfycby6jxdHNLqAQZsfWLYsC29JZTxlwjsIihg8NrSpHFrcEL8RgsUdgzqqYC_4uFVuKGpo9Q/exec",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (result.result === "success") {

      document.getElementById("successMessage")
        .style.display = "block";

      form.reset();
    }

  } catch (error) {

    alert("Something went wrong.");

    console.error(error);
  }

});