import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import sendIcon from "../../assets/images/sendIcon.png"
import userIcon from "../../assets/images/demo-profile.jpg"

const ChatRoom = () => {
    const { uid } = useParams()
    const inputRef = useRef()
    const [userId, userName, image] = useSelector(state => {
        return [state.auth.uid, state.auth.name, state.auth.image]
    })

    const [newMessage, setMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            id: "1",
            user: "userId2",
            username: "user2",
            message: "Hiii",
            image: userIcon,
        },
        {
            id: "2",
            user: "userId2",
            username: "user2",
            message: "how are you",
            image: userIcon,
        },
        {
            id: "3",
            user: "userId3",
            username: "user3",
            message: "Its been a long time!",
            image: userIcon,
        },
    ])

    useEffect(() => {
        inputRef.current.focus()
    }, [uid])

    const sendMessageHandler = () => {
        if (newMessage.trim().length > 0) {
            setMessages([...messages, {
                id: new Date(),
                user: userId,
                username: userName,
                message: newMessage,
                image: image
            }])
            setMessage("")
        }
    }

    return (
        <>
            <Helmet>
                <title>{uid}</title>
            </Helmet>
            <Wrapper>
                <ChatsContainer>
                    {messages.map(message => (
                        <>
                            <MessageWrapper key={message.id} className={message.user === userId ? "you" : ""}>
                                <img src={message.image} alt="" referrerPolicy="no-referrer" />
                                <p>{message.message}</p>
                            </MessageWrapper>
                        </>
                    ))}
                </ChatsContainer>
                <InputSection>
                    <input type="text" ref={inputRef} onChange={e => setMessage(e.target.value)} value={newMessage} />
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
    gap: 12px;
    flex-direction: column;
    h1{
        color: rgb(157 153 153);
    }
`
const ChatsContainer = styled.section`
    width: 100%;
    height: 95%;
    max-height: 95%;
    overflow-y: scroll;
    border: 1px solid rgb(38,39,42);
	background-color: rgb(27 28 31);
`
const InputSection = styled.div`
    height: 5%;
    border: 1px solid rgb(38,39,42);
	background-color: rgb(27 28 31);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 24px;

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