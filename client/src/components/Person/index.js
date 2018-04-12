import React from 'react'
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Avatar from 'react-user-avatar';

const styles = () => ({
  person: ({
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTop: '1px solid rgba(0,0,0,0.2)',
    '&:first-child': {
      borderTop: 'none',
    }
  })
})

export default withStyles(styles)(({ person, primary, secondary, action, classes, ...props }) =>
<ListItem className={classes.person} {...props}>
  {
    person ?
    <Avatar style={{color: '#fff'}} size={'3em'} name={person.username || '.'} src={person.avatar} /> :
    <div/>
  }
  <ListItemText
    primary={primary}
    secondary={secondary ? secondary : null}
  />
  <div onClick={ev => ev.stopPropagation()}>
    { action }
  </div>
</ListItem>)
