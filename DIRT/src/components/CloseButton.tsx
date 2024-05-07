import '../styles/CloseButton.css';

interface Props {
	onClick?: () => void;
}
{
	/*Self explanatory - onclick exits the component*/
}
export default function CloseButton({ onClick = () => {} }: Props) {
	return (
		<div
			className="close-button"
			onClick={onClick}
		></div>
	);
}
