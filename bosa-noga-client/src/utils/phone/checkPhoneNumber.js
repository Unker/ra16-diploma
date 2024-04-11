export default function checkPhoneNumber(phoneNumber) {
  // Проверяем на недопустимые символы ( +,-,),(,цифра,пробел )
  const notValidSybolsRegex = /[^\d\s()+-]/;
  if (notValidSybolsRegex.test(phoneNumber)) {
    return null;
  }

  // удаляем пробелы и дефисы
  const stripPhone = phoneNumber.replace(/[\s-]/g, '');

  // Если первая 8, то заменим ее на +7
  const correctRussianStyle = stripPhone.replace(/^[8]/g, '+7');

  // Проверяем корректность Международного стандарта (т.е. через "+")
  // 1. вначале "+", потом чило,
  // 2. потом число в круглых скобках "()" (может не быть)
  // 3. заканчиваться числом
  const isPhoneNamberRegex = /^\+\d+(\(\d+\))?(\d+)$/;
  if (!isPhoneNamberRegex.test(correctRussianStyle)) {
    return null;
  }

  // Удаление всех символов, кроме цифр
  const digitsOnly = correctRussianStyle.replace(/[\D+]/g, '');

  // Проверка длины номера телефона
  // Согласно стандарту https://www.itu.int/rec/T-REC-E.164/ максимум 15 цифр
  if (digitsOnly.length > 15 || digitsOnly.length < 4) {
    return null;
  }

  return `+${digitsOnly}`;
}
