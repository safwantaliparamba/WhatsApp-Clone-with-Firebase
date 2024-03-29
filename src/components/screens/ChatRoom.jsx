import React, { useEffect, useRef, useState } from 'react'

import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'

import { db } from '../../config/firebase'
// import FCMMessage from '../../config/axiosInstance'
import sendIcon from "../../assets/images/sendIcon.png"
// import userIcon from "../../assets/images/demo-profile.jpg"

const ChatRoom = () => {
    const { roomId } = useParams()
    const inputRef = useRef()


    const [userId, name, image, activeChat] = useSelector(state => {
        return [state.auth.uid, state.auth.name, state.auth.image, state.chat.activeChat]
    })

    const [newMessage, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [isMessageEmpty, setMessageEmpty] = useState(false)

    const fetchMessages = () => {
        const chatRef = collection(db, "Messages")
        const q = query(chatRef, where("roomId", "==", roomId), orderBy("timestamp", "asc"), limit(100))

        const unSubscribe = onSnapshot(q, (data) => {
            const messages = data.docs.map(message => {

                if (message.data().roomId === roomId) {
                    return message.data()
                }
            })
            console.log(messages);

            if (messages.length > 0) {
                setMessages(messages)
            } else {
                setMessageEmpty(true)
            }

        }, (error) => {
            console.log(error.message);
        })

        return unSubscribe
    }

    useEffect(() => {
        inputRef.current.focus()
        var unSubscribe = null
        unSubscribe = fetchMessages()

        return () => {
            unSubscribe()
        }
    }, [roomId])

    useEffect(() => {
        document.querySelector("span.go-below").scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendNotification = () => {
        const data = {
            to: activeChat[userId]?.token,
            notification: {
                title: "You have a new message",
                body: `${name} send you a new message`,
                subtitle: "new message",
            }
        }

        console.log(data);

        // FCMMessage.post("send", data)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })


        // messaging
        //     .send(data)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

    const sendMessageHandler = () => {
        if (newMessage.trim().length > 0) {
            const messageRef = collection(db, "Messages")

            addDoc(messageRef, {
                isDeleted: false,
                isRead: false,
                message: newMessage,
                roomId,
                sender: userId,
                image: image,
                timestamp: serverTimestamp(),
            }).then((val) => {
                const roomRef = doc(db, "ChatRooms", roomId)
                updateDoc(roomRef, {
                    lastModified: serverTimestamp()
                }).then(val => console.log(val, "room lastModified updated"))
            })
            // sendNotification()
            setMessage("")
        }

    }

    const initialSendMessage = (e) => {
        const messageRef = collection(db, "Messages")

        addDoc(messageRef, {
            isDeleted: false,
            isRead: false,
            message: "Hii",
            roomId,
            sender: userId,
            image: image,
            timestamp: serverTimestamp(),
        })
    }

    return (
        <>
            {/* <Helmet>
                <title>Chat with {activeChat && activeChat[userId]?.name}</title>
            </Helmet> */}
            <Wrapper>
                <ChatsContainer>
                    {messages?.map(message => (
                        <MessageWrapper key={message.timestamp} className={message.sender === userId ? "you" : ""}>
                            <img src={message.image} alt="" referrerPolicy="no-referrer" />
                            <p>{message.message}</p>
                        </MessageWrapper>
                    ))}
                    {(!messages.length && isMessageEmpty) && (
                        <EmptyChatContainer>
                            <span onClick={initialSendMessage}>Click me to Send Hii</span>
                        </EmptyChatContainer>
                    )}
                    <span className="go-below"></span>
                </ChatsContainer>
                <InputSection>
                    <input
                        type="text"
                        ref={inputRef}
                        onChange={e => setMessage(e.target.value)}
                        value={newMessage}
                        placeholder="Type a message...."
                    />
                    <button className="wrapper" onClick={sendMessageHandler}>
                        <img src={sendIcon} alt="" />
                    </button>
                </InputSection>
            </Wrapper>
        </>
    )
}

export default ChatRoom

const Wrapper = styled.main`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    
    h1{
        color: rgb(157 153 153);
    }
`
const ChatsContainer = styled.section`
    width: 100%;
    /* height: 95%;
    max-height: 95%; */
    /* flex: 1; */
    height: 76vh;
    overflow-y: scroll;
    border: 1px solid rgb(38,39,42);
	background-color: rgb(27 28 31);
`
const InputSection = styled.div`
    /* height: 5%; */
    border: 1px solid rgb(38,39,42);
	background-color: rgb(27 28 31);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding:  24px;

    input{
        display: block;
        width: 95%;
        font-size: 17px;
        color: rgb(157, 153, 153);
    }

    .wrapper{
        width: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        :focus{
            border: 1px solid rgb(157, 153, 153);
        }
        cursor: pointer;
        img{
            width: 24px;
            margin: 0;
        }
    }
`

const EmptyChatContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    span{
        cursor: pointer;
    }
`

const MessageWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin: 12px;

    img{
        margin-top: 4px;
        width: 26px;
        border-radius: 50%;
    }
    p{
        font-size: 15px;
        max-width: 85%;
        border: 1px solid rgb(38, 39, 42);
        padding: 8px 24px;
        border-radius: 6px;
        border-top-left-radius: 0;
        background-color: rgb(22 22 25);
    }

    &.you{
        flex-direction: row-reverse;
        /* justify-content: flex-sta ; */

        p{
            border-top-right-radius: 0;
            border-top-left-radius: 6px;
        }
    }
`