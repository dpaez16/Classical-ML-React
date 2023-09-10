import { useState } from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import { validNumber } from '../../../helpers/validators';
import './addPointForm.css';

export default function AddPointForm(props) {
    const [ point, setPoint ] = useState({
        x: '',
        y: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPoint({
            ...point,
            ...{ [name]: value }
        });
    };

    return (
        <div className={props.className}>
            <h2><u>Input Point</u>:</h2>
            <Form className='xy-form'>
                <header className="xy-form__row">
                    <Form.Field>
                        <Input  className="xy-form__row__input"
                                placeholder='X-Coordinate'
                                name="x"
                                onChange={handleChange}
                        />
                    </Form.Field>
                </header>
                <header className="xy-form__row">
                    <Form.Field>
                        <Input  className="xy-form__row__input"
                                placeholder='Y-Coordinate'
                                name="y"
                                onChange={handleChange}
                        />
                    </Form.Field>
                </header>
                <Button primary
                        className="add-point"
                        disabled={!(validNumber(point.x) && validNumber(point.y))}
                        onClick={() => {
                            props.onNewPoint({x: Number(point.x), y: Number(point.y)});
                        }
                }>
                    Add Point
                </Button>
            </Form>
        </div>
    );
};