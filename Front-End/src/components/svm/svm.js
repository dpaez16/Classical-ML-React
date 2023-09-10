import {useState, useEffect} from 'react';
import SVMPoints from './svmPoints/svmPoints'
import AddSVMPointForm from './addSVMPointForm/addSVMPointForm';
import SVMChart from './svmChart/svmChart';
import SVMBackground from './svmBackground/svmBackground';
import SVMSlider from './svmSlider/svmSlider';
import SVMStats from './svmStats/svmStats';
import MLAPIClient from '../../api/mlApiClient';
import useArray from '../../hooks/useArray';
import useToggle from '../../hooks/useToggle';
import useDebounce from '../../hooks/useDebounce';
import { Header } from 'semantic-ui-react';
import './svm.css';


export default function SVM() {
    const DEBOUNCE_DELAY = 250;

    const [points, _, pushPoint, deletePointAtIndex] = useArray([{x: 1, y: 2, label: 1}, {x: 2, y: 1, label: -1}, {x: 3, y: 4, label: 1}]);
    const [c, setC] = useState(1);
    const [metadata, setMetadata] = useState({
        boundaryLine: undefined,
        upperLine: undefined, 
        lowerLine: undefined,
        colors: undefined,
        accuracy: undefined
    });
    const [toggle, flipToggle] = useToggle();
    const debouncedToggle = useDebounce(toggle, DEBOUNCE_DELAY);

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
    }, [debouncedToggle]);

    return (
        <div>
            <Header className='title'
                    size='huge'
            >
                Support Vector Machine
            </Header>
            <div className="svm">
                <AddSVMPointForm 
                    points={points}
                    onNewPoint={point => {
                        pushPoint(point);
                        flipToggle();
                    }}
                />
                <SVMStats accuracy={metadata.accuracy} />
                <SVMSlider 
                    c={c}
                    updateC={newC => {
                        setC(newC);
                        flipToggle();
                    }}
                />
                <SVMPoints 
                    points={points}
                    deletePoint={i => {
                        deletePointAtIndex(i);
                        flipToggle();
                    }}
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