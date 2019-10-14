import React, { Component } from 'react';

export class Goals extends Component {
  static displayName = Goals.name;

  constructor(props) {
    super(props);
    this.state = { goal: 0, current: 0};
    this.setCalorieLimit = this.setCalorieLimit.bind(this);
    this.getCurrentCalorie = this.getCurrentCalorie.bind(this);
    // this.getCurrentCalorie();

  }

  setCalorieLimit() {



  }

  async getCurrentCalorie() {
    const response = await fetch('goals');
    const data = await response.json();
    console.log(data);
    this.setState({ current: data.totalCalories });

  }

  render()
  {
    return (

      <div>
        <h1>Set New Goal</h1>


        <input />
        <button className="btn btn-primary" onClick={this.setCalorieLimit}>Set New Goal</button>
        <div>
          <div>Current Calories: {this.state.current}</div>
        </div>
      </div>


    );
  }
}
