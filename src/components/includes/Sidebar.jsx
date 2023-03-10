import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import profileImage from "../../assets/images/demo-profile.jpg"
import search from "../../assets/images/Search.png"
import { db } from '../../config/firebase'
import { chatActions } from '../store/chatSlice'


const Sidebar = ({ setContact }) => {
    const currentUserId = useSelector(state => state.auth.uid)

    const [chatRooms, setChatRooms] = useState([])
    const [keyword, setKeyword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const fetchChatRooms =  () => {
        const chatRoomRef = collection(db, "ChatRooms")
        const q = query(chatRoomRef, where("members", "array-contains", currentUserId), orderBy("lastModified", "desc"))

        const unSubscribe = onSnapshot(q, (data) => {
            const rooms = data.docs.map(doc => {
                return { roomId: doc.id, ...doc.data() }
            })
            console.log(rooms);

            if (rooms.length > 0) {
                setChatRooms(rooms)
            }
        }, (err) => {
            console.log(err.message);
        })

        return unSubscribe
    }

    useEffect(() => {
        var unSubscribe = null
        unSubscribe =  fetchChatRooms()

        return () => {
            unSubscribe && unSubscribe()
        }
    }, [])

    const selectChatHandler = (room) => {
        dispatch(chatActions.addActiveChat({
            activeChatRoom: room
        }))
        navigate(`/chat/${room.roomId}/`)
    }

    const SearchHandler = (e) => {
        console.log(keyword);
    }

    return (
        <Wrapper>
            <SearchContainer>
                <div className="content">
                    <input type="text" placeholder='search....' value={keyword} onChange={e => setKeyword(e.target.value)} />
                    <button onClick={SearchHandler}>
                        <img src={search} alt="search icon" />
                    </button>
                </div>
            </SearchContainer>
            <Items>
                {chatRooms.length && chatRooms?.map(room => (
                    <Item
                        key={room.roomId}
                        onClick={e => selectChatHandler(room)}
                        className={location.pathname.includes(room.roomId) ? "active" : ""}
                    >
                        <Left>
                            <img src={room[currentUserId]?.image} alt="" />
                        </Left>
                        <Right>
                            <h3>{room[currentUserId]?.name}</h3>
                        </Right>
                    </Item>
                ))}
            </Items>
            <AddContact onClick={e => setContact(true)}>
                +
            </AddContact>
        </Wrapper>
    )
}

export default Sidebar

const SearchContainer = styled.header`
    padding: 12px;
    
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

const Wrapper = styled.div`
    height: 100%;
    position: relative;
`

const Items = styled.ul`
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow-y: scroll;
    /* gap: 12px; */
`
const Item = styled.li`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 12px;
    transition: all 0.4s ease-in-out;

    :hover{
        background-color: rgb(38 39 42 / 61%);
    }

    &.active{
        background-color: rgb(38 39 42 / 80%);
    }
`

const AddContact = styled.span`
    position: absolute;
    /* left: 18%; */
    top: 90%;
    right: 5%;
    font-size: 32px;
    font-weight: 600;
    color: #111;
    border: 1px solid rgb(38, 39, 42);
    border-radius: 50%;
    background-color:rgb(157 153 153);
    padding: 7px 20px;
    cursor: pointer;
`

const Left = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
        width: 50%;
        border-radius: 50%;
    }
`
const Right = styled.div`
    h3{
        font-size: 16px;
        color: rgb(157 153 153);
    }
`