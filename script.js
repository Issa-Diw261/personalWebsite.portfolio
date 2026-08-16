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

// التحقق من وجود العناصر
if (!imageModal || !modalImage || !closeModal) {
  console.error("❌ خطأ: أحد عناصر المودال غير موجود في الصفحة!");
  console.log("imageModal:", imageModal);
  console.log("modalImage:", modalImage);
  console.log("closeModal:", closeModal);
} else {
  // إضافة حدث الضغط على الصور
  projects.forEach((project) => {
    const image = project.querySelector("img");
    if (image) {
      image.addEventListener("click", () => {
        const src = image.getAttribute("src");
        if (!src || src === "") {
          alert("هذه الصورة فارغة، يرجى إضافة صورة حقيقية");
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

  // إغلاق المودال عند الضغط على الخلفية
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

// اختيار جميع العناصر التي تحمل كلاس .reveal
const revealElements = document.querySelectorAll(".reveal");

// إنشاء مراقب (Intersection Observer)
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // إضافة كلاس active عندما يظهر العنصر في الشاشة
        entry.target.classList.add("active");
        // إيقاف مراقبة هذا العنصر بعد ظهوره (مرة واحدة)
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // يظهر عندما يظهر 15% من العنصر
    rootMargin: "0px 0px -50px 0px", // يظهر قبل الوصول للعنصر بقليل
  },
);

// تطبيق المراقبة على جميع العناصر
revealElements.forEach((el) => revealObserver.observe(el));

// ============================
// 5. عداد متحرك للأرقام (Animated Counter)
// ============================

// اختيار جميع أرقام الإحصائيات
const counters = document.querySelectorAll(".stat h2");

// دالة لتحريك العداد
const animateCounter = (counter) => {
  const target = parseInt(counter.textContent.replace(/[^0-9]/g, ""));
  if (isNaN(target)) return;

  const duration = 2000; // مدة الحركة بالملي ثانية
  const stepTime = 16; // تحديث كل 16ms (60fps)
  const totalSteps = duration / stepTime;
  let currentStep = 0;

  const updateCounter = () => {
    currentStep++;
    const progress = currentStep / totalSteps;
    // استخدام easing لجعل الحركة ناعمة
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(easedProgress * target);

    // إذا كان الرقم يحتوي على + أو % نحافظ عليه
    const suffix = counter.textContent.replace(/[0-9]/g, "");
    counter.textContent = currentValue + suffix;

    if (currentStep < totalSteps) {
      requestAnimationFrame(updateCounter);
    } else {
      // التأكد من وصوله للقيمة النهائية
      counter.textContent = target + suffix;
    }
  };

  updateCounter();
};

// إنشاء مراقب للعدادات
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        // التحقق من أن العداد لم يبدأ بعد
        if (!counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }
      }
    });
  },
  {
    threshold: 0.5, // يبدأ عندما يظهر 50% من العنصر
  },
);

// تطبيق المراقبة على جميع العدادات
counters.forEach((counter) => counterObserver.observe(counter));
// ============================
// 6. زر الرجوع إلى الأعلى (Scroll to Top)
// ============================

// إنشاء الزر ديناميكياً
const scrollTopBtn = document.createElement("button");
scrollTopBtn.classList.add("scroll-top");
scrollTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
document.body.appendChild(scrollTopBtn);

// إظهار/إخفاء الزر حسب التمرير
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// العودة إلى الأعلى عند الضغط
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
