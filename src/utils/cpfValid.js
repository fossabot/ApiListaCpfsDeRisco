module.exports = (cpf) => {

  var numbers, digits, sum, iterator, result, equalDigits;
  equalDigits = 1;

  if (cpf.length < 11)
    return false;

  for (iterator = 0; iterator < cpf.length - 1; iterator++) {

    if (cpf.charAt(iterator) != cpf.charAt(iterator + 1)) {
      equalDigits = 0;
      break;
    }

  }

  if (!equalDigits) {

    numbers = cpf.substring(0, 9);
    digits = cpf.substring(9);

    sum = 0;
    for (iterator = 10; iterator > 1; iterator--)
      sum += numbers.charAt(10 - iterator) * iterator;

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(0))
      return false;

    numbers = cpf.substring(0, 10);

    sum = 0;
    for (iterator = 11; iterator > 1; iterator--)
      sum += numbers.charAt(11 - iterator) * iterator;

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(1))
      return false;

    return true;
  }
  else
    return false;


}

