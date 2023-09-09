import {useState} from 'react';
import {Form, Input, Dropdown, Button} from 'semantic-ui-react';
import {validNumber} from '../../../helpers/validators';
import './addPointForm.css';

const SVM_OPTIONS = [
    {
        key: '+1',
        text: 'Red',
        value: 1
    },
    {
        key: '-1',
        text: 'Blue',
        value: -1
    }
];

export default function AddPointForm(props) {
    const [point, setPoint] = useState({
        x: '',
        y: '',
        label: undefined
    });

    const handleInputChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setPoint({
            ...point,
            ...{[name]: value}
        });
    };

    const dropdownHandler = (event, {name, value}) => {
        event.preventDefault();

        setPoint({
            ...point,
            ...{[name]: value}
        });
    }

    return (
        <div className='svm__form'>
            <h2><u>Input Point</u>:</h2>
            <Form className='xy-form'>
                <header className="xy-form__row">
                    <Form.Field>
                        <Input  className="xy-form__row__input"
                                placeholder='X-Coordinate'
                                name='x'
                                onChange={handleInputChange}
                        />
                    </Form.Field>
                </header>
                <header className="xy-form__row">
                    <Form.Field>
                        <Input  className="xy-form__row__input"
                                placeholder='Y-Coordinate'
                                name='y'
                                onChange={handleInputChange}
                        />
                    </Form.Field>
                </header>
                <header className="xy-form__row">
                    <Form.Field>
                        <Dropdown   className='xy-form__label'
                                    placeholder='Label'
                                    name='label'
                                    fluid
                                    selection
                                    options={SVM_OPTIONS}
                                    onChange={dropdownHandler}
                        />
                    </Form.Field>
                </header>
                <Button primary
                        className="add-point"
                        disabled={!(validNumber(point.x) && validNumber(point.y) && point.label)}
                        onClick={() => {
                            const newPoint = {
                                x: Number(point.x), 
                                y: Number(point.y),
                                label: Number(point.label)
                            }

                            props.onNewPoint(newPoint);
                        }
                }>
                    Add Point
                </Button>
            </Form>
        </div>
    );
};