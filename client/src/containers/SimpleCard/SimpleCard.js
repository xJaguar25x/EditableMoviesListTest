import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: "10px"
    },
    content: {
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "flex-start"
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const {movie} = props;
    return (
      <Card key={movie._id} className={classes.root}>
          <CardHeader
            action={
                <IconButton aria-label="show more" onClick={() => props.handleMovieDelete(movie._id)}>
                    <DeleteForeverIcon color="secondary"/>
                </IconButton>
            }
            title={movie.name}
            subheader={movie.released_date}
          />
          <CardContent className={classes.content}>
              <Typography color="textPrimary">
                  Director: {movie.directors_name}
              </Typography>
              <Typography color="textPrimary">
                  Duration: {movie.duration} мин.
              </Typography>
              <Typography color="textPrimary">
                  Rating: {movie.rating}
              </Typography>
          </CardContent>
      </Card>
    );
}
