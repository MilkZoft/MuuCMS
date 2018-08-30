export function getInputChanged(e) {
  const { target: { name } } = e;
  const value = e.target.value || '';
  const newState = {};

  newState[name] = value;

  if (name) {
    return newState;
  }

  return false;
}
