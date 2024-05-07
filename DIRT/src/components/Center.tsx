import { ReactNode } from 'react';
import '../styles/Center.css';

interface Props {
	children?: ReactNode;
}
{
	/*Generic styling*/
}
function VerticalCenter({ children = '' }: Props) {
	return <div className="vertical-center">{children}</div>;
}
function HorizontalCenter({ children = '' }: Props) {
	return <div className="horizontal-center">{children}</div>;
}
function ScreenCenter({ children = '' }: Props) {
	return <div className="screen-center">{children}</div>;
}

export { VerticalCenter };
export { HorizontalCenter };
export { ScreenCenter };
