import styles from './DrawerToggle.module.scss';

type Props = {
  clicked: () => void;
};

export function DrawerToggle({ clicked }: Props) {
  return (
    <div className={styles.DrawerToggle} onClick={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
