import { CSSProperties, ReactNode } from 'react';
import '../styles/Popup.css';
import '../styles/Center.css';
import { ScreenCenter } from './Center';

interface Props {
	children?: ReactNode;
	style?: CSSProperties;
}

export default function Popup({ children = '', style = {} }: Props) {
	return (
		<div className="popup" style={style}>
			<ScreenCenter>{children}</ScreenCenter>
		</div>
	);
}
