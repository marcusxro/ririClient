import React, { useEffect, useState } from 'react'
import Sidebar from '../comps/Sidebar'
import { onAuthStateChanged } from 'firebase/auth'
import { Authentication } from '../Authentication'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Profile = () => {
    const nav = useNavigate('')
    const [data, setData] = useState([])
    const [uid, setUid] = useState('')

    useEffect(() => {
        const unsub = onAuthStateChanged(Authentication, (acc) => {
            if (acc) {
                setUid(acc.uid)
                console.log(uid)
            } else {
                nav('/')
            }
        })
        return () => { unsub() }
    }, [uid])



    useEffect(() => {
        axios.get('http://localhost:8080/GetAcc')
            .then((res) => {
                const filteredData = res.data.filter((item) => item.Uid === uid)
                setData(filteredData[0])
            }).catch((err) => {
                console.log(err)
            })

    }, [data])

    const [isEdit, setEdit] = useState(false)
    const [userName, setUsername] = useState('')
    const [Address, setAddress] = useState('')
    const [ContactNo, setContactNo] = useState('')


    const getVal = (user, addrss, cntc) => {
        setUsername(user)
        setAddress(addrss)
        setContactNo(cntc)
    }

    const [infoDetails, setInfo] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/GetInfo')
            .then((res) => {
                setInfo(res.data[0])
            }).catch((err) => {
                console.log(err)
            })

    }, [infoDetails])

    const sendInfo = () => {

        axios.post('http://localhost:8080/SendInfo', {
            Address: Address,
            Username: userName,
            Contact: ContactNo,
            Uid: uid,
        }).then(() => {
            console.log("details sent")
        }).catch((err) => {
            console.log(err)
        })

        axios.put(` http://localhost:8080/ChangeName/${uid}` , {
            Username: userName,
        }).then(() => {
            console.log("details senst")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='profileCon'>
            <Sidebar />

            <div className="profileContent">
                <div className="upperProfile">

                    <div className="firstCon">
                        <div className="contactImg">
                            <ion-icon name="person-outline"></ion-icon>
                        </div>

                        {isEdit === true ? (
                            <div className="userName">
                                <input type="text" placeholder='Edit your Username' value={userName} onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                        ) : (
                            <div className="userName">
                                {data ? data.Username : "loading"}
                            </div>
                        )
                        }
                    </div>


                    {isEdit === true ? (

                        <div className="secondCon">
                            <input type="text" placeholder='Add Address' value={Address} onChange={(e) => { setAddress(e.target.value) }} />
                            <input type="number" placeholder='Add Contact number' value={ContactNo} onChange={(e) => { setContactNo(e.target.value) }} />
                        </div>
                    ) : (

                        <div className="secondCon">
                            <div className="Address">
                                Address: <span>{infoDetails && infoDetails.Address}</span>
                            </div>
                            <div className="Address">
                                Contact No: <span>{infoDetails && infoDetails.Contact}</span>
                            </div>
                        </div>
                    )}


                    {isEdit === true ? (
                        <div className="absoCon">
                            <div className="absoBtns green" onClick={() => { setEdit(!isEdit); sendInfo() }}>
                                <ion-icon name="create-outline"></ion-icon>
                            </div>
                            <div className="absoBtns red" onClick={() => { setEdit(!isEdit) }}>
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </div>
                        </div>

                    ) : (

                        (data && <div className="absoBtn" onClick={() => { setEdit(!isEdit); getVal(data.Username, infoDetails.Address, infoDetails.Contact) }}>
                            <ion-icon name="create-outline"></ion-icon>
                        </div>)

                    )}
                </div>


                        <div className="lowerContent">

                                <div className="lowerItem">
                                        <div className="method">
                                            <span><ion-icon name="wallet-outline"></ion-icon></span>
                                            <span>To pay</span>
                                        </div>
                                        <div className="itemBody">
                                            <div className="itemFirst">
                                                <div className="items">
                                                    Gallon Type:
                                                </div>
                                                <div className="items">
                                                    Quantity:
                                                </div>
                                                <div className="items">
                                                    Total prize:
                                                </div>
                                            </div>  
                                        </div>
                                </div>

                                <div className="lowerItem">
                                        <div className="method">
                        <span><ion-icon name="water-outline"></ion-icon></span>
                                            <span>To ship</span>
                                        </div>
                                        <div className="itemBody">
                                            <div className="itemFirst">
                                                <div className="items">
                                                    Preparing
                                                </div>
                                                <div className="items">
                                                    Quantity of Gallon:
                                                </div>
                                            </div>  
                                        </div>
                                </div>


                                <div className="lowerItem">
                                        <div className="method">
                                        <span><ion-icon name="car-outline"></ion-icon></span>
                                            <span>To recieve</span>
                                        </div>
                                        <div className="itemBody">
                                            <div className="itemFirst">
                                                <div className="items">
                                                    On the way to deliver 
                                                </div>
                                            </div>  
                                        </div>
                                </div>
                        </div>
            </div>

        </div>
    )
}

export default Profile
