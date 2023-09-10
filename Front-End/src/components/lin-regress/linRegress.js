import { useState, useEffect } from 'react';
import PointsList from '../common/pointsList/pointsList'
import AddPointForm from '../common/addPointForm/addPointForm';
import LinRegressChart from './linRegressChart/linRegressChart';
import LinRegressStats from './linRegressStats/linRegressStats';
import LinRegressBackground from './linRegressBackground/linRegressBackground';
import MLAPIClient from '../../api/mlApiClient';
import useArray from '../../hooks/useArray';
import useToggle from '../../hooks/useToggle';
import useDebounce from '../../hooks/useDebounce';
import { Header } from 'semantic-ui-react';
import './linRegress.css';


export default function LinRegress() {
    const DEBOUNCE_DELAY = 250;
    const [ points, _, pushPoint, removePointAtIndex ] = useArray(
        [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}]
    );
    const [ metadata, setMetadata ] = useState({
        bestFitLine: [],
        m: undefined,
        b: undefined,
        residual: undefined
    });

    const [toggle, flipToggle] = useToggle();
    const debouncedToggle = useDebounce(toggle, DEBOUNCE_DELAY);

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
    }, [debouncedToggle]);

    return (
        <div>
            <Header className='title'
                    size='huge'>
                Linear Regression
            </Header>
            <div className="lin-regress">
                <AddPointForm
                    className='lin-regress__form'
                    points={points}
                    onNewPoint={point => {
                        pushPoint(point);
                        flipToggle();
                    }}
                />
                <PointsList
                    className='lin-regress__points'
                    points={points}
                    deletePoint={i => {
                        removePointAtIndex(i);
                        flipToggle();
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