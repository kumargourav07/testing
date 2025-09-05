import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className={styles.navContainer}>
         <div><h3>SKYSCRAPPER</h3></div>
         <div className={styles.menu}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact us</Link>
         </div>
      </div>
    </>
  )
}

export default Navbar