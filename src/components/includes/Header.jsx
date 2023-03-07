import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { authActions } from '../store/authSlice'

const Header = ({setShow}) => {
    // const name = useSelector(state => state.auth.name)
    const [uid, image, name] = useSelector(state => {
        return [state.auth.uid, state.auth.image, state.auth.name]
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(authActions.logout())
    }

    const clickHandler = () => {
        setShow(true)
    }

    return (
        <Wrapper>
            <h1 onClick={e => navigate('/')}>Let's Chat</h1>
            <nav>
                <ul>
                    <li onClick={clickHandler}>
                        <img src={image} alt="" referrerPolicy="no-referrer" />
                        <span>{name}</span>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}

export default Header

const Wrapper = styled.header`
    width: 100%;
    padding: 28px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgb(38,39,42);
    background-color: rgb(27 28 31);

    h1{
        cursor: pointer;
        color: #fff;
    }

    ul{
        display: flex;
        align-items: center;
        gap: 26px;

        li{
            text-transform: capitalize;
            font-weight: 600;
            color: #9d9999;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img{
                width: 32px;
                border-radius: 50%;
            }

            span{
                font-size: 14px !important;
            }

            &.logout{
                color: red;
            }
        }
    }
`