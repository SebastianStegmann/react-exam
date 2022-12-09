import { useEffect, useState } from "react";
import { transformToArray } from "./firebase-utils";
import Spinner from "./Spinner";
import SingleBooking from "./SingleBooking";
import { db } from "./firebase-config";
import { HjemKnap } from "./HjemKnap";

const url = {db};

export function BookLokale({ bookings, setBookings }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Håndtere async logik/kode
    async function getData() {
      // Vi laver vores fetch kald, og får et http response fra vores firebase
      const response = await fetch(url);
      if (response.status == 200) {
        // Vi får body ud af det http response
        const body = await response.json();
        // Vi laver det mærkelige firebase object om til et array.
        const asArray = transformToArray(body);
        setBookings(asArray);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <> 
    <main>
      {isLoading && <Spinner />}
      {isError && <p> Der er sket en uventet fejl, prøv igen senere.</p>}
      {bookings.map((booking) => {
        return <SingleBooking date={booking.date} room={booking.room} />;
      })}


    </main>
    <HjemKnap/>
    </>
  );
}