import { useNavigate } from "react-router-dom";
import {ProfileCard} from "../components/profile/profileCard.js";
import { handleLogout, useAuth } from "../hooks/useAuth.js";
import { useCard } from "../hooks/useCard.js";
import { useAppSelector } from "../store/hook.js";
import { user } from "../store/slices/authSlice.js";
import "../styles/profile/profile.css";

export const ProfilePage = () => {
	const userInfo = useAppSelector(user);
	const {cards, removeCard} = useCard();
	const navigate = useNavigate();
	const handleUser = () => {
		handleLogout();
		navigate('/auth/login');
	}
	
	return (
		<div>
			<div id="user-card">
				<h1>{userInfo.firstName + " " + userInfo.lastName}</h1>
				<p>{userInfo.email}</p>
				<button onClick={handleUser}>Log Out</button>
			</div>
			<div id="post-component">
			{cards.map((card: any, index) => (
					<ProfileCard key={index} card={card} remove={removeCard} user={card.user}/>
				))}
			</div>
			
		</div>
	);
};
