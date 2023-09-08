import {List, Button, Icon, Header} from 'semantic-ui-react';
import './points.css';

export default function Points(props) {
    const { points } = props;

    return (
        <div className="lin-regress__points">
            <Header as='h2'><u>Points</u>:</Header>
            <div className="lin-regress__points-list">
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