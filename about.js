<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.1/gsap.min.js"></script>


  let colors = ["#7a847a", "#212421", "#273f43"];
  let currentColorIndex = 0;

  function changeBackground() {
    currentColorIndex = (currentColorIndex + 1) % colors.length; // Cycle through colors
    const photo = document.getElementById('photo');
    photo.style.backgroundColor = colors[currentColorIndex];
  }

  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  const overlay = document.getElementById('overlay');

  let currentSection = 1; // Track which section is currently visible (1 or 2)

  // Function to trigger animation for both arrows
  function triggerAnimation() {
    // Show the overlay animation
    overlay.classList.add('active');

    // Animate arrow change (rotate and shrink)
    gsap.to(rightArrow.querySelector('svg'), {
      duration: 0.5,
      rotation: 180,
      ease: "power2.inOut"
    });
    gsap.to(leftArrow.querySelector('svg'), {
      duration: 0.5,
      rotation: -180,
      ease: "power2.inOut"
    });

    // After overlay animation, start switching sections
    setTimeout(() => {
      if (currentSection === 1) {
        // Slide out the first section and slide in the second section
        gsap.to(section1, {
          duration: 1,
          top: '-100vh', // Move section1 up off-screen
          ease: "power2.inOut"
        });
        gsap.to(section2, {
          duration: 1,
          top: 0, // Move section2 into view
          ease: "power2.inOut"
        });
        currentSection = 2; // Now section 2 is visible
      } else {
        // Slide out the second section and slide in the first section
        gsap.to(section2, {
          duration: 1,
          top: '130vh', // Move section2 down off-screen
          ease: "power2.inOut"
        });
        gsap.to(section1, {
          duration: 1,
          top: 0, // Move section1 into view
          ease: "power2.inOut"
        });
        currentSection = 1; // Now section 1 is visible
      }

      // Fade out the overlay
      gsap.to(overlay, {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut"
      });
    }, 500); // Wait until the overlay is fully visible before switching sections

    // Remove active class from overlay after animation
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 1500); // After overlay fades out
  }

  // Trigger the animation when clicking either arrow
  rightArrow.addEventListener('click', triggerAnimation);
  leftArrow.addEventListener('click', triggerAnimation);
