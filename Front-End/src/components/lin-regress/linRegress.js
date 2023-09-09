import { useState, useEffect } from 'react';
import Points from './points/points'
import AddPointForm from './addPointForm/addPointForm';
import LinRegressChart from './linRegressChart/linRegressChart';
import LinRegressBackground from './linRegressBackground/linRegressBackground';
import MLAPIClient from '../../api/mlApiClient';
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

    useEffect(() => {
        MLAPIClient.fetchLinearRegression(points)
        .then(newMetadata => {
            setMetadata({
                ...metadata,
                ...newMetadata
            });
        })
        .catch(err => {
            console.log(err);
        });
    }, [points]);

    return (
        <div>
            <Header className='title'
                    size='huge'>
                Linear Regression
            </Header>
            <div className="lin-regress">
                <AddPointForm 
                    points={points}
                    onNewPoint={point => {
                        setPoints([...points, point]);
                    }}
                />
                <Points 
                    points={points}
                    deletePoint={i => {
                        setPoints(points.filter((_, idx) => i !== idx));
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