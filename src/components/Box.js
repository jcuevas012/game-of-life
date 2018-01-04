import React, {Component} from 'react';

class Box extends Component {
    state = {}

    onSelectBox = () => {
        this
            .props
            .selectBox(this.props.row, this.props.col);
    }
    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.boxId}
                onClick={this.onSelectBox}></div>
        );
    }
}

export default Box