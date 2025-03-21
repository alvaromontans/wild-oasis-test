import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (context === undefined)
        throw new Error(
            "DarkModeContext no puede ser utilizado fuera de DarkModeProvider"
        );

    return context;
}

export { useDarkMode };