import React, {Component} from 'react';
import Points from './points/points'
import {AddPointForm} from './addPointForm/addPointForm';
import {KMeansChart} from './kmeansChart/kmeansChart';
import {KMeansBackground} from './kmeansBackground/kmeansBackground';
import {KMeansSlider} from './kmeansSlider/kmeansSlider';
import { Header } from 'semantic-ui-react';
import './kmeans.css';


const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'green',
    'sienna',
    'peachpuff',
    'purple',
    'pink',
    'turquoise'
];

export class KMeans extends Component {
    constructor() {
        super();
        this.state = {
            points: [{x: 1, y: 2, label: 0}, {x: 2, y: 1, label: 0}, {x: 3, y: 4, label: 0}],
            k: 1,
            centroids: [{x: 2.0, y: 2.3333333333333335, label: 0}],
            toggle: 0
        };
    };

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'
                >
                    K-Means
                </Header>
                <div className="kmeans">
                    <AddPointForm 
                        points={this.state.points}
                        onNewPoint={
                            point => this.setState({
                                points: [...this.state.points, point]
                            })
                        }
                        updateData={
                            outputData => this.setState({
                                centroids: outputData.centroids,
                                points: outputData.points,
                                toggle: (this.state.toggle + 1) % 2
                            })
                        }
                        k={this.state.k}
                    />
                    <KMeansSlider 
                        k={this.state.k}
                        updateK={
                            newK => this.setState({
                                k: newK
                            })
                        }
                        maxColors={colors.length}
                    />
                    <Points 
                        points={this.state.points}
                        deletePoint={
                            i => this.setState({
                                    points: this.state.points.filter((_, idx) => i !== idx),
                                    toggle: (this.state.toggle + 1) % 2
                                })
                        }
                    />
                    <KMeansChart 
                        points={this.state.points}
                        centroids={this.state.centroids}
                        colors={colors}
                    />
                </div>
                <hr></hr>
                <KMeansBackground />
            </div>
        );
    }
};