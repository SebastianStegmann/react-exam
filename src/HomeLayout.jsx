import { Link, Outlet, useLocation } from "react-router-dom";
import avatar from "./img/avatar.jpg";
import house from "./img/bookinglogo.svg";
import './HomeLayout.css';
// import './login.css';
// import './booking.css';
// import './nybooking.css';
import { createContext, useState, useEffect } from "react";
import { Login, logout } from "./Login";
import click from "./sound/click.mp3"
import { getAuth, onAuthStateChanged } from "firebase/auth";



export const ThemeContext = createContext(null);



export function HomeLayout() {
    // send email 
    const [receipt, setReceipt] = useState(false);

    const toggleReceipt = () => {
        setReceipt((curr) => (curr === false ? true : false))
    }
    console.log(receipt, "receipt");

    // get effect, kører på reload
    useEffect(() => {
        const receiptData = window.localStorage.getItem('RECEIPT');

        if (receiptData !== null) setReceipt(JSON.parse(receiptData))
        console.log('receiptData', receiptData)
    }, [])

    // tager theme, gør det til en string og gemmer det under Key'en THEME
    useEffect(() => {
        const checkReceipt = window.localStorage.setItem("RECEIPT", JSON.stringify(receipt))
        console.log("checkReceipt", receipt)
    }, [receipt])



    // lyd
    const [lyd, setLyd] = useState(false);

    const toggleLyd = () => {
        setLyd((curr) => (curr === false ? true : false))
    }
    console.log(lyd, "lyd");

    const playLyd = () => {
        new Audio(click).play()

    }

    useEffect(() => {
        const lydData = window.localStorage.getItem('LYD');

        if (lydData !== null) setLyd(JSON.parse(lydData))
        console.log('lydData', lydData)
    }, [])

    // tager theme, gør det til en string og gemmer det under Key'en THEME
    useEffect(() => {
        const checkLyd = window.localStorage.setItem("LYD", JSON.stringify(lyd))
        console.log("checkLyd", lyd)
    }, [lyd])



    // language
    const [lang, setLang] = useState('dk');

    const toggleLang = () => {
        setLang((curr) => (curr === "dk" ? "en" : "dk"))
    }
    console.log(lang);


    // get effect, kører på reload
    useEffect(() => {
        const langData = window.localStorage.getItem('LANG');

        if (langData !== null) setLang(JSON.parse(langData))
        console.log('langData', langData)
    }, [])

    // tager theme, gør det til en string og gemmer det under Key'en THEME
    useEffect(() => {
        const checkLang = window.localStorage.setItem("LANG", JSON.stringify(lang))
        console.log("checkLang", lang)
    }, [lang])





    // lang slut


    // darkmode
    const [theme, setTheme] = useState('white');


    const toggleTheme = () => {
        setTheme((curr) => (curr === "white" ? "dark" : "white"))
    }
    console.log(theme);

    // get effect, kører på reload
    useEffect(() => {
        const themeData = window.localStorage.getItem('THEME');

        if (themeData !== null) setTheme(JSON.parse(themeData))
        console.log('themeData', themeData)
    }, [])

    // tager theme, gør det til en string og gemmer det under Key'en THEME
    useEffect(() => {
        const checkTheme = window.localStorage.setItem("THEME", JSON.stringify(theme))
        console.log("checkTheme", theme)
    }, [theme])


    // darkmode slut
    const location = useLocation();

    const getCurrentTitle = () => {
        switch (lang) {
            case "en":
                switch (location.pathname) {
                    case "/Home":
                        return "Home";
                    case "/Settings":
                        return "Settings";
                    case "/Booking":
                        return "My reservations";
                    case "/NyBooking":
                        return "New reservations";
                    case "/":
                        return "Login";

                }
            case "dk":
                switch (location.pathname) {
                    case "/Home":
                        return "Hjem";
                    case "/Settings":
                        return "Indstillinger";
                    case "/Booking":
                        return "Mine reservationer";
                    case "/NyBooking":
                        return "Ny reservation";
                    case "/":
                        return "Login";

                }
        }
    }



    const auth = getAuth();

    const [newUid, setUid] = useState()
    const [email, setEmail] = useState()


    // Virker ikke når er slået til

    const [loggedIn, setLoggedIn] = useState(false)

    console.log("Er den her bla?" + loggedIn)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
                setEmail(user.email);


                console.log("logget ind: " + newUid + "email: " + email)
                setLoggedIn(true)
                console.log("Er den her bla?" + loggedIn)
            } else {
                console.log("ikke logget ind")
            }
        });

    }, []);




    return (
        <>
            <ThemeContext.Provider value={{ theme, toggleTheme, lang, toggleLang, location, lyd, toggleLyd, playLyd, newUid, email, receipt, toggleReceipt, loggedIn, setLoggedIn }}>

                <div className="container">
                    <header className="header-size">
                        <div>
                            <img className="img-fix round display-none" src={avatar} alt="avatar" height="75" />
                            <h1>{email}</h1>
                        </div>

                        <div>
                            <Link to={loggedIn === true ? "/Home" : "/Login"}>
                                <img className="logoscaling" src={house} alt="house logo" height="125px" />
                            </Link>
                        </div>

                        <div>
                            <div >
                                <h1>{getCurrentTitle()}</h1>
                            </div>
                        </div>
                    </header>
                    <div className={`main-content bg-${theme}`}>

                        <Outlet />


                    </div>


                    <p className="copyright">copyright © Bookin</p>


                </div>

                {/* 

                <div className="wrapper-top">
                    <div className="grid-container-3">
                        <div className="grid-item-menu">

                            <div className="grid-container-2">
                                <img className="img-fix round display-none" src={avatar} alt="avatar" height="75" />
                                <h1>Jeppe Lorentzen</h1>
                            </div>

                        </div>

                        <div className="grid-item-menu">
                            <Link to="/Home">
                                <img className="img-scale-max-125" src={house} alt="house logo" height="125px" />
                            </Link>
                        </div>

                        <div className="grid-item-menu">
                            <h1>{getCurrentTitle()}</h1>
                        </div>
                    </div>


                </div>


                <Outlet />

                <p className="center">copyright © Bookin</p>



                copy right */}
            </ThemeContext.Provider>
        </>
    )
}

