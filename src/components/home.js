import React, { Component } from 'react';
import API from '../utils/API';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { currentCalories: 0, currentExercise: 0, newCalories: 0, newExercise: 0, totalCalories: 0, caloriesByTime: 0};
    this.addCalories = this.addCalories.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.onExerciseChange = this.onExerciseChange.bind(this);
    this.onCalorieChange = this.onCalorieChange.bind(this);
    this.saveCalorieLog = this.saveCalorieLog.bind(this);
    this.getCaloriesByTime = this.getCaloriesByTime.bind(this);
  }



  addCalories() {
    this.setState({
      currentCalories: this.state.currentCalories + this.state.newCalories,
      totalCalories: this.state.totalCalories + this.state.newCalories,
      newCalories: 0
    });


  }

  addExercise() {
    this.setState({
      currentExercise: this.state.currentExercise + this.state.newExercise,
      totalCalories: this.state.totalCalories - this.state.newExercise,
      newExercise: 0,
    })



  }

  async getCaloriesByTime(time) {
    const params = {
      "time": time
    };

    await API.get('/TotalCalories', {params: params })
      .then(result => {this.setState({caloriesByTime: Number(result["data"]["total"])});
      console.log(result)} )
      .catch(error => console.log(error))
  }


  async saveCalorieLog() {
    console.log(this.state.totalCalories);
    await API.post('/TotalCalories', {"calories" : this.state.totalCalories, "createdAt": new Date()})
      .then(result => {
        window.alert('Logged Successfully');
        this.setState({totalCalories: 0});
      })
      .catch(error => window.alert('Oops something went wrong'));



  }

  onExerciseChange = (e) => this.setState({ newExercise: Number(e.target.value) });
  onCalorieChange = (e) => this.setState({ newCalories: Number(e.target.value) });

  render () {
    return (
      <div className="row">
        <div className="col-6">
        <h1>Today's Stats</h1>
        <div className="col-6">
          <div>Current Calories</div>
          <div>{this.state.currentCalories} Calories</div>
          <input onChange={this.onCalorieChange} value={this.state.newCalories}/>
          <button className="btn btn-primary" onClick={this.addCalories}>Add Calories</button>

        </div>
        <div className="col-6">
          <div>Current Exercise</div>
          <div> -{this.state.currentExercise} Calories</div>
          <input onChange={this.onExerciseChange} value={this.state.newExercise} />
          <button className="btn btn-primary" onClick= {this.addExercise} >Add Exercise</button>
        </div>
        <div className="row"> </div>
        <div className="col-12">
          <h2>Calories of the day</h2>
          <h3>{this.state.totalCalories}</h3>
        </div>

        <button className="btn btn-primary" onClick={this.saveCalorieLog}>Complete Food Calorie Log</button>
        </div>
        <div className="col-6">
          <h1>Totals</h1>
          <div className="flex flex-row justify-content-between">
            <button onClick={() => this.getCaloriesByTime('day')} className="btn btn-primary mr-1">Day</button>
            <button onClick={() => this.getCaloriesByTime('week')} className="btn btn-primary mr-1">Week</button>
            <button onClick={() => this.getCaloriesByTime('month')} className="btn btn-primary mr-1">Month</button>
            <button onClick={() => this.getCaloriesByTime('year')} className="btn btn-primary mr-1">Year</button>
          </div>
          <div>
            <div>Total Calories: {this.state.caloriesByTime}</div>
          </div>
        </div>
      </div>
    );
  }
}
