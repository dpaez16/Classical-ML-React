import {List, Button, Icon} from 'semantic-ui-react';
import './points.css';

export default function Points(props) {
    const {points, deletePoint} = props;

    return (
        <div className="kmeans__points">
            <h2><u>Points</u>:</h2>
            <div className="kmeans__points-list">
                <List>
                {points.map((point, i) => {
                    return (
                        <List.Item key={i}>
                            <header className='point-row'>
                                <span className='point-row__point'>
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