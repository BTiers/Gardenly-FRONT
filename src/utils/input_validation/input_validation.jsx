function validateEmail(email) {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (pattern.test(email) || email === '') return true;
  return false;
}

function validatePassword(password) {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (pattern.test(password)) return true;
  return false;
}

function validateUsername(username) {
  const pattern = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/g;

  if (pattern.test(username)) return true;
  return false;
}

function validateLastAndFirstName(name) {
  const pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  if (pattern.test(name) || name === '') return true;
  return false;
}

export { validateEmail, validatePassword, validateUsername, validateLastAndFirstName };
