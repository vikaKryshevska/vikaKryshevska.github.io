const emailField = document.querySelector('.form-style input[name="email"]');
const hideEmailBtn = document.querySelector('.form-style input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
  const email = emailField.value; // Отримуємо значення введеної електронної пошти
  
  // Перевіряємо, чи введено значення електронної пошти
  if (email) {
    emailField.style.display = 'none';
    hideEmailBtn.style.display = 'none';
    // Виводимо повідомлення з підтвердженням
  alert(`Вашу пошту (${email}) успішно записано. Дякуємо!`);
  } else {
    alert("Введіть пошту!");
  }
});