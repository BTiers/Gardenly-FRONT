function validateEmail(email, t) {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (pattern.test(email) || email === '') return { active: false, reason: '' };

  return { active: true, reason: t('bad_email') };
}

function validatePassword(password, t) {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (pattern.test(password) || password === '')
    return { active: false, reason: '' };

  return { active: true, reason: t('bad_password') };
}

function validateConfirmPassword(password, password_repeat, t) {
  if (password === password_repeat || password_repeat === '')
    return { active: false, reason: '' };

  return { active: true, reason: t('bad_valid_psw') };
}

function validateUsername(username, t) {
  const pattern = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/g;
  if (pattern.test(username) || username === '')
    return { active: false, reason: '' };

  return { active: true, reason: t('bad_usr') };
}

function validateFirstName(name, t) {
  const pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (pattern.test(name) || name === '') return { active: false, reason: '' };

  return { active: true, reason: t('bad_fname') };
}

function validateLastName(name, t) {
  const pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (pattern.test(name) || name === '') return { active: false, reason: '' };

  return { active: true, reason: t('bad_lname') };
}

export function validateRegister(
  t,
  email,
  password,
  password_repeat,
  username,
  firstname,
  lastname
) {
  return {
    username: validateUsername(username, t),
    firstname: validateFirstName(firstname, t),
    lastname: validateLastName(lastname, t),
    email: validateEmail(email, t),
    password: validatePassword(password, t),
    passwordRepeat: validateConfirmPassword(password, password_repeat, t)
  };
}
