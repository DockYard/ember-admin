export { fillInByLabel, fillInByPlaceholder};

function fillInByLabel(text, value) {
  const label = find(`label:contains("${text}")`);
  let input;
  if (label.prop('for')) {
    input = find(`#${label.prop('for')}`);
  } else {
    input = label.find('input');
  }
  return fillIn(input, value);
}

function fillInByPlaceholder(text, value) {
  const input = find(`[placeholder="${text}"]`);

  return fillIn(input, value);
}
