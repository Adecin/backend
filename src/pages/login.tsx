"use client";

import ResetComp from "../components/auth/create-password";
import ForegetPasswordComp from "../components/auth/forgotPassword";
import AppLogin from "../components/auth/login";
import OtpSubmit from "../components/auth/otp-Sbumission";
import { Dialog } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import FarmerList from "./field-officer/assign-farmer-list";
import { PopCloseRoundedIcon } from "../components/popcloseIcons";
import background from "../assets/image/authBg.png"

export default function AuthScreen(props: any) {
    const [showLogin, setShowLogin] = useState(true);
    const [showForget, setShowForget] = useState(false);
    const [isresetpOpen, setIsresetupOpen] = useState(false);
    const [passwordPop, setPasswordPop] = useState(false);


    const showforgetPassword = () => {
        setShowLogin(false);
        setShowForget(true);
    };

    const handleresetOpen = () => {
        setIsresetupOpen(true);
    }
    const handleresetClose = () => {
        setIsresetupOpen(false);
    }

    const handlePasswordOpen = () => {
        setPasswordPop(true);
    }
    const handlePasswordClose = () => {
        setPasswordPop(false);
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center" style={{
                backgroundImage: `url(./authBg.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
            }}>
                {showLogin ? <AppLogin forgrtLink={showforgetPassword} /> : (showForget ? <ForegetPasswordComp resetPop={handleresetOpen} /> : '')}
            </div>
            <Dialog open={isresetpOpen} >
                <div className="flex flex-col">
                    <PopCloseRoundedIcon handleClick={handleresetClose} style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px"
                    }} />
                    <OtpSubmit onClose={() => { handleresetClose }} setpasswordPop={handlePasswordOpen} />
                </div>
            </Dialog>
            <Dialog open={passwordPop} >
                <PopCloseRoundedIcon handleClick={handlePasswordClose} style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px"
                }} />
                <ResetComp onClose={() => { handlePasswordClose }} />
            </Dialog>
        </>
    )
}