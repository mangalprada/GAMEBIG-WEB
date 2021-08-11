import { ReactChild } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Aux(props: Props) {
  return <>{props.children}</>;
}
