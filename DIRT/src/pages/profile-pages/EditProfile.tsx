import { HorizontalCenter } from '../../components/Center';
import EditImg from '../../assets/edit.png';
import '../../styles/EditProfile.css';
import { findUserData, getUser } from '../../data/repository';
import EditProfileForm from '../../components/EditProfileForm';
import { useState } from 'react';
import DeleteProfileForm from '../../components/DeleteProfileForm';

export default function EditProfile() {
	const [editProfileVisible, setEditProfileVisible] = useState(false);
	const [deleteProfileVisible, setDeleteProfileVisible] = useState(false);

	return (
		<>
			<div className="EditProfile">
				<h1>Account Information</h1>
				<div className="profile-container">
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Name</p>
						<p>{findUserData(getUser() + '')?.name}</p>
					</div>
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Email</p>
						<p>{findUserData(getUser() + '')?.username}</p>
					</div>
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Password</p>
						<p className="password-text">
							{findUserData(getUser() + '')?.password}
						</p>
					</div>
					<div className="AccountDetail">
						<p style={{ fontSize: '12px' }}>Date Joined</p>
						<p>{findUserData(getUser() + '')?.dateJoined}</p>
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
