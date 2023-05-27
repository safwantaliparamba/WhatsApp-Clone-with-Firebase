import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import search from "../../../assets/images/Search.png"
import { db } from '../../../config/firebase'
import { chatActions } from '../../store/chatSlice'


const AddContact = ({ closeHandler }) => {
    const [keyword, setKeyword] = useState("")
    const [isExists, setExists] = useState(false)
    const [notFound, setFound] = useState(false)
    const [user, setUser] = useState({})

    const [userId, userName, phone, image, token] = useSelector(state => {
        return [state.auth.uid, state.auth.name, state.auth.phone, state.auth.image, state.auth.FCMToken]
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const SearchHandler = async () => {
        if (keyword.trim().length === 10) {
            const userRef = collection(db, "Users")
            const q = query(userRef, where("phone", "==", +keyword))

            const docs = await getDocs(q)
            const foundUser = docs.docs.map(doc => doc.data())

            if (foundUser.length > 0 && foundUser[0].isVerified) {
                setUser(foundUser[0])
                setExists(true)
            } else {
                setFound(true)
            }
        }
    }

    const startChatHandler = () => {
        dispatch(chatActions.addActiveChat({ activeChatRoom: user }))


        let data = {
            members: [
                userId,
                user.userId
            ],
            lastModified: serverTimestamp(),
            [userId]: {
                name: user.name,
                phone: +user.phone,
                image: user.image,
                token: user.token
            },
            [user.userId] : {
                name: userName,
                phone: +phone,
                image: image,
                token,
            }

        }

        const chatRoomRef = collection(db, "ChatRooms")

        addDoc(chatRoomRef, data)
            .then((value) => {
                const messageRef = collection(db, "Messages")

                addDoc(messageRef, {
                    isDeleted: false,
                    isRead: false,
                    message: "Hii",
                    roomId: value.id,
                    sender: userId,
                    image: image,
                    timestamp: serverTimestamp(),
                })

                navigate(`/chat/${value.id}/`)
                closeHandler()

            }).catch(err => {
                console.log(err);
            })


    }

    return (
        <Overlay onClick={closeHandler}>
            <Content onClick={e => e.stopPropagation()}>
                <h1>Search user to start Chating!!</h1>
                <SearchContainer>
                    <div className="content">
                        <input
                            type="number"
                            placeholder='search by phone number....'
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                        />
                        <button onClick={SearchHandler}>
                            <img src={search} alt="search icon" />
                        </button>
                    </div>
                </SearchContainer>
                {isExists && (
                    <Button onClick={startChatHandler}>Start Chat</Button>
                )}
            </Content>
        </Overlay>
    )
}

export default AddContact

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
    z-index: 10;
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1{
        color: rgb(157 153 153);
        margin-bottom: 24px;
    }
`

const SearchContainer = styled.header`
    padding: 12px;
    width: 100%;
    
    .content{
        background-color: rgb(22 22 25);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        padding: 6px 18px;
        border-radius: 6px;
        border: 1px solid rgb(38, 39, 42);

        img{
            width: 12px;
        }

        input{
            font-size: 15px;
            padding: 8px 14px;
            color: rgb(157 153 153);
            width: 85%;
            
            ::placeholder{
                color: rgb(157 153 153);
            }
        }

        button{
            cursor: pointer;
        }
    }
`

const Button = styled.button`
    color: rgb(157 153 153);
    font-size: 18px;
    cursor: pointer;
    margin: 24px 0;
`