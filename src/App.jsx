// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/css/style.css'
import MainRouter from './components/routers/router/MainRouter'
import { doc, query, where } from 'firebase/firestore'
import app, { db } from './config/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'

function App() {
	// useEffect(() => {
	// 	const ref = collection(db, "ChatRooms")

	// 	const q = query(ref, where("participants", 'array-contains', "user2"),where("isPinned", '==', false))

	// 	onSnapshot(q, (snap) => {
	// 		console.log(snap.docs.map(doc => doc.data()));
	// 	}, (error) => {
	// 		console.log(error.message);
	// 	})
	// }, [])

	return (
		<MainRouter />
	)
}

export default App
