import {List, Button, Icon} from 'semantic-ui-react';
import './svmPoints.css';

export default function SVMPoints(props) {
    const {points, deletePoint} = props;

    return (
        <div className="svm__points">
            <h2><u>Points</u>:</h2>
            <div className="svm__points-list">
                <List>
                {points.map((point, i) => {
                    return (
                        <List.Item key={i}>
                            <header className='point-row'>
                                <span className='point-row__point'>
                                {point.label === 1 ? 'Red' : 'Blue'}: 
                                ({point.x}, {point.y})
                                </span>
                                <Button className='point-row__delete'
                                    onClick={_ => {
                                        deletePoint(i);
                                    }
                                }>
                                    <Icon name='close' />
                                </Button>
                            </header>
                        </List.Item>
                    );
                })}
                </List>
            </div>
        </div>
    );
};