import { Link } from "react-router-dom";
import avatar from "./img/avatar.jpg";
import aktuelleBookninger from "./img/orangetab.svg";
import nyBooking from "./img/blatab.svg";
import dinInstillinger from "./img/gratab.svg";
import { HomeLayout } from "./HomeLayout";
import { ThemeContext } from "./HomeLayout";
import react, { useState, useContext } from "react";




export function Home() {


    const { theme, lang, lyd, playLyd, email } = useContext(ThemeContext);
    console.log("passet email: " + email)

    return (<>

        {/* <div className="wrapper-white"> */}

        {/* <div className={`bg-${theme}`}> */}
        <div className="home-container">



            <div className={`greeting`} >
                <img className="round"
                    src={avatar}
                    alt="avatar"
                    height="75" />
                <h1 className={``} > {lang === 'dk' ? 'Godmorgen ' + email + '!' : 'Goodmorning ' + email + '!'} </h1>
            </div>

            <div className="tabs ">


              
                    <Link  onClick={lyd === true ? playLyd : null} className="" to="/Booking" >
                        <img className=""
                            src={aktuelleBookninger}
                            alt="aktuelleBookninger"
                            height="150" />
                    </Link> 



                    <Link  onClick={lyd === true ? playLyd : null}
                        to="/NyBooking" >
                        <img className=" "
                            src={nyBooking}
                            alt="nyBooking"
                            height="150" />
                    </Link> 


                    <Link  onClick={lyd === true ? playLyd : null}
                    className="" to="/Settings" >
                        <img className=" " src={dinInstillinger} alt="dinInstillinger" height="150" />
                    </Link> 
            </div>


        </div>

        {/* </div> */}


        {/* 
        <div className={`grid-container-1 bg-${theme}`}>



            <div className={`center home-de-lift `} >
                <img className="round"
                    src={avatar}
                    alt="avatar"
                    height="75" />
                <h1 className={`godmorgen img-scale`} > {lang === 'dk' ? 'Godmorgen Jeppe!' : 'Goodmorning Jeppe!'} </h1> </div>

            <div className={`grid-container-3 img-pad-home home-lift`} >
                <div className="grid-item" >
                    <Link className="" to="/Booking" >
                        <img className="img-scale"
                            src={aktuelleBookninger}
                            alt="aktuelleBookninger"
                            height="150" />
                    </Link> </div>


                <div className={`grid-item `}>
                    <Link
                        to="/NyBooking" >
                        <img className=" img-scale"
                            src={nyBooking}
                            alt="nyBooking"
                            height="150" />
                    </Link> </div>

                <div className={`grid-item`} >
                    <Link className="" to="/Settings" >
                        <img className=" img-scale" src={dinInstillinger} alt="dinInstillinger" height="150" />
                    </Link> </div> </div>

            <div className="space-set-hjem"></div>

        </div> */}
        {/* </div> */}

    </>
    )
}