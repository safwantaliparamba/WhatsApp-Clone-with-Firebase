import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { db } from '../../../config/firebase'
import { authActions } from '../../store/authSlice'

const Profile = ({ closeHandler }) => {
    const dispatch = useDispatch()
    const inputRef = useRef()

    const [name, phone, image, isVerified, uid] = useSelector(state => {
        const { name, phone, image, isVerified, uid } = state.auth
        return [name, phone, image, isVerified, uid]
    })

    const [phoneNumber, setPhone] = useState()
    const [isAlreadyExists, setExists] = useState(false)

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setExists(false)
        }, 3000)
    }, [isAlreadyExists])

    const setPhoneNumber = () => {
        const userRef = collection(db, "Users")
        const q = query(userRef, where("phone", "==", +phoneNumber))
        getDocs(q)
            .then((res) => {
                const isExists = res.docs.map((doc) => {

                    return { id: doc.id, ...doc.data() };
                })

                if (isExists.length > 0) {
                    setExists(true)

                } else {
                    setExists(false)

                    const data = {
                        isVerified: true,
                        phone: +phoneNumber
                    }

                    const ref = doc(db, "Users", uid)
                    updateDoc(ref, data)
                        .then(() => {
                            dispatch(authActions.verify({
                                isVerified: true,
                                phone: +phoneNumber,
                            }))
                        })
                }
            })
    }

    const logoutHandler = () => {
        dispatch(authActions.logout())
    }

    return (
        <Overlay onClick={() => isVerified && closeHandler()}>
            <Content onClick={e => e.stopPropagation()}>
                <Top>
                    <img src={image} referrerPolicy="no-referrer" alt="profile" />
                </Top>
                <MainSection>
                    <h3>{name}</h3>
                    {isVerified ? (
                        <span>{phone}</span>
                    ) : (
                        <>
                            <input
                                ref={inputRef}
                                type="number"
                                className={isAlreadyExists ? "exists" : ""}
                                value={phoneNumber}
                                onChange={e => setPhone(e.target.value)}
                            />
                            {isAlreadyExists && (
                                <p className="error">This phone number already exists</p>
                            )}
                            <Save onClick={setPhoneNumber}>save</Save>
                        </>
                    )}
                    <Logout onClick={logoutHandler}>
                        Logout
                    </Logout>
                </MainSection>
            </Content>
        </Overlay>
    )
}

export default Profile

const Overlay = styled.section`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #534e4e34;
`
const fadeIn = keyframes`
    0%{
        scale: .7;
        opacity: 0.8;
    }
    100%{
        scale: 1;
        opacity: 1;
    }
`
const Content = styled.main`
    width: 600px;
    /* height: 400px; */
    background: #111;
    border-radius: 16px;
    padding: 32px;
    animation:${fadeIn} .3s ease-in-out ;
    transition: all 1s ease-in-out;
`

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    img{
        width: 150px;
        border-radius: 50%;
    }
`

const MainSection = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3{
        font-size: 21px;
        color: rgb(157 153 153);
        margin-bottom: 16px;
    }

    input,span{
        padding: 8px 12px;
        color: rgb(157 153 153);
        font-size: 16px;
    }
    input{
        border: 1px solid rgb(157 153 153);
        border-radius: 8px;

        &.exists{
            border-color: red;
        }
    }
    span{
        user-select: text;
    }
    p{
        color: red;
        font-size: 14px;
    }
`

const Save = styled.button`
    padding: 8px 16px;
    background-color:rgb(157 153 153);  
    margin-top: 16px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`

const Logout = styled.button`
    display: block;
    margin-top: 42px;
    color: red;
    font-size: 18px;
    cursor: pointer;
`