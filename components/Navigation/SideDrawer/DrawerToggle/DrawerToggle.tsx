import classes from './DrawerToggle.module.scss';

type Props = {
  clicked: () => void;
};

export function DrawerToggle({ clicked }: Props) {
  return (
    <div className={classes.DrawerToggle} onClick={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
