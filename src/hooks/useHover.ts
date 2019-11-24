import { useState } from 'react';

export const useHover: (
  initalState: boolean
) => [boolean, () => void, () => void] = (initialState = false) => {
  const [hovered, changeHovered] = useState(initialState);
  function onMouseEnter() {
    changeHovered(true);
  }
  function onMouseLeave() {
    changeHovered(false);
  }
  return [hovered, onMouseEnter, onMouseLeave];
};
