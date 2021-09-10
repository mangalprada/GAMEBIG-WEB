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
  tabs: Array<{ label: string; href: string }>;
}

export default function TabNavigator({ tabNumber, tabs }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={tabNumber}
          classes={{ indicator: classes.tabIndicator }}
        >
          {tabs.map((tab) => (
            <TabNavItem key={tab.label} label={tab.label} href={tab.href} />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
