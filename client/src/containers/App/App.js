import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import blue from '@material-ui/core/colors/blue';
import Typography from "@material-ui/core/Typography";
import {SimpleCard, MovieForm} from "../index";

const color = blue[50];
const style = {
    display: "flex",
    flexFlow: "column nowrap",
    backgroundColor: color
};

export default class App extends Component {
    state = {
        movies: [
            {
                name: "123",
                directors_name: "13",
                duration: "1:23",
                rating: 5,
                released_date: 2005
            },
        ]
    };

    componentDidMount() {
        fetch('http://localhost:5000/api/movies')
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    ...this.state,
                    movies: result
                });
            },
            (error) => {
                this.setState({
                    ...this.state,
                    error
                });
            }
          )
          .catch(
            (error) => {
                this.setState({
                    ...this.state,
                    error
                });
            });

    };

    handleMovieDelete = (movieID) => {
        fetch(`http://localhost:5000/api/movies/${movieID}`, {method: "delete"})
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    ...this.state,
                    movies: this.state.movies.filter(item => item._id !== movieID),
                    request: result.msg
                });
            },
            (error) => {
                this.setState({
                    ...this.state,
                    error: error
                });
            }
          )
          .catch(
            (error) => {
                this.setState({
                    ...this.state,
                    error: error
                });
            });
    };

    handleMovieAdd = (newMovie) => {
        const data = JSON.stringify(newMovie);
        console.log("data: ", data);
        fetch(`http://localhost:5000/api/movies`,
          {
              method: "post",
              headers: {"content-type": "application/json"},
              body: data
          })
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    ...this.state,
                    movies: [
                        ...this.state.movies,
                        result
                    ]
                });
            },
            (error) => {
                this.setState({
                    ...this.state,
                    error: error
                });
            }
          )
          .catch(
            (error) => {
                this.setState({
                    ...this.state,
                    error: error
                });
            });
    };

    render() {
        const {movies} = this.state;
        return (
          <div className="App">
              <Container maxWidth="sm">
                  <Typography component="div" style={style}>
                      <MovieForm handleMovieAdd={this.handleMovieAdd}/>
                      {movies.constructor === Array ?
                        movies.map((item, index) => (
                          <SimpleCard
                            key={index}
                            movie={item}
                            handleMovieDelete={this.handleMovieDelete}
                          />
                        )) : null}
                  </Typography>
              </Container>
          </div>
        );
    }
};
