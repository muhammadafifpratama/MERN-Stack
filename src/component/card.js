import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { connect } from "react-redux"
// import { kirimid } from '../redux/action'
// import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    justifyContent: 'center'
  },
});

const ImgMediaCard = (props) => {
  const classes = useStyles();
  return (
    // <Box border={1}>
    <Card className={classes.root} style={{ flex: 1, padding: 5 }} >
      {/* onClick={() => props.kirimid(props.kucing)} */}
      <CardActionArea>
        <CardMedia
          component="img"
          alt="NOT AVAILABLE"
          height="140"
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.nama}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* </a> */}
      <CardActions classes={{ root: classes.root }}>
        <Button size="small" color="primary" className="button">
          {props.harga}
        </Button>
      </CardActions>
    </Card >
    // </Box>
  );
}

// export default connect(null, { kirimid })(ImgMediaCard)
export default ImgMediaCard;