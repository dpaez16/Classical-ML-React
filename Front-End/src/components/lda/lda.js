import {useState, useEffect} from 'react';
import Gaussians from './gaussians/gaussians'
import AddGaussianForm from './addGaussianForm/addGaussianForm';
import LDAChart from './ldaChart/ldaChart';
import LDABackground from './ldaBackground/ldaBackground';
import MLAPIClient from '../../api/mlApiClient';
import useArray from '../../hooks/useArray';
import useToggle from '../../hooks/useToggle';
import { Header } from 'semantic-ui-react';
import './lda.css';


export function LDA() {
    const [means, _, pushMean, deleteMeanFromIdx] = useArray([]);
    const [covMatrices, __, pushCovMatrix, deleteCovMatrixFromIdx] = useArray([]);
    const [metadata, setMetadata] = useState({
        points: [],
        line: []
    });
    const [toggle, flipToggle] = useToggle();

    useEffect(() => {
        MLAPIClient.fetchLDA(means, covMatrices)
        .then(newMetadata => {
            setMetadata({
                ...metadata,
                ...newMetadata
            });
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
                Linear Discriminant Analysis
            </Header>
            <div className="lda">
                <AddGaussianForm 
                    means={means}
                    covarianceMatrices={covMatrices}
                    onNewInput={(meanVector, covMat) => {
                        pushMean(meanVector);
                        pushCovMatrix(covMat);
                        flipToggle();
                    }}
                />
                <Gaussians 
                    means={means}
                    covMats={covMatrices}
                    deletePair={i => {
                        deleteMeanFromIdx(i);
                        deleteCovMatrixFromIdx(i);
                        flipToggle();
                    }}
                />
                <LDAChart   points={metadata.points}
                            line={metadata.line}
                />
            </div>
            <hr></hr>
            <LDABackground />
        </div>
    );
};