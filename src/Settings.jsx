
import avatar from "./img/avatar.jpg";
import house from "./img/house.jpg";
import './Settings.css';
import { HjemKnap } from "./HjemKnap";
import react, { useState, useContext } from "react";
import { HomeLayout } from "./HomeLayout";
import { ThemeContext } from "./HomeLayout";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



export function Settings() {
    const { theme, toggleTheme, lang, toggleLang, lyd, toggleLyd, playLyd, receipt, toggleReceipt, loggedIn, setLoggedIn } = useContext(ThemeContext);


    const navigate = useNavigate();

    
    




   


    // logout

    const logout = async () => {
        await signOut(auth);
        console.log("signed out")
        navigate("/Login");
        window.location.reload();
        setLoggedIn(false)
    };

    return (
        <>
            <div className="settings-container bg-dark" >
                <div className="indstillinger bg-white">

                    {/* Sprog */}
                    <div className={``}>
                        <h2>{lang === 'dk' ? 'Sprog' : 'Language'}</h2>
                        <h3>{lang === 'dk' ? 'Dansk / Engelsk' : 'Danish / English'}</h3>
                    </div>
                    <div className="knap">
                        <label className={`switch`}
                            onClick={lyd === true ? playLyd : null}>
                            <input className={``} type="checkbox" onChange={toggleLang}
                                checked={lang === 'en' ? true : false} />
                            <span className="slider round"></span>
                        </label>
                    </div>


                    {/* Applikationlyde */}
                    <div className={``}>
                        <h2 className={``}>{lang === 'dk' ? 'Applikationslyde' : 'App sounds'}</h2>
                    </div>
                    <div className="knap">
                        <label  className={`switch`}
                            onClick={lyd === false ? playLyd : null}>
                            <input checked={lyd == false ? false : true} onChange={toggleLyd} type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>


                    {/* E-mail-kvittering */}
                    <div className={` `}>
                        <h2 className={``}>{lang === 'dk' ? 'E-mail-kvittering' : 'Email-receipt'} </h2>
                    </div>

                    <div className="knap">

                        <label className={`switch `}
                            onClick={lyd === true ? playLyd : null}>
                            <input onChange={toggleReceipt}
                                checked={receipt === true ? true : false} type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {/* Dark mode */}
                    <div className={``}>
                        <h2 className={``}>Dark mode</h2>
                    </div>

                    <div className="knap">

                        <label className={`switch`}
                            onClick={lyd === true ? playLyd : null}>
                            <input type="checkbox" onChange={toggleTheme}
                                checked={theme === 'dark' ? true : false}/>
                            <span className="slider round"></span>
                        </label>
                    </div>



                </div>
                <div className="knapper">
                    <button className="btn-white" onClick={logout}>sign out</button>
                    <div className="knapper"></div>
                    <HjemKnap />
                </div>

            </div>




            {/* 
            <div className="wrapper-white">
                <div className="bg-settings-dark">

                    <div className={`bg-dark`}>
                        <div className="container-settings">



                            <div className={`round-egde grid-container-2 bg-color-white`}>

                                <div className={`grid-item-settings `}>
                                    <h2>{lang === 'dk' ? 'Sprog' : 'Language'}</h2>
                                    <h3>{lang === 'dk' ? 'Dansk / Engelsk' : 'Danish / English'}</h3>
                                </div>

                                <label className={`switch grid-item-settings bg-color-white`}>
                                    <input className={`bg-color-white`} type="checkbox" onClick={toggleLang}
                                        checked={lang === 'en' ? true : false} />
                                    <span className="slider round labels"></span>
                                </label>


                                <div className={`grid-item-settings`}>
                                    <h2 className={`bg-color-white`}>{lang === 'dk' ? 'Applikationslyde' : 'App sounds'}</h2>
                                </div>

                                <label className={`switch grid-item-settings bg-color-white`}>
                                    <input type="checkbox" />
                                    <span className="slider round labels"></span>
                                </label>


                                <div className={`grid-item-settings `}>
                                    <h2 className={`bg-color-white`}>{lang === 'dk' ? 'E-mail-kvittering' : 'Email-reciept'}</h2>
                                </div>

                                <label className={`switch grid-item-settings bg-color-white`}>
                                    <input type="checkbox" />
                                    <span className="slider round labels"></span>
                                </label>


                                <div className={`grid-item-settings `}>
                                    <h2 className={`bg-color-white`}>Dark mode</h2>
                                </div>

                                <label className={`switch grid-item-settings bg-color-white`}>
                                    <input type="checkbox" onClick={toggleTheme}
                                        checked={theme === 'dark' ? true : false}
                                    />
                                    <span className="slider round labels"></span>
                                </label>

                            </div>



                        </div>
                        <button className="btn-white" onClick={logout}>sign out</button>
                        <HjemKnap/>
                    </div>


                </div>
            </div> */}




        </>
    )
}



