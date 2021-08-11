import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.scss';

type Props = {
  open: boolean;
  closed: () => void;
};

export default function SideDrawer(props: Props) {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>DLord</div>
        <nav>
          <NavigationItems clicked={props.closed} />
        </nav>
      </div>
    </Aux>
  );
}
