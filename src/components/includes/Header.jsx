import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../../config/firebase'
import { authActions } from '../store/authSlice'

const Header = () => {
    const name = useSelector(state => state.auth.name)
    const uid = useSelector(state => state.auth.uid)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = ()=>{
        signOut(auth)
        dispatch(authActions.logout())
    }  

    const copyHandler = ()=>{
        navigator.clipboard.writeText(uid)
    }

    return (
        <Wrapper>
            <h1 onClick={e => navigate('/')}>Let's Chat</h1>
            <nav>
                <ul>
                    <li title={uid} onClick={copyHandler}>{name}</li>
                    <li className='logout' onClick={logoutHandler}>logout</li>
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

            &.logout{
                color: red;
            }
        }
    }
`