import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={'About Us - Shiv Store'}>
        <div className='row aboutus'>
         <div className='col-md-6'>
            <img 
            src='/images/about.png'
            alt='contactus'
            style={{width:'80%',height:'80%'}}
            />
            </div>
            <div className='col-md-4'>
               
               <h1 className='text-justify mt-2'>
                Provide Best Quality 
                in Best Price.
               </h1>

            </div>
      </div>
    </Layout>
  )
}

export default About