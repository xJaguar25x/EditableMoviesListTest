import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: "10px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
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
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2),
    },
}));

const marks = [
    {value: 0, label: 0},
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
    {value: 6, label: 6},
    {value: 7, label: 7},
    {value: 8, label: 8},
    {value: 9, label: 9},
    {value: 10, label: 10},
];

export default function MovieForm(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [values, setValues] = React.useState({
        name: '',
        directors_name: '',
        duration: '',
        rating: 0,
        released_date: '',
    });
    const [errorInput, setErrorInput] = React.useState(false);

    const handleChange = (prop) => (event, newValue) => {
        setValues({...values, [prop]: event.target.value || newValue});
    };

    const handleSubmit = () => {
        props.handleMovieAdd(values);
        handleExpandClick();
    };

    const handleBlur = () => {
        if (values.name === '') {
            setErrorInput(true);
        } else {
            setErrorInput(false);
        }
    };

    return (
      <Card className={classes.root}>
          <CardHeader
            title="Add new movie"
            action={<IconButton
              className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
                <ExpandMoreIcon/>
            </IconButton>}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                  <form className={classes.form} noValidate autoComplete="off">
                      <TextField
                        className={clsx(classes.margin)}
                        id="standard-basic"
                        label="Name"
                        value={values.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur}
                        required
                        error={errorInput}
                      />
                      <TextField
                        className={clsx(classes.margin,)}
                        id="standard-basic"
                        label="Director"
                        value={values.directors_name}
                        onChange={handleChange('directors_name')}
                      />
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                          <InputLabel htmlFor="standard-adornment-released_date">Released date</InputLabel>
                          <Input
                            id="standard-adornment-released_date"
                            type="number"
                            value={values.released_date}
                            onChange={handleChange('released_date')}
                            endAdornment={<InputAdornment position="end">Year</InputAdornment>}
                            aria-describedby="standard-released_date-helper-text"
                            inputProps={{
                                'aria-label': 'released_date',
                            }}
                          />
                      </FormControl>
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                          <InputLabel htmlFor="standard-adornment-duration">Duration</InputLabel>
                          <Input
                            id="standard-adornment-duration"
                            value={values.duration}
                            type="number"
                            onChange={handleChange('duration')}
                            endAdornment={<InputAdornment position="end">Min</InputAdornment>}
                            aria-describedby="standard-duration-helper-text"
                            inputProps={{
                                'aria-label': 'duration',
                            }}
                          />
                      </FormControl>
                      <Typography id="discrete-slider-custom" gutterBottom>Rating</Typography>
                      <Slider
                        defaultValue={0}
                        aria-labelledby="discrete-slider-custom"
                        step={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={10}
                        value={values.rating}
                        onChange={handleChange('rating')}
                      />
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSubmit}
                        startIcon={<SaveIcon/>}
                        disabled={!values.name}
                      >
                          Save
                      </Button>
                  </form>
              </CardContent>
          </Collapse>
      </Card>
    );
}
