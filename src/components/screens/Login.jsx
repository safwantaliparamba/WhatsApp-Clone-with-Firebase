import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import googleIcon from "../../assets/images/google.png"
import { auth, db, googleProvider } from '../../config/firebase'
import { authActions } from "../store/authSlice"



const Login = (e) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const LoginHandler = () => {
		const next = searchParams.get("next") ? searchParams.get("next") : '/'

		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const userData = {
					email: result.user.email,
					uid: result.user.uid,
					isAuthenticated: true,
					image: result.user.photoURL,
					phone: 9876543210,
					isVerified: false,
				}

				const ref = doc(db, "Users", result.user.uid)

				getDoc(ref)
					.then(user => {
						console.log(user.exists());
						if (!user.exists()) {
							const data = {
								phone: 0,
								userId: result.user.uid,
								isVerified: false,
								name: result.user.displayName
							}
							setDoc(ref, data)
							dispatch(authActions.login({ ...userData, ...data }))
							navigate(next)
						} else {
							console.log(user.data());
							dispatch(authActions.login({ ...userData, ...user.data() }))
							navigate(next)
						}
					})
					.catch((err) => {
						console.log(err);
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