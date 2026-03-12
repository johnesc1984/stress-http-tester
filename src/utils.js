function reemplazarRandomEnObjeto(obj, numero) {
  if (!obj) return obj;

  return JSON.parse(
    JSON.stringify(obj).replace(/<random>/g, numero)
  );
}

function cumpleExpectedBody(expected, response) {
  if (!expected) return true;

  for (const key in expected) {
    if (response[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}

module.exports = {
  reemplazarRandomEnObjeto,
  cumpleExpectedBody
};