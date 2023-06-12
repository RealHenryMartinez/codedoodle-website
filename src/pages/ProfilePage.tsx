import { ICard } from "interfaces/IHome.js";
import { useNavigate } from "react-router-dom";
import {ProfileCard} from "../components/profile/profileCard.js";
import { handleLogout} from "../hooks/useAuth.js";
import { useCard } from "../hooks/useCard.js";
import { useAppSelector } from "../store/hook.js";
import { user } from "../store/slices/authSlice.js";
import "../styles/profile/profile.css";
 
export const ProfilePage = () => {
	const userInfo = useAppSelector(user);
	const {cards, removeCard} = useCard();
	console.log(cards)
	const userCards: ICard[] = cards.filter((card: ICard) => card.userId === userInfo._id)
	console.log(userCards)
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
			{userCards.map((card: any, index) => (
					<ProfileCard key={index} card={card} remove={removeCard} user={card.user}/>
				))}
			</div>
			
		</div>
	);
};
