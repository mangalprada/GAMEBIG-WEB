import styles from './Backdrop.module.scss';

type Props = {
  show: boolean;
  clicked: () => void;
};

export default function Backdrop({ show, clicked }: Props) {
  return (
    <>
      {show ? <div className={styles.Backdrop} onClick={clicked}></div> : null}
    </>
  );
}
