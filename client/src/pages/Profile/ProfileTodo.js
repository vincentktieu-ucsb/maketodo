import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Border from '../../components/Border';
import Grid from '@material-ui/core/Grid';
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProfileTodo(props) {
  const classes = useStyles();
  const { user, todoId, taskName, duedate, description, imageUrl, handleDelete, idx } = props;
  let displayDate = new Date(duedate);
  const [expanded, setExpanded] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deleteTodo() {
    enqueueSnackbar("Todo Deleted", {variant: "success"}) 
    axios.delete("/api/todo/" + todoId + "/delete")
      .then((res) => {
        console.log(res);
        console.log("in todo " + idx)
        handleDelete(idx);
      })
      .then((err) => {
        console.log(err);
      })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Border>
              <Avatar aria-label="recipe" className={classes.avatar} src={user.imageUrl} />
          </Border>
        }
        action={
          <CardActions>
            <IconButton
              fontSize="small"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        }
        title={
          <div>
            {user.fullname}{" "}
            <Badge variant="info">NORMIE</Badge>
            <br/>
            {taskName}
          </div>
        }
        subheader={
          displayDate.toDateString()
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <br />
          <Grid container direction="row">
            <div>
              <IconButton>
                <EditIcon color="primary"/>
              </IconButton>
            </div>
            <Modal icon={DeleteIcon} component={
              ({onClose}) => {
                return <Card className="p-2">
                  <h2>Confirm To Delete Todo</h2>
                  <Button fullWidth variant="contained" color="secondary" onClick={() => {deleteTodo(); onClose()}}>Confirm</Button>
                  <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                </Card>
              }
            }/>
          </Grid>
          {/* <Blur img={imageUrl} style={{maxWidth:"400px"}} blurRadius={40}/> */}
          <Image
            style={{maxWidth:"400px"}}
            width="100%"
            src={imageUrl}
          />
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}