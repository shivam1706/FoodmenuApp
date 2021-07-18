import React, { useState, useEffect } from 'react';
import Loading from './tutorial/tours/setup/Loading';
import Tours from './tutorial/tours/setup/Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function Apptour() {
 
  const [loading,setLoading]=useState(true);
  const [tours,setTours]=useState([]);

  const removeTours=(id)=>
  {
    const newTours=tours.filter((tour)=>tour.id!==id);
    setTours(newTours);
  }

  const fetchTours= async()=>
  {
    setLoading(true);
    try
    {
      const response=await fetch(url);
     const tours=await response.json();
      setLoading(false);
      setTours(tours);
    }
    catch(error)
    {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>
  {
    fetchTours();
  },[]);

  if(loading)
  {
    return(<>
      <Loading/>
      </>
    );
  }

 if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }

  return(
    <React.Fragment>
      <Tours tours={tours} removeTours={removeTours}/>
    </React.Fragment>
  );

}

export default Apptour
