import {useState, useEffect} from 'react';
import Points from '../lin-regress/points/points'
import AddPointForm from '../lin-regress/addPointForm/addPointForm';
import KMeansChart from '../kmeans/kmeansChart/kmeansChart'; // TODO: refactor
import KMedoidsBackground from './kmedoidsBackground/kmedoidsBackground';
import KMedoidsSlider from './kmedoidsSlider/kmedoidsSlider';
import KMedoidsDropdown from './kmedoidsDropdown/kmedoidsDropdown';
import MLAPIClient from '../../api/mlApiClient';
import useArray from '../../hooks/useArray';
import useToggle from '../../hooks/useToggle';
import { Header } from 'semantic-ui-react';
import './kmedoids.css';


const COLORS = [
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

const METRICS = [
    "manhattan",
    "euclidean",
    "chebyshev",
    "canberra",
    "chi-square" 
];

export default function KMedoids() {
    const [points, setPoints, pushPoint, deletePointAtIndex] = useArray(
        [{x: 1.0, y: 2.0, label: 0}, {x: 2.0, y: 1.0, label: 0}, {x: 3.0, y: 4.0, label: 0}, {x: -1.0, y: 2.0, label: 0}]
    );
    const [k, setK] = useState(1);
    const [centroids, setCentroids] = useState([]);
    const [metric, setMetric] = useState(METRICS[1]);
    const [toggle, flipToggle] = useToggle();

    useEffect(() => {
        MLAPIClient.fetchKMedoids(points, k, metric)
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
                K-Medoids
            </Header>
            <div className="kmedoids">
                <AddPointForm 
                    points={points}
                    onNewPoint={newPoint => {
                        pushPoint(newPoint);
                        flipToggle();
                    }}
                    updateData={outputData => {
                        setCentroids(outputData.centroids);
                        setPoints(outputData.points);
                        flipToggle();
                    }}
                />
                <KMedoidsDropdown 
                    updateMetric={newMetric => {
                        setMetric(newMetric);
                        flipToggle();
                    }}
                    metrics={METRICS}
                    metric={metric}
                />
                <KMedoidsSlider 
                    k={k}
                    updateK={newK => {
                        setK(newK);
                        flipToggle();
                    }}
                    maxColors={COLORS.length}
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
                    colors={COLORS}
                />
            </div>
            <hr></hr>
            <KMedoidsBackground />
        </div>
    );
};