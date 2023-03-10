import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../includes/Header'
import AddContact from '../../includes/modal/AddContact'
import Profile from '../../includes/modal/Profile'
import Sidebar from '../../includes/Sidebar'
import ChatRoom from '../../screens/ChatRoom'
import Home from '../../screens/Home'

const AppRouter = () => {
	const isVerified = useSelector(state => state.auth.isVerified)
	const [showProfile, setShow] = useState(false)
	const [addToContact, setContact] = useState(false)

	const profileCloseHandler = () => {
		setShow(false)
	}

	const addToContactCloseHandler = () => {
		setContact(false)
	}

	return (
		<Wrapper>
			{(!isVerified || showProfile) && (
				<Profile closeHandler={profileCloseHandler} />
			)}
			{addToContact && <AddContact closeHandler={addToContactCloseHandler} />}
			<Header setShow={setShow} />
			<ContentWrapper>
				<SideNav>
					<Sidebar setContact={setContact} />
				</SideNav>
				<Content>
					<Routes>
						<Route path='' element={<Home />} />
						<Route path='chat/:roomId' element={<ChatRoom />} />
					</Routes>
				</Content>
			</ContentWrapper>
		</Wrapper>
	)
}

export default AppRouter

const Wrapper = styled.section`
	background-color: #161619;
	padding: 12px;
	min-height: 100vh;
`
const ContentWrapper = styled.section`
	margin-top: 12px;
	display: flex;
	gap: 12px;
`

const SideNav = styled.aside`
	width: 22%;
	height: calc(100vh - 146px);
	border: 1px solid rgb(38,39,42);
	background-color: rgb(27 28 31);

	@media all and (max-width:980px){
		width:28%;
	}
`
const Content = styled.main`
	width: 78%;

	@media all and (max-width:980px){
		width:72%;
	}
`