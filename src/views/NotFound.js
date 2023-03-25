import React from 'react'
import notfound from '../assets/img/notfound.jfif'
import DemoNavbar from "components/Navbars/DemoNavbar";

const NotFound = () => {
  return (
    <div>
            <DemoNavbar />
    <img src={notfound} width="100%"/>
    </div>
  )
}

export default NotFound