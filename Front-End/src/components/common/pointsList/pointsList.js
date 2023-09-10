import {List, Button, Icon, Header} from 'semantic-ui-react';
import './pointsList.css';

export default function PointsList(props) {
    const { points, className } = props;

    return (
        <div className={className}>
            <Header as='h2'><u>Points</u>:</Header>
            <div className="points-list">
                <List>
                {points.map((point, i) => {
                    return (
                        <List.Item key={i}>
                            <header className='point-row'>
                                <span className='point-row__point'>
                                    ({point.x}, {point.y})
                                </span>
                                <Button className='point-row__delete'
                                    onClick={e => {
                                        e.preventDefault();
                                        props.deletePoint(i);
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