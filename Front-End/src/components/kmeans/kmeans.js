import {useState, useEffect} from 'react';
import PointsList from '../common/pointsList/pointsList';
import AddPointForm from '../common/addPointForm/addPointForm';
import CentroidChart from '../common/centroidChart/centroidChart';
import KMeansBackground from './kmeansBackground/kmeansBackground';
import KMeansSlider from './kmeansSlider/kmeansSlider';
import MLAPIClient from '../../api/mlApiClient';
import { Header } from 'semantic-ui-react';
import useArray from '../../hooks/useArray';
import useToggle from '../../hooks/useToggle';
import useDebounce from '../../hooks/useDebounce';
import './kmeans.css';

const KMEANS_COLORS = [
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

export default function KMeans() {
    const DEBOUNCE_DELAY = 250;
    const [points, setPoints, pushPoint, deletePointAtIndex] = useArray([{x: 1, y: 2, label: 0}, {x: 2, y: 1, label: 0}, {x: 3, y: 4, label: 0}]);
    const [k, setK] = useState(1);
    const [centroids, setCentroids] = useState([]);
    const [toggle, flipToggle] = useToggle();
    const debouncedToggle = useDebounce(toggle, DEBOUNCE_DELAY);

    useEffect(() => {
        MLAPIClient.fetchKMeans(points, k)
        .then(newMetadata => {
            setCentroids(newMetadata.centroids);
            setPoints(newMetadata.points);
        })
        .catch(err => {
            console.log(err);
        });
    }, [debouncedToggle]);

    return (
        <div>
            <Header className='title'
                    size='huge'
            >
                K-Means
            </Header>
            <div className="kmeans">
                <AddPointForm
                    className='kmeans__form' 
                    points={points}
                    onNewPoint={point => {
                        pushPoint(point);
                        flipToggle();
                    }}
                />
                <KMeansSlider 
                    k={k}
                    updateK={newK => {
                        setK(newK);
                        flipToggle();
                    }}
                    maxColors={KMEANS_COLORS.length}
                />
                <PointsList 
                    className='kmeans__points'
                    points={points}
                    deletePoint={i => {
                        deletePointAtIndex(i);
                        flipToggle();
                    }}
                />
                <CentroidChart
                    className='kmeans__chart' 
                    points={points}
                    centroids={centroids}
                    colors={KMEANS_COLORS}
                />
            </div>
            <hr></hr>
            <KMeansBackground />
        </div>
    );
};