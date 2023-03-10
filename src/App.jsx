import { onMessage } from 'firebase/messaging'
import { useEffect } from 'react'
import './assets/css/style.css'
import MainRouter from './components/routers/router/MainRouter'
import { messaging } from './config/firebase'

function App() {
	
	useEffect(() => {
		onMessage(messaging,(message)=>{
			console.log({
				from : message.from,
				body :message.notification.body,
				icon :message.notification.icon,
				title :message.notification.title,
				image :message.notification.image,
			})
		})

	})

	return (
		<MainRouter />
	)
}

export default App
