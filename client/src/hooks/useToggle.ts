import { Dispatch, SetStateAction, useState } from "react";

export function useToggle(
  initialState = false
): [
  toggle: boolean,
  handleToggle: () => void,
  setToggle: Dispatch<SetStateAction<boolean>>
] {
  const [toggle, setToggle] = useState<boolean>(initialState);

  const handleToggle = () => setToggle((prev) => !prev);

  return [toggle, handleToggle, setToggle];
}
