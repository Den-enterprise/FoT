// =========================
// SCROLL REVEAL ANIMATION
// =========================

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.innerHTML = "Submitting...";
  submitBtn.disabled = true;

  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  try {
      const captcha = grecaptcha.getResponse();

      if (!captcha) {

        alert("Please complete the CAPTCHA.");

        submitBtn.innerHTML =
          "Submit Application";

        submitBtn.disabled = false;

        return;
      }

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyyhX0Lh8ga8Xbd4oO-trwNTAEDZHms7Bm2pzarWcjDg7auNwOQb_4rGKkOKdKrMu3JSw/exec",
      {
        method: "POST",

        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (result.result === "success") {

      // Hide Form
      form.style.display = "none";

      // Show Success Message
      document.getElementById("successMessage")
        .style.display = "flex";

    } else {

      alert("Submission failed.");

      submitBtn.innerHTML = "Submit Application";
      submitBtn.disabled = false;
    }

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

    submitBtn.innerHTML = "Submit Application";
    submitBtn.disabled = false;
  }

});


// =========================
// SCROLL REVEAL
// =========================

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

      }

    });

  },

  {
    threshold: 0.15
  }

);

reveals.forEach((el) => {
  observer.observe(el);
});