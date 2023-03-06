import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import googleIcon from "../../assets/images/google.png"
import { auth, googleProvider } from '../../config/firebase'
import { authActions } from "../store/authSlice"



const Login = (e) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const LoginHandler = () => {
		
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				
				result.user.getIdToken().then(res => {
					const userData = {
						name: result.user.displayName,
						email: result.user.email,
						uid: result.user.uid,
						isAuthenticated:true,
						image: result.user.photoURL
					}
					dispatch(authActions.login(userData))
					navigate(searchParams.get("next") ? searchParams.get("next") : '/')
				})
			})
			.catch(err => {
				console.log(err);
			})
	}
	return (
		<Wrapper>
			<Header>Let's Chat</Header>
			<LoginSection>
				<p>Continue by login with your Google account</p>
				<span onClick={LoginHandler}>
					<img src={googleIcon} alt="google icon" />
				</span>
			</LoginSection>
		</Wrapper>
	)
}

export default Login

const Wrapper = styled.section`
  width:1300px;
  height: 80vh;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Header = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #111;
  margin: 42px 0;
  text-align: center;
`
const LoginSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span{
	width: 45px;
	display: inline-block;
	margin: 80px;
	cursor: pointer;
	img{
		width: 100%;
	}
  }
`