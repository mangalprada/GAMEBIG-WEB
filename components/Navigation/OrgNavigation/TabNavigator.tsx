import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Tabs } from '@material-ui/core';
import TabNavItem from './TabNavItem';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: 20,
  },
  tabIndicator: {
    backgroundColor: grey[500],
  },
}));

interface Props {
  tabNumber: number;
}

export default function TabNavigator({ tabNumber }: Props) {
  const styles = useStyles();

  let id = 1;

  return (
    <div className={styles.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={tabNumber}
          classes={{ indicator: styles.tabIndicator }}
        >
          <TabNavItem label="Events" href={`/organization/${id}/tournaments`} />
          <TabNavItem label="About" href={`/organization/${id}`} />
        </Tabs>
      </AppBar>
    </div>
  );
}
