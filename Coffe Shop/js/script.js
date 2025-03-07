//Header//
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((otherLink) => otherLink.classList.remove("active"));

    link.classList.add("active");
  });
});

//Offer caffe//
document.addEventListener("DOMContentLoaded", () => {
  const sliderSection = document.querySelector("#caffes");
  const offerContainer = sliderSection.querySelector(".offer-container");
  const items = Array.from(offerContainer.children);
  const leftArrow = sliderSection.querySelector(".arrow.left");
  const rightArrow = sliderSection.querySelector(".arrow.right");

  
  const cloneFirst = items[0].cloneNode(true);
  const cloneLast = items[items.length - 1].cloneNode(true);
  offerContainer.appendChild(cloneFirst);
  offerContainer.insertBefore(cloneLast, items[0]);

  let currentIndex = 1;
  let isAnimating = false;
  const itemWidth = items[0].offsetWidth + 25; 
  const totalItems = items.length;


  let autoplayInterval = setInterval(slideNext, 2000);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          autoplayInterval = setInterval(slideNext, 2000);
        } else {
          clearInterval(autoplayInterval);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(sliderSection);

  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    updateSlider();
  }

  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    updateSlider();
  }

  function updateSlider() {
    offerContainer.style.transform = `translateX(-${
      currentIndex * itemWidth
    }px)`;


    setTimeout(() => {
      if (currentIndex >= totalItems + 1) {
        offerContainer.style.transition = "none";
        currentIndex = 1;
        offerContainer.style.transform = `translateX(-${
          currentIndex * itemWidth
        }px)`;
      }
      if (currentIndex <= 0) {
        offerContainer.style.transition = "none";
        currentIndex = totalItems;
        offerContainer.style.transform = `translateX(-${
          currentIndex * itemWidth
        }px)`;
      }

      setTimeout(() => {
        offerContainer.style.transition =
          "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        isAnimating = false;
      }, 10);
    }, 600);
  }

  // Event listeners
  leftArrow.addEventListener("click", () => {
    clearInterval(autoplayInterval);
    slidePrev();
    autoplayInterval = setInterval(slideNext, 2000);
  });

  rightArrow.addEventListener("click", () => {
    clearInterval(autoplayInterval);
    slideNext();
    autoplayInterval = setInterval(slideNext, 2000);
  });

  sliderSection.addEventListener("mouseenter", () =>
    clearInterval(autoplayInterval)
  );
  sliderSection.addEventListener(
    "mouseleave",
    () => (autoplayInterval = setInterval(slideNext, 3000))
  );


  offerContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
});

function joinUs() {
  alert("You have successfully joined! Thank you for joining us!");

}

function handleSubscribe() {
  const emailInput = document.getElementById("emailInput");
  const statusMessage = document.getElementById("statusMessage");
  const email = emailInput.value;

  // Validimi i email-it
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailInput.classList.add("input-error");
    statusMessage.textContent = "⚠️ Please enter your email address";
    statusMessage.classList.remove("success");
    statusMessage.classList.add("error");
    statusMessage.style.display = "block";
  } else if (!emailRegex.test(email)) {
    emailInput.classList.add("input-error");
    statusMessage.textContent =
      "❌ Invalid email format. Please check your email";
    statusMessage.classList.remove("success");
    statusMessage.classList.add("error");
    statusMessage.style.display = "block";
  } else {
    // Nëse email-i është valid
    emailInput.classList.remove("input-error");
    emailInput.classList.add("input-success");
    statusMessage.textContent =
      "🎉 Thank you for subscribing! Get ready for exclusive updates!";
    statusMessage.classList.remove("error");
    statusMessage.classList.add("success");
    statusMessage.style.display = "block";

    // Reset formën pas 5 sekondash
    setTimeout(() => {
      emailInput.value = "";
      emailInput.classList.remove("input-success");
      statusMessage.style.display = "none";
    }, 5000);
  }
}
