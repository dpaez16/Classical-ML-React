import { useState, useEffect } from 'react';
import Points from './points/points'
import AddPointForm from './addPointForm/addPointForm';
import LinRegressChart from './linRegressChart/linRegressChart';
import LinRegressStats from './linRegressStats/linRegressStats';
import LinRegressBackground from './linRegressBackground/linRegressBackground';
import MLAPIClient from '../../api/mlApiClient';
import { Header } from 'semantic-ui-react';
import './linRegress.css';


export default function LinRegress() {
    const [ points, setPoints ] = useState([{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}]);
    const [ metadata, setMetadata ] = useState({
        bestFitLine: [],
        m: undefined,
        b: undefined,
        residual: undefined
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
                <LinRegressStats metadata={metadata} />
            </div>
            <hr></hr>
            <LinRegressBackground />
        </div>
    );
};