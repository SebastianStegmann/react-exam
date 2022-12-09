import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import './App.css';
import { ThemeContext } from "./HomeLayout";

export function HjemKnap() {
    const { theme, lang, location, lyd, playLyd } = useContext(ThemeContext);

    let hjemknapcss = "hjem-knap";

    const setFarve = () => {
        console.log(location, "checklocation")

        if (theme === "dark") {
            hjemknapcss = "hjem-knap-settings"
        } else if (location.pathname === "/Settings") {
            hjemknapcss = "hjem-knap-settings"
        } else {
            hjemknapcss = "hjem-knap"
        }
    }
    setFarve();



    return (
        <>
            <Link to="/Home">
                <button onClick={lyd === true ? playLyd : null} className={`${hjemknapcss} center `}>{lang === 'dk' ? 'Hjem' : 'Home'}</button>
            </Link>
        </>
    )
}
