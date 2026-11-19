const form = document.querySelector('#registration-form');
const phone = document.querySelector('#phone');
const nameInput = document.querySelector('#name');
const status = document.querySelector('#form-status');

for (const field of [nameInput, phone]) {
  field.addEventListener('input', () => {
    field.setCustomValidity('');
    status.hidden = true;
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (nameInput.value.trim().length < 2) {
    nameInput.setCustomValidity('Введите имя');
    nameInput.reportValidity();
    return;
  }

  const phoneNumber = phone.value.trim();
  const digits = phoneNumber.replace(/\D/g, '');
  if (!/^\+?[\d\s()-]+$/.test(phoneNumber) || digits.length < 10 || digits.length > 15) {
    phone.setCustomValidity('Введите номер телефона полностью, например +7 700 000 00 00');
    phone.reportValidity();
    return;
  }

  form.reset();
  status.textContent = 'Форма проверена. После запуска здесь появится переход в Telegram';
  status.hidden = false;
  status.focus();
});
