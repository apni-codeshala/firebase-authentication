import React from 'react';
import { Outlet } from 'react-router-dom';

import HomeHeader from './HomeHeader';

const Home = () => {
  return (
    <div className='bg-[#3d3d3d] min-h-[100vh]'>
      <HomeHeader />
      <Outlet />
    </div>
  )
}

export default Home