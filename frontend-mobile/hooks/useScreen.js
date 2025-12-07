import { useState, useCallback } from "react";

export default function useScreen(initial = "login") {
  const [screen, setScreen] = useState(initial);

  const goTo = useCallback((name) => setScreen(name), []);
  const back = useCallback(() => setScreen("login"), []);

  return {
    screen,
    setScreen,
    goTo,
    back,
  };
}
