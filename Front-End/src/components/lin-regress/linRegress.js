import { useState } from 'react';
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import {LinRegressChart} from './linRegressChart';
import {LinRegressBackground} from './linRegressBackground';
import { Header } from 'semantic-ui-react';
import './linRegress.css';


export default function LinRegress() {
    const [ points, setPoints ] = useState([{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}]);
    const [ metadata, setMetadata ] = useState({
        bestFitLine: [{x: 1, y: 1.33}, {x: 3, y: 3.33}],
        m: 1,
        b: 0.33,
        residual: 2.67
    });
    const [ toggle, setToggle ] = useState(0);

    return (
        <div>
            <Header className='title'
                    size='huge'>
                Linear Regression
            </Header>
            <div className="lin-regress">
                <AddPointForm 
                    points={points}
                    onNewPoint={point => setPoints([...points, point])}
                    updateMetadata={newMetadata => {
                        setMetadata(newMetadata);
                        setToggle((toggle + 1) % 2);
                    }}
                />
                <Points 
                    points={points}
                    toggle={toggle}
                    deletePoint={i => {
                        setPoints(points.filter((_, idx) => i !== idx));
                        setToggle((toggle + 1) % 2);
                    }}
                />
                <LinRegressChart
                    points={points}
                    bestFitLine={metadata.bestFitLine}
                />
                <Header className='lin-regress__stats'
                        size='small'
                >
                    Slope of Line: {metadata.m}
                    <br />
                    Intercept: {metadata.b}
                    <br />
                    Total Residual: {metadata.residual}
                </Header>
            </div>
            <hr></hr>
            <LinRegressBackground />
        </div>
    );
};