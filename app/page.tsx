'use client'

import { CarCard, CustomFilter, Hero, SearchBar,  } from '../components'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '../constants/constants'
import ShowMore from '@/components/ShowMore';
import { useEffect, useState } from 'react';
import Image from "next/image"


export default function Home() {

  const [allCars, SetAllCars] = useState([]);
  const [loading , setLoading] = useState(false);

  // search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState('');
  const [limit, setLimit] = useState(10);

  const getAllCars = async () => {
    setLoading(true)
   try {
    const result = await fetchCars({
      manufacturer: manufacturer || '',
      year: year || 2022,
      fuel: fuel || '',
      limit: limit || 10,
      model: model || '',
    });
    SetAllCars(result);
   } catch (error) {
     console.log(error)
   } finally {
     setLoading(false)
   }
  };

  useEffect(() => {
    getAllCars();
  }, [manufacturer, model, year, fuel, limit]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-13 padding-x padding-y max-width" id='discover'>
        <div className='home__text-container'>
               <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                <p className="text-lg mt-4">Choose from a wide range of cars, from sedans to SUVs to luxury.</p>
        </div>

        <div className="home__filters">
          <SearchBar 
          setManufacturer={setManufacturer}
          setModel={setModel}
          />

         <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} 
            setFilter={setFuel}
            />
            <CustomFilter title='year' options={yearsOfProduction} 
            setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => <CarCard car={car} /> )}
            </div>
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image
                src='/loader.svg'
                alt='loading'
                width={50}
                height={50}
                className='object-contain'
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}              
            />
          </section> ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            
          </div>

          )}
      </div>
    </main>
  )
}
