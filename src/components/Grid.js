import React, { Component } from 'react'
import Box from './Box'
class Grid extends Component {
    render() {
        const width = (this.props.cols * 14) ;
        const rowArr = [];
        let boxClass = "";

        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let boxId = `${i}_${j}`;

                boxClass = this.props.gridFull[i][j]
                    ? "box on"
                    : "box off";

                rowArr.push(<Box
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={i}
                    col={j}
                    selectBox={this.props.selectBox}/>);
            }
        }

        return (
            <div className="grid" style={{
                width: width
            }}>
                {rowArr}
            </div>
        )
    }
}

export default Grid