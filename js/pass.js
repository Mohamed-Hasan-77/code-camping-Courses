function togglePasswordVisibility() {
  var passwordInput = document.getElementById("pwd");
  var passwordVisibility = document.getElementById("passwordVisibility");
  
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordVisibility.classList.remove("bx-hide");
    passwordVisibility.classList.add("bx-show");
  } else {
    passwordInput.type = "password";
    passwordVisibility.classList.remove("bx-show");
    passwordVisibility.classList.add("bx-hide");
  }
}

function toggleConfirmPasswordVisibility() {
  var confirmPasswordInput = document.getElementById("confirmPasswordInput");
  var confirmPasswordVisibility = document.getElementById("confirmPasswordVisibility");

  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    confirmPasswordVisibility.classList.remove("bx-hide");
    confirmPasswordVisibility.classList.add("bx-show");
  } else {
    confirmPasswordInput.type = "password";
    confirmPasswordVisibility.classList.remove("bx-show");
    confirmPasswordVisibility.classList.add("bx-hide");
  }
}

function checkPassword() {
  var passwordInput = document.getElementById("passwordInput");
  var confirmPasswordInput = document.getElementById("confirmPasswordInput");

  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  if (password === confirmPassword) {
    alert("Password confirmed successfully.");
    // You can perform any other actions here after successful confirmation.
  } else {
    alert("Passwords do not match. Please try again.");
    // You may also add additional handling for mismatching passwords.
  }
}