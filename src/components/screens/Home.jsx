import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Let's Chat</title>
			</Helmet>
			<Wrapper>
				<h1>Select a user and start chating</h1>
			</Wrapper>
		</>
	)
}

export default Home

const Wrapper = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border: 1px solid rgb(38,39,42);
	background-color: rgb(27 28 31);

	h1{
		color: rgb(157 153 153);
	}
`