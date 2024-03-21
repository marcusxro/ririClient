import React from 'react'
import Sidebar from '../comps/Sidebar'

const Inbox = () => {
    return (
        <div className='inboxCon'>
            <Sidebar />
            <div className="inboxContainer">

                <div className="inboxNotif">
                    <div className="notifText">
                        Notification
                    </div>

                    <div className="notifCon">

                        <div className="notifItem">
                            <div className="notifImg">
                                <ion-icon name="notifications-outline"></ion-icon>
                            </div>
                            <div className="notifs">
                                Your gallon has been delivered
                            </div>
                        </div>

                        <div className="notifItem">
                            <div className="notifImg">
                                <ion-icon name="notifications-outline"></ion-icon>
                            </div>
                            <div className="notifs">
                                Your gallon has been shipped!
                            </div>
                        </div>
                    </div>
                </div>



                <div className="contact">
                    <div className="contactText">
                        Contact
                    </div>
                    <div className="contactContent">

                        <div className="contactCons">

                            <div className="firstContact">
                                <div className="firstText">
                                    Feel free to contact us at anytime!
                                </div>
                                <div className="msgBox">
                                    <textarea placeholder='Enter your message'>

                                    </textarea>
                                    <button>Send</button>
                                </div>

                                <div className="ratings">
                                    Add ratings
                                </div>
                            </div>

                            <div className="secondContact">
                                <div className="items">
                                    <span><ion-icon name="call-outline"></ion-icon></span>
                                    <span>Number of Riri's</span>
                                </div>
                                <div className="items">
                                    <span><ion-icon name="mail-outline"></ion-icon></span>
                                    <span>Email of Riri's</span>
                                </div>
                                <div className="items">
                                    <span><ion-icon name="logo-facebook"></ion-icon></span>
                                    <span>Facebook of Riri's</span>
                                </div>
                                <div className="items">
                                    <span><ion-icon name="location-outline"></ion-icon></span>
                                    <span>Address of Riri's</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Inbox
