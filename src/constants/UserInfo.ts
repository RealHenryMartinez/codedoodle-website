import { useAppSelector } from "../store/hook.js";
import { user } from "../store/slices/authSlice.js";



let userInfo;

const UserInfo = () => {
	userInfo = useAppSelector(user);

};
UserInfo();

export default userInfo;
