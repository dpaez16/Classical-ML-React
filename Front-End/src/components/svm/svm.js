import {useState, useEffect} from 'react';
import Points from './points/points'
import AddPointForm from './addPointForm/addPointForm';
import SVMChart from './svmChart/svmChart';
import SVMBackground from './svmBackground/svmBackground';
import SVMSlider from './svmSlider/svmSlider';
import SVMStats from './svmStats/svmStats';
import MLAPIClient from '../../api/mlApiClient';
import { Header } from 'semantic-ui-react';
import './svm.css';


export default function SVM() {
    const [points, setPoints] = useState([{x: 1, y: 2, label: 1}, {x: 2, y: 1, label: -1}, {x: 3, y: 4, label: 1}]);
    const [c, setC] = useState(1);
    const [metadata, setMetadata] = useState({
        boundaryLine: undefined,
        upperLine: undefined, 
        lowerLine: undefined,
        colors: undefined,
        accuracy: undefined
    });

    useEffect(() => {
        MLAPIClient.fetchSVM(points, c)
        .then(newMetadata => {
            setMetadata({
                ...metadata,
                ...newMetadata
            });
        })
        .catch(err => {
            console.log(err);
        });
    }, [points, c]);

    return (
        <div>
            <Header className='title'
                    size='huge'
            >
                Support Vector Machine
            </Header>
            <div className="svm">
                <AddPointForm 
                    points={points}
                    onNewPoint={point => setPoints([...points, point])}
                />
                <SVMStats accuracy={metadata.accuracy} />
                <SVMSlider 
                    c={c}
                    updateC={setC}
                />
                <Points 
                    points={points}
                    deletePoint={i => setPoints(points.filter((_, idx) => i !== idx))}
                />
                <SVMChart 
                    points={points}
                    boundaryLine={metadata.boundaryLine}
                    upperLine={metadata.upperLine}
                    lowerLine={metadata.lowerLine}
                    colors={metadata.colors}
                />
            </div>
            <hr></hr>
            <SVMBackground />
        </div>
    );
};