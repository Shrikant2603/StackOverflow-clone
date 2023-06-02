import React from 'react'

import '../../App.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import { useMediaQuery } from 'react-responsive'

const Home = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    
    return (
        <div className='home-container-1'>
            <div className="left-sidebar">
                {!isMobile && <LeftSidebar />}
            </div>
            <div className='home-container-2'>
                <HomeMainbar />
                {!isMobile && <RightSidebar />}
            </div>
        </div>
    )
}

export default Home
 