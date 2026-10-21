/**
 * Contact Form Handler
 * Submits form data via FormSubmit AJAX endpoint and handles UI states.
 */

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const success = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields before sending.');
      return;
    }

    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    if (formError) formError.classList.remove('visible');

    try {
      const response = await fetch('https://formsubmit.co/ajax/reloskielhedrix@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Portfolio Message from ${name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok && data.success !== 'false') {
        form.style.display = 'none';
        if (success) success.classList.add('visible');
      } else {
        throw new Error('Form submission was not accepted');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      const mailtoHref = `mailto:reloskielhedrix@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
      const fallbackLink = document.getElementById('fallback-email-link');
      if (fallbackLink) fallbackLink.href = mailtoHref;
      if (formError) formError.classList.add('visible');

      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
