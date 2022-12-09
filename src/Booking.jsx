import './App.css';
import './booking.css';
import { useState, useEffect, useContext } from "react";
// import { getSuggestedQuery } from '@testing-library/react';
import { db } from "./firebase-config";
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { async } from '@firebase/util';
import furniture from "./img/furniture.jpg";
import light from "./img/light.jpg";
import projector from "./img/projector.jpg";
import size from "./img/size.jpg";
import { HjemKnap } from "./HjemKnap";
import { Link } from "react-router-dom";
import { NyBooking } from "./NyBooking";
import { Spinner } from "./Spinner"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

import { ThemeContext } from "./HomeLayout";



export function Booking() {

    const { theme, toggleTheme, lang, lyd, playLyd } = useContext(ThemeContext);

    // console.trace(Booking);
    console.log("kørerBooking")
    const [rooms, setRooms] = useState([]);
    const roomsColRef = collection(db, "lokaler")
    const [reload, doReload] = useState("0");

    const deleteBooking = async (id) => {
        const roomDoc = doc(db, "lokaler", id);
        await deleteDoc(roomDoc);
        doReload("1");
        console.log("test69")

    }






    // const isBooked = async (id) => {
    //   // Set the "capital" field of the city 'DC'
    //   const bookedRef = doc(db, "lokaler", id);
    //   console.log(bookedRef)
    //   await updateDoc(bookedRef, {
    //     booked: true
    //   });
    // }



    // const reRender = (() => reRender+1)

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);





    useEffect(() => {
        setIsLoading(true);
        const getRooms = async () => {

            const data = await getDocs(roomsColRef);
            if (data !== undefined) {
                setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                console.log("test1")
            } else {
                setIsError(true);
                console.log("test2")
            }
            setIsLoading(false);
        }
        getRooms();
        doReload("0");
        console.log("test4")
    }, [reload]
    );


    // onSnapshot(roomsColRef, (snapshot) => {
    //     let allRooms = []
    //     snapshot.docs.forEach((doc) => {

    // allRooms.push({...doc.data(), id: doc.id});
    // // const data = getDocs(roomsColRef);

    // setRooms(allRooms.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // })
    //  console.log(allRooms)

    // })

    return (<>
        <div className="booking-container">
            <div className="booking-wrapper">

                <Calendar className={"calendar"} />
                {/* mine bookinger */}



                <div className='reservation'>
                    <h2 className=''>{lang === 'dk' ? 'Mine reservationer' : 'My reservations'}</h2>
                    {isLoading && <Spinner />}
                    {isError && <p> {lang === 'dk' ? 'How der skete en fejl' : 'Something went wrong '}</p>}
                    <div className=' overscroll'>{rooms.map((room) => {
                        return (
                            <div className=''>



                                <div className='booked-info'>

                                    <p className=''>
                                        {lang === 'dk' ? 'Lokale' : 'Room'}: {room.roomNumber + " "}
                                        {/* <br /> */}
                                        {lang === 'dk' ? 'Tid' : 'Time'}: {room.time + " "}
                                        {/* <br /> */}
                                        {lang === 'dk' ? 'Dato' : 'Date'}: {room.date + " "}





                                    </p>
                                    <div onClick={lyd === true ? playLyd : null}>

                                        <button className='delete-knap' onClick={() => { deleteBooking(room.id) }}>{lang === 'dk' ? 'Slet' : 'Delete'}</button>
                                    </div>


                                </div>


                            </div>
                        );
                    })}</div>

                </div>


            </div>
            <div className='knapper'>

                <Link onClick={lyd === true ? playLyd : null} className='' to="/NyBooking">
                    <button className="booking-knap" >{lang === 'dk' ? 'Ny booking' : 'New booking'}</button>
                </Link>
                <div className="knapper"></div>
                <HjemKnap onClick={lyd === true ? playLyd : null} />


            </div>

        </div>




        {/* 
<div className="wrapper-white">

<div className={`grid-container-1 bg-${theme}`}>

    <div className={`grid-container-2 bg-color-${theme}`}>
        <div className=''>
            <h2 className=''>November 2022</h2>

            <ul className="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>

            <ul className="days">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li><span className="active">10</span></li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
                <li>31</li>
            </ul>




        </div>


        <div className=' left-space'>
            <h2 className=''>{lang === 'dk' ? 'Mine reservationer' : 'My reservations'}</h2>
            {isLoading && <Spinner />}
            {isError && <p> {lang === 'dk' ? 'How der skete en fejl' : 'Something went wrong '}</p>}
            <div className=' overscroll'>{rooms.map((room) => {
                return (
                    <div className=''>



                        <p className=''>
                            {lang === 'dk' ? 'Lokale': 'Room'}: {room.roomNumber}
                            <br />
                            {lang === 'dk' ? 'Dato' : 'Date'}: {room.date}
                            <br />
                            {lang === 'dk' ? 'Tid'  : 'Time'}: {room.time}
                        </p>

                        <button className='delete-knap' onClick={() => { deleteBooking(room.id) }}>{lang === 'dk' ? 'Slet' : 'Delete'}</button>


                    </div>
                );
            })}</div>

        </div>



    </div>

    <Link className='pos-fix' to="/NyBooking">
        <button className="booking-knap" >{lang === 'dk' ? 'Ny booking' : 'New booking'}</button>
    </Link>

    <HjemKnap />

</div>
</div> */}
    </>)



}


