import { useState, useContext } from "react";
import { db } from "./firebase-config";
import { HjemKnap } from "./HjemKnap";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import './nybooking.css';
import { Link } from "react-router-dom";
import { ThemeContext } from "./HomeLayout";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { stringLength } from "@firebase/util";
import emailjs from "emailjs-com";
import React, { useRef } from 'react';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export function NyBooking() {

  const { theme, lang, lyd, playLyd, newUid, email, receipt } = useContext(ThemeContext);


  console.log("nybbokingkører")
  const [time, setTime] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [date, setDate] = useState();


  console.log(date)


  const newMonth = (String(date).slice(4).substring(0, 3))
  const newDay = (String(date).slice(8).substring(0, 2))
  const newYear = (String(date).slice(11).substring(0, 4))

  let collectDate;

  if (newMonth == "Jan") {
    console.log("new date: " + newDay + "-" + "01" + "-" + newYear)
    collectDate = (newDay + "-" + "01" + "-" + newYear)
  } else if (newMonth == "Feb") {
    console.log("new date: " + newDay + "-" + "02" + "-" + newYear)
    collectDate = (newDay + "-" + "02" + "-" + newYear)
  } else if (newMonth == "Mar") {
    console.log("new date: " + newDay + "-" + "03" + "-" + newYear)
    collectDate = (newDay + "-" + "03" + "-" + newYear)
  } else if (newMonth == "Apr") {
    console.log("new date: " + newDay + "-" + "04" + "-" + newYear)
    collectDate = (newDay + "-" + "04" + "-" + newYear)
  } else if (newMonth == "May") {
    console.log("new date: " + newDay + "-" + "05" + "-" + newYear)
    collectDate = (newDay + "-" + "05" + "-" + newYear)
  } else if (newMonth == "Jun") {
    console.log("new date: " + newDay + "-" + "06" + "-" + newYear)
    collectDate = (newDay + "-" + "06" + "-" + newYear)
  } else if (newMonth == "Jul") {
    console.log("new date: " + newDay + "-" + "07" + "-" + newYear)
    collectDate = (newDay + "-" + "07" + "-" + newYear)
  } else if (newMonth == "Aug") {
    console.log("new date: " + newDay + "-" + "08" + "-" + newYear)
    collectDate = (newDay + "-" + "08" + "-" + newYear)
  } else if (newMonth == "Sep") {
    console.log("new date: " + newDay + "-" + "09" + "-" + newYear)
    collectDate = (newDay + "-" + "09" + "-" + newYear)
  } else if (newMonth == "Oct") {
    console.log("new date: " + newDay + "-" + "10" + "-" + newYear)
    collectDate = (newDay + "-" + "10" + "-" + newYear)
  } else if (newMonth == "Nov") {
    console.log("new date: " + newDay + "-" + "11" + "-" + newYear)
    collectDate = (newDay + "-" + "11" + "-" + newYear)
  } else if (newMonth == "Dec") {
    console.log("new date: " + newDay + "-" + "12" + "-" + newYear)
    collectDate = (newDay + "-" + "12" + "-" + newYear)
  }







  const handleRoomNumber = (e) => {
    var select = document.getElementById('roomNumberSelect');
    var value = select.options[select.selectedIndex].value;
    const input = e.target.value;
    setRoomNumber(value);
  };



  const handleTime = (e) => {
    var select = document.getElementById('timeSelect');
    var value = select.options[select.selectedIndex].value;
    setTime(value);
  };

  const [filledOut, setFilledOut] = useState(false)

  const data = {
    roomNumber: roomNumber,
    date: collectDate,
    time: time,
    id: `${collectDate}${roomNumber}${time}`
  }

  const handleSubmit = async () => {
    // e.preventDefault();
    const refreshPage = () => {
      window.location.reload();
    }


    


    const dataRef = doc(db, "lokaler", data.id);



    // console.log(data.id);
    const docSnap = await getDoc(dataRef);

    if (docSnap.exists()) {
      alert("Denne dato er allerede booked");

    } else {


        await setDoc(dataRef, data)



        alert("Den blev booked")


        
        refreshPage()
          .then(() => {
            console.log(dataRef.id)
           

          })
          .catch(error => {
            console.log(error);

          });

        refreshPage();

    }
    };

    // email
    const form = useRef();



    const sendEmail = () => {
      // e.preventDefault();


      if (receipt === true)  {

        emailjs.sendForm('service_2b11215', 'template_tnegy5s', form.current, 'GqPqQXVCfgKv4c3B4')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });

      } else {
        return
      }
    };



    return (
      <>

        <form className="hide-form" id="mailform" ref={form}
        // onSubmit={sendEmail}
        >
          <label>Name</label>
          <input type="text" name="user_name" value={newUid} />
          <label>Email</label>

          <input type="email" name="user_email" value={email} />
          {/* <label>day</label>

        <input type="text" name="booked_day" value={date}/> */}
          <label>date</label>
          <input type="text" name="date" value={collectDate} />
          <label>time</label>
          <input type="text" name="time" value={time} />
          <label>room number</label>
          <input type="text" name="room" value={roomNumber} />

          {/* <input type="submit" value="Send" /> */}
        </form>




        <div className="nybooking-container">
          <div className={`nybooking-wrapper`}>
            <div className="cal-wrap">

              <Calendar className={"calendar"}
                showWeekNumbers
                onChange={setDate}
                value={date}
              />

            </div>

            <div className="reservation">
              <h2 className="">{lang === 'dk' ? 'Vælg et tidspunkt' : 'Choose a time'}</h2>
              {/* <label htmlFor="timeSelect"></label> */}

              <select required onChange={handleTime} id="timeSelect" name="time" className={`bg-color-${theme}`} multiple>
                {/* <option selected disabled hidden value="">{lang === 'dk' ? 'Vælg tid' : 'Choose time'}</option> */}
                <option className={`bg-color-${theme}`} value="8:30-12:30">8.30-12.30</option>
                <option className={`bg-color-${theme}`} value="12:30-16:00">12.30-16.00</option>
                <option className={`bg-color-${theme}`} value="16:00-21:00">16.00-21.00</option>
              </select>


              <div className="ledige">

                <h2 className="">{lang === 'dk' ? 'Ledige lokaler' : 'Available rooms'}</h2>
                <p className="">
                  {lang === 'dk' ? '📽️ Projektor 👪 Antal personer 🌙 Mørklægning 💡 Vinduer i lokalet' : '📽️ Projector 👪 Number of people 🌙 Blackout 💡 Windows in the room'}
                </p>

                {/* <label htmlFor="roomNumberSelect"></label> */}
                <select required onChange={handleRoomNumber} id="roomNumberSelect" name="roomNumber" className={`bg-color-${theme}`} >
                  <option selected disabled hidden value="">{lang === 'dk' ? 'Vælg lokale' : 'Choose room'}</option>
                  <option className={`bg-color-${theme}`} value="1.20"> 1.20 max 30 👪 📽️🌙</option>
                  <option className={`bg-color-${theme}`} value="1.40"> 1.40 max 35 👪 📽️🌙💡</option>
                  <option className={`bg-color-${theme}`} value="2.20">  2.20 max 45 👪 📽️💡</option>
                  <option className={`bg-color-${theme}`} value="2.40">2.40 max 55 👪 📽️🌙💡</option>
                </select>

              </div>



            </div>

          </div>
          <div className="knapper">



<div onClick={sendEmail}>

            <Link onClick={lyd === true ? playLyd : null} className="" to="/NyBooking">
              <button className="booking-knap" onClick={handleSubmit} >Book</button>
              
            </Link>
</div>

            <div className="knapper"></div>

            <HjemKnap />
          </div>
        </div>





        {/* 
      <div className="wrapper-white">

        <div className={`grid-container-1 bg-${theme}`}>

          <div className={`nybooking-div bg-color-${theme}`}>
            <Calendar
              showWeekNumbers
              onChange={setDate}
              value={date}



            />


            <br />
            <h2 className=" pad-no">{lang === 'dk' ? 'Ledige lokaler' : 'Available rooms'}</h2>
            <p className="">
              {lang === 'dk' ? '📽️ Projektor 👪 Antal personer 🌙 Mørklægning 💡 Vinduer i lokalet' : '📽️ Projector 👪 Number of people 🌙 Blackout 💡 Windows in the room'}
            </p>
            <br />
            <label htmlFor="roomNumberSelect"></label>
            <select required onChange={handleRoomNumber} id="roomNumberSelect" name="roomNumber" className={`bg-color-${theme}`} >
              <option selected disabled hidden value="">{lang === 'dk' ? 'Vælg lokale' : 'Choose room'}</option>
              <option className={`bg-color-${theme}`} value="1.20"><p> 1.20 max 30 👪 📽️🌙</p></option>
              <option className={`bg-color-${theme}`} value="1.40"> <p> 1.40 max 35 👪 📽️🌙💡</p></option>
              <option className={`bg-color-${theme}`} value="2.20"> <p> 2.20 max 45 👪 📽️💡</p></option>
              <option className={`bg-color-${theme}`} value="2.40"> <p> 2.40 max 55 👪 📽️🌙💡</p></option>
            </select>
            <br /> <br />
            <h2 className="pad-no">{lang === 'dk' ? 'Vælg et tidspunkt' : 'Choose a time'}</h2>
            <label htmlFor="timeSelect"></label>
            <br />
            <select  required onChange={handleTime} id="timeSelect" name="time" className={`bg-color-${theme}`} multiple>

              <option className={`bg-color-${theme}`} value="8:30-12:30">8.30-12.30</option>
              <option className={`bg-color-${theme}`} value="12:30-16:00">12.30-16.00</option>
              <option className={`bg-color-${theme}`} value="16:00-21:00">16.00-21.00</option>

            </select>

            <br /> <br />
            

          </div>

          <Link className=" pos-fix-2" to="/NyBooking">
            <button className="booking-knap" onClick={handleSubmit} >Book</button>
          </Link>

          <HjemKnap />
        </div>
      </div> */}
      </>
    );

  }


