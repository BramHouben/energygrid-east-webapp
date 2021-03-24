export function getFormData(event) {
  const formData = new FormData(event.target);
  return Object.fromEntries(formData.entries());
}

// return true if string is null, undefined, NaN, empty, 0, false
export function stringIsNullOrEmpty(str) {
  if (str && !isBlank(str)) {
    return false;
  }
  return true;
}

function isBlank(str) {
  const chars = Array.from(str);
  return chars.every((c) => c === " ");
}

export function clearForm(formId) {
  document.getElementById(formId).reset();
}

export function disableForm(formId) {
  const form = document.getElementById(formId);
  [].slice
    .call(form.getElementsByTagName("input"))
    .forEach((input) => (input.disabled = true));
  [].slice
    .call(form.getElementsByTagName("select"))
    .forEach((select) => (select.disabled = true));
  [].slice
    .call(form.getElementsByTagName("textarea"))
    .forEach((textarea) => (textarea.disabled = true));
  [].slice
    .call(form.getElementsByTagName("button"))
    .forEach((button) => (button.disabled = true));
}

export function toggleSpinner(spinnerId, buttonId) {
  const currentState = document.getElementById(buttonId).disabled;
  document.getElementById(spinnerId).style.display = currentState
    ? "none"
    : "inline-block";
  document.getElementById(buttonId).disabled = !currentState;
}
