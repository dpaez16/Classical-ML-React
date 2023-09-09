import {Header} from 'semantic-ui-react';

export default function SVMStats(props) {
    const {accuracy} = props;
    return (
        <Header className='svm__stats'
                size='small'
        >
            SVM Accuracy: {accuracy}
        </Header>
    )
};