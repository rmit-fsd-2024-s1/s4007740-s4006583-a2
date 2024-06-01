import { HorizontalCenter } from '../../components/Center';
import EditImg from '../../assets/edit.png';
import '../../styles/EditProfile.css';
import { getUser, removeUser } from '../../data/repository';
import EditProfileForm from '../../components/EditProfileForm';
import { useEffect, useState } from 'react';
import DeleteProfileForm from '../../components/DeleteProfileForm';
import UserDataService from '../../data/UserService';

export default function EditProfile() {
	const [userInfo, setUserInfo] = useState({
		email: '',
		name: '',
		password_hash: '',
		doj: '',
	});
	const [editProfileVisible, setEditProfileVisible] = useState(false);
	const [deleteProfileVisible, setDeleteProfileVisible] = useState(false);

	useEffect(() => {
		async function getUserInfo() {
			const userInfo = getUser();
			if (userInfo !== null) {
				const user = await UserDataService.getUserFromUUID(userInfo);
				if (user !== null) {
					setUserInfo(user);
				} else {
					alert('User no longer exists');
					removeUser();
					location.assign('/');
				}
			} else {
				alert('Must be logged in to use this page');
			}
		}
		getUserInfo();
	}, []);
	//password variable {userInfo.password_hash}
	return (
		<>
			<div className="EditProfile">
				<h1>Account Information</h1>
				<div className="profile-container">
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Name</p>
						<p>{userInfo.name}</p>
					</div>
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Email</p>
						<p>{userInfo.email}</p>
					</div>
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Password</p>
						<p className="password-text">Password hidden</p>
					</div>
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Date Joined</p>
						<p>{userInfo.doj}</p>
					</div>
					<div>
						<button
							className="edit-btn"
							onClick={() => {
								setEditProfileVisible(true);
							}}
						>
							Edit Profile
						</button>
						<button
							className="delete-btn"
							onClick={() => {
								setDeleteProfileVisible(true);
							}}
						>
							Delete Profile
						</button>
					</div>
				</div>
			</div>
			<EditProfileForm
				visible={editProfileVisible}
				onExitClick={() => {
					setEditProfileVisible(false);
				}}
			/>
			<DeleteProfileForm
				visible={deleteProfileVisible}
				onExitClick={() => {
					setDeleteProfileVisible(false);
				}}
			/>
		</>
	);
}
