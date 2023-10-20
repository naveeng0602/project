import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiBorderRadius, BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi';

const Policy = () => {
  return (
    <Layout title={'Privacy - Shiv Store'}>
       <div className='row contactus'>
         <div className='col-md-6'>
            <img 
            src='/images/Naveen.jfif'
            alt='contactus'
            style={{width:'80%',height:'80%'}}
            />
            </div>
            <div className='col-md-4'>
               <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
               <p className='text-justify mt-2'>
                  Any query and info about product feel free to call anytime we 24*7
                  avilable
                  </p>
               <p className='mt-3'>
                  <BiMailSend /> : www.naveengupta6221@gmail.com
               </p>
               <p className='m-3'>
                  <BiPhoneCall /> : 9713771515,7415702441
               </p>
               <p className='mt-3'>
                  <BiSupport /> : 9827288625 (toll free)
               </p>

            </div>
      </div>
    </Layout>
  )
}

export default Policy