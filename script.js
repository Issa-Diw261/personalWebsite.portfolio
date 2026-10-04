// ============================
// 1. قائمة الموبايل (Menu Toggle)
// ============================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// ============================
// 2. نموذج الاتصال - Formspree
// ============================
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formMessage.textContent = "Sending...";
    formMessage.style.color = "blue";

    fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    })
      .then(() => {
        formMessage.textContent = "Your message has been sent successfully!";
        formMessage.style.color = "green";
        contactForm.reset();
      })
      .catch(() => {
        formMessage.textContent = "Failed to send. Try again later.";
        formMessage.style.color = "red";
      });
  });
}

// ============================
// 3. النافذة المنبثقة للصور (Modal)
// ============================
const projects = document.querySelectorAll(".project");
const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const closeModal = document.querySelector("#closeModal");

if (!imageModal || !modalImage || !closeModal) {
  console.error("❌ خطأ: أحد عناصر المودال غير موجود في الصفحة!");
} else {
  // فتح الصور عند النقر على أي مشروع في المعرض (بما فيها بطاقة الشهادة)
  projects.forEach((project) => {
    const image = project.querySelector("img");
    if (image) {
      image.addEventListener("click", () => {
        const src = image.getAttribute("src");
        if (!src || src === "" || src === "images/") {
          alert("الصورة غير متوفرة حالياً");
          return;
        }
        modalImage.src = src;
        imageModal.classList.add("active");
      });
    }
  });

  // إغلاق المودال عند الضغط على زر الإغلاق
  closeModal.addEventListener("click", () => {
    imageModal.classList.remove("active");
  });

  // إغلاق المودال عند الضغط خارج الصورة
  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove("active");
    }
  });

  // إغلاق المودال عند الضغط على زر ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      imageModal.classList.remove("active");
    }
  });
}

// ============================
// 4. تأثير الظهور عند التمرير (Scroll Reveal)
// ============================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ============================
// 5. عداد متحرك للأرقام (Animated Counter)
// ============================
const counters = document.querySelectorAll(".stat h2");

const animateCounter = (counter) => {
  const target = parseInt(counter.textContent.replace(/[^0-9]/g, ""));
  if (isNaN(target)) return;

  const duration = 2000;
  const stepTime = 16;
  const totalSteps = duration / stepTime;
  let currentStep = 0;

  const updateCounter = () => {
    currentStep++;
    const progress = currentStep / totalSteps;
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(easedProgress * target);

    const suffix = counter.textContent.replace(/[0-9]/g, "");
    counter.textContent = currentValue + suffix;

    if (currentStep < totalSteps) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + suffix;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (!counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => counterObserver.observe(counter));

// ============================
// 6. زر الرجوع إلى الأعلى (Scroll to Top)
// ============================
const scrollTopBtn = document.createElement("button");
scrollTopBtn.classList.add("scroll-top");
scrollTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
