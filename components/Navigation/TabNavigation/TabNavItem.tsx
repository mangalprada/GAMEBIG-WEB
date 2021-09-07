import { makeStyles, Tab, Theme } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  tabStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
}));

export default function TabNavItem({ href, label }: Props) {
  const styles = useStyles();

  return (
    <Link href={href} passHref>
      <Tab label={label} className={styles.tabStyle} textColor="secondary" />
    </Link>
  );
}
