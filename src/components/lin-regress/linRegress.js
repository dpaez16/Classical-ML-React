import React, {Component} from 'react';
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import {LinRegressChart} from './linRegressChart';
import { Container } from 'semantic-ui-react';
import './linRegress.css';


export class LinRegress extends Component {
    constructor() {
        super();
        this.state = {
            points: [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}],
            metadata: {
                pts: [{x: 1, y: 1.33}, {x: 3, y: 3.33}],
                m: 1,
                b: 0.33,
                residual: 0
            },
            toggle: 0
        };
    };

    render() {
        return (
            <Container className="lin-regress">
                <AddPointForm 
                    className='lin-regress__form'
                    points={this.state.points}
                    onNewPoint={
                        point => this.setState({
                            points: [...this.state.points, point]
                        })
                    }
                    updateMetadata={
                        newMetadata => this.setState({
                            metadata: newMetadata,
                            toggle: (this.state.toggle + 1) % 2
                        })
                    }
                />
                <Points 
                    className='lin-regress__points'
                    points={this.state.points}
                    toggle={this.state.toggle}
                    deletePoint={
                        i => this.setState({
                                points: this.state.points.filter((_, idx) => i !== idx),
                                toggle: (this.state.toggle + 1) % 2
                            })
                    }
                />
                <LinRegressChart
                    className='lin-regress__chart'
                    points={this.state.points}
                    metadata={this.state.metadata}
                    toggle={this.state.toggle}
                />
            </Container>
        );
    }
};