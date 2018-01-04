import React, { Component } from 'react';
import Grid from './Grid'
import Buttons from './Buttons'


class Main extends Component {

    constructor(props) {
        super(props);
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
        this.buildArray = this.buildArray.bind(this);

        this.state = {
            generation: 0,
            gridFull: this.buildArray()
        }
    }

    buildArray()  {
        return Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    }

    selectBox = (row, col) => {
        let gridCopy = this.this.this.arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({gridFull: gridCopy});
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
        clearInterval(this.intervalId)
    }
    play = () => {
        let g = this.state.gridFull;
        let g2 = this.arrayClone(this.state.gridFull);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;
                if (i > 0) 
                    if (g[i - 1][j]) 
                        count++;
            if (i > 0 && j > 0) 
                    if (g[i - 1][j - 1]) 
                        count++;
            if (i > 0 && j < this.cols - 1) 
                    if (g[i - 1][j + 1]) 
                        count++;
            if (j < this.cols - 1) 
                    if (g[i][j + 1]) 
                        count++;
            if (j > 0) 
                    if (g[i][j - 1]) 
                        count++;
            if (i < this.rows - 1) 
                    if (g[i + 1][j]) 
                        count++;
            if (i < this.rows - 1 && j > 0) 
                    if (g[i + 1][j - 1]) 
                        count++;
            if (i < this.rows - 1 && this.cols - 1) 
                    if (g[i + 1][j + 1]) 
                        count++;
            if (g[i][j] && (count < 2 || count > 3)) 
                    g2[i][j] = false;
                if (!g[i][j] && count === 3) 
                    g2[i][j] = true;
                }
            }

        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        })
    }

    seed = () => {
        let gridCopy = this.arrayClone(this.state.gridFull)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true
                }
            }
        }
        this.setState({gridFull: gridCopy})
    }

    fast = () => {
        this.seed = 100;
        this.playButton();
    }

    slow = () => {
        this.speed = 1000;
        this.playButton()
    }

    clear = () => {
        let grid  = this.buildArray()
        this.setState({
            gridFull: grid,
            generation: 0
        })
    }

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 20;
                this.rows = 10
            break;
            case "2":
                this.cols = 50;
                this.rows = 30;
            break;
            default:
                this.cols = 70;
                this.rows = 50;
        }
        this.clear()
    }

    render() {
        return (
            <div>
                <h1>Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    seed={this.seed}
                    clear={this.clear}
                    fast={this.fast}
                    gridSize={this.gridSize}/>
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}/>
                <h2>Generation {this.state.generation}</h2>
            </div>
        )
    }

    arrayClone = (arr) => {
        return JSON.parse(JSON.stringify(arr))
    }
}



export default Main