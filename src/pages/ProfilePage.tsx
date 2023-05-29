import { useAppSelector } from "../store/hook.js"
import { user } from "../store/slices/authSlice.js"
import '../styles/profile/profile.css'

export const ProfilePage = () => {
    const userInfo = useAppSelector(user)
  return (
    <div id="user-card">
        <h1>{userInfo.firstName + " " + userInfo.lastName}</h1>
        <p>{userInfo.email}</p>
    </div>
  )
}
