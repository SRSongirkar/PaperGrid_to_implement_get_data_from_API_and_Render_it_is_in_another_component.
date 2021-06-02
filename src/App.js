/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// import ResponsiveDrawer from './components/drawer.js';
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import FormControl from "@material-ui/core/FormControl";

// import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { DataGrid } from "@material-ui/data-grid";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import axios from "axios";

// const { CanvasJSChart } = CanvasJSReact;

/* const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })); */
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "Time", headerName: "Time", width: 120 },
  { field: "TempVoltage", headerName: "TempVoltage", width: 140 }
];

const rows = [
  { id: 1, Time: 10, TempVoltage: "Jon" },
  { id: 2, Time: 20, TempVoltage: "Cersei" }
];

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 4,
    padding: theme.spacing(3),
    paddingLeft: "20%",
    paddingTop: "0%"
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: 120,
    width: 180,
    boxShadow: "0px 10px 20px 1px"
  },

  text: {
    display: "inline-block",
    padding: "0px",
    margin: "0px",
    marginTop: "-5%",
    color: "white",
    fontWeight: "fontWeightBold"
  }
}));
// const validationSchema = Yup.object().shape({
//     title: Yup.string()
//       .required('Title is required'),

//     equipmentname: Yup.string()
//       .required(' Seelect Equipment Name is required'),

//     selectgraph: Yup.string()
//       .required(' Seelect Type Of Graph is required'),
//   });
//   const {
//     register, handleSubmit, reset, errors,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      // eslint-disable-next-line react/no-unused-state
      loading: true,
      sensorReading: [],
      // templateName: '',
      selectOptions: [],
      checkbox: "",
      name: " ",
      id: "",
      username: "",
      address: "",
      street: "",
      suite: "",
      city: "",
      // isDialogOpen: false,
      openDeleteDialog: false,
      reload: false

      // this.handleChecked=this.handleChecked.bind(this);
    };
    this.handleChecked = this.handleChecked.bind(this);
  }
  changeState = () => {
    this.setState({ checkbox: this.state.name });
  };

  async componentDidMount() {
    this.getOptions();
    const url = "https://jsonplaceholder.typicode.com/users/";
    const response = await axios.get(url);
    // const users=this.setState({users: users});

    console.log(response.data);

    this.setState({ sensorReading: response.data, loading: false });
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  // handleChangeDropdown = (e) => {
  //   this.setState({  name: e.label, id: e.value, sensorsOfSelectedCheckbox: e.username });
  // }
  handleChangeDropdown = (e) => {
    this.setState({
      name: e.label,
      id: e.value,
      username: e.username,
      address: e.address,
      street: e.address.street,
      suite: e.address.suite,
      city: e.address.city
    });
  };

  async getOptions() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users/");
    const { data } = res;

    const options = data.map((d) => ({
      value: d.id,
      label: d.name,
      username: d.username,
      address: d.address,
      street: d.address.street,
      suite: d.address.suite,
      city: d.address.city
    }));

    this.setState({ selectOptions: options });
    console.log(this.state.selectOptions);
  }

  render() {
    // const row = [];
    // this.state.sensorsOfSelectedCheckbox.map((it) => {
    //   row.push({
    //     street: it.street,
    //     suite: it.suite,
    //     city: it.city
    //   });
    // });
    const row = [];
    // eslint-disable-next-line array-callback-return
    this.state.sensorReading.map((it) => {
      row.push({
        id: it.id,
        name: it.name
      });
    });

    var txt;
    if (this.state.isChecked) {
      txt = this.state.username;
    } else {
      txt = "";
    }
    var txt1;
    if (this.state.isChecked) {
      txt1 = this.state.name;
    } else {
      txt1 = "";
    }

    return (
      <div style={{ flexGrow: 4, paddingLeft: "20%", paddingTop: "0%" }}>
        <div style={{ paddingBottom: "1%" }}>
          <Typography variant="h4" noWrap component="div">
            Select Name:-
          </Typography>
        </div>

        <div>
          <form>
            <div className="form-group col-4">
              <Select
                options={this.state.selectOptions}
                onChange={this.handleChangeDropdown}
              />
            </div>
          </form>
        </div>

        <div
          style={{
            display: "flex",
            paddingRight: "5%",
            flexWrap: "wrap",
            paddingLeft: "5%"
          }}
        >
          <div key={row.id}>
            <Grid container className={useStyles.root} spacing={3} item xs={12}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                  {[0].map((value) => (
                    <Grid key={value} item>
                      <Paper
                        className={useStyles.paper}
                        style={{
                          backgroundColor: "#43a047",
                          height: 140,
                          width: 140,
                          boxShadow: "0px 10px 20px 1px",
                          // border: "1px solid white",
                          margin: "8px"
                        }}
                      >
                        <div style={{ marginLeft: "110px" }}>
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name="checkbox"
                                onClick={() => console.log(this.state.name)}
                                id="check"
                              />
                            }
                          />*/}
                          <input
                            type="checkbox"
                            onChange={this.handleChecked}
                          />
                        </div>
                        <Typography
                          align="center"
                          className={useStyles.text}
                          noWrap
                        >
                          <Box
                            fontWeight="fontWeightBold "
                            className={useStyles.text}
                            style={{
                              color: "white",
                              padding: "0px",

                              fontWeight: "fontWeightBold"
                            }}
                          >
                            {/* <h6>{reading.city}</h6>
                            <h6>{reading.street}</h6> */}
                            {/* <h6>{reading.name}</h6>
                            <h6>{reading.id}</h6> */}
                            {/* <h6>{reading.id}</h6> */}
                            <h6>{this.state.username}</h6>
                          </Box>
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <p> {txt}</p>
        <p> {txt1}</p>
      </div>
    );
  }
}
export default App;
