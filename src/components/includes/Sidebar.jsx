import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import profileImage from "../../assets/images/demo-profile.jpg"


const Sidebar = () => {
    const [recentChatUsers, setusers] = useState([
        {
            id:new Date(),
            name:"Safwan p",
            uid:"wujabjhbvyuuqgdj738171sjkn",
            lastModified:new Date(),
            image:profileImage
        },
        {
            id:new Date(),
            name:"hiyas usman",
            uid:"wujabjhbvyuwehjj738171sjkn",
            lastModified:new Date(),
            image:profileImage
        },
        {
            id:new Date(),
            name:"Banna",
            uid:"wujabjhbvyuuqgdj738171sjkn",
            lastModified:new Date(),
            image:profileImage
        },
        {
            id:new Date(),
            name:"Aysha Neema",
            uid:"wujabjhbvyuuqgdj738171sjkn",
            lastModified:new Date(),
            image:profileImage
        },
        {
            id:new Date(),
            name:"Kajal KM",
            uid:"wujabjhbvyuuqgdj738171sjkn",
            lastModified:new Date(),
            image:profileImage
        },
    ])
    const navigate = useNavigate()

    const selectChatHandler = (user)=>{
        navigate(`/chat/${user.uid}/`)
    }

    return (
        <Wrapper>
            <Items>
                {recentChatUsers.map(user => (
                    <Item key={user.name} onClick={e => selectChatHandler(user)}>
                        <Left>
                            <img src={user.image} alt="" />
                        </Left>
                        <Right>
                            <h3>{user.name}</h3>
                        </Right>
                    </Item>
                ))}
            </Items>
        </Wrapper>
    )
}

export default Sidebar

const Wrapper = styled.div`
    height: 100%;
    overflow-y: scroll;
`

const Items = styled.ul`
    display: flex;
    flex-direction: column;
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