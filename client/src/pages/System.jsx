import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Authentication } from '../Authentication'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../comps/Sidebar'
import waterCon from '../images/waterCon.jpg'
import waterJag from '../images/waterJag.jpg'
const System = () => {
  const nav = useNavigate('')


  useEffect(() => {
    const unsub = onAuthStateChanged(Authentication, (acc) => {
      if (!acc) {
        nav("/")
      }
    })
    return () => { unsub() }
  }, [])


  return (
    <div className='SystemCon'>

      <Sidebar />
      <div className="systemCon">
        <header>
          <div className="itemOne">
            Water Gallon
          </div>
          <div className="cart">
            <ion-icon name="cart-outline"></ion-icon>
          </div>
        </header>
        <div className="gallonCon">

          <div className="gallon">

            <div className="absoBtn">
              <div className="btn">
                <ion-icon name="add-outline"></ion-icon>
              </div>
              <div className="btn">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>
            <div className="gallonImg">
              <img src={waterCon} alt="" />
            </div>

            <div className="gallonLower">
              <div className="gallonInfo">
                <div className="name">
                  Water Container
                </div>
                <div className="price">
                  ₱30
                </div>
              </div>

              <div className="gallonBtn">
                <div className="btn">
                  Refill
                </div>
                <div className="btn">
                  Buy Gallon
                </div>
              </div>
            </div>

          </div>

          <div className="gallon">
            <div className="absoBtn">
              <div className="btn">
                <ion-icon name="add-outline"></ion-icon>
              </div>
              <div className="btn">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>
            <div className="gallonImg">
              <img src={waterJag} alt="" />
            </div>
            <div className="gallonLower">
              <div className="gallonInfo">
                <div className="name">
                  Water Jag
                </div>
                <div className="price">
                  ₱30
                </div>
              </div>
              <div className="gallonBtn">
                <div className="btn">
                  Refill
                </div>
                <div className="btn">
                  Buy Gallon
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default System
