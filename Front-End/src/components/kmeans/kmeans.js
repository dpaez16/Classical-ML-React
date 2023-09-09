import {useState, useEffect} from 'react';
import Points from '../lin-regress/points/points' // TODO: refactor
import AddPointForm from '../lin-regress/addPointForm/addPointForm'; // TODO: refactor
import KMeansChart from './kmeansChart/kmeansChart';
import KMeansBackground from './kmeansBackground/kmeansBackground';
import KMeansSlider from './kmeansSlider/kmeansSlider';
import MLAPIClient from '../../api/mlApiClient';
import { Header } from 'semantic-ui-react';
import useArray from '../../hooks/useArray';
import useToggle from '../../hooks/useToggle';
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

export function KMeans() {
    const [points, setPoints, pushPoint, deletePointAtIndex] = useArray([{x: 1, y: 2, label: 0}, {x: 2, y: 1, label: 0}, {x: 3, y: 4, label: 0}]);
    const [k, setK] = useState(1);
    const [centroids, setCentroids] = useState([]);
    const [toggle, flipToggle] = useToggle();

    useEffect(() => {
        MLAPIClient.fetchKMeans(points, k)
        .then(newMetadata => {
            setCentroids(newMetadata.centroids);
            setPoints(newMetadata.points);
        })
        .catch(err => {
            console.log(err);
        });
    }, [toggle]);

    return (
        <div>
            <Header className='title'
                    size='huge'
            >
                K-Means
            </Header>
            <div className="kmeans">
                <AddPointForm 
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
                <Points 
                    points={points}
                    deletePoint={i => {
                        deletePointAtIndex(i);
                        flipToggle();
                    }}
                />
                <KMeansChart 
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