import React from 'react'
import { Route, Routes } from "react-router-dom";
import PrivateRoute from '../routes/PrivateRoute';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';

const MainRouter = () => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRouter />} />
			<Route path="/*" element={
				<PrivateRoute>
					<AppRouter />
				</PrivateRoute>
			}
			/>
		</Routes>
	);
}

export default MainRouter