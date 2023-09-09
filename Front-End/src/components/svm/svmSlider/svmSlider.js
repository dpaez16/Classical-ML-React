import {Form} from 'semantic-ui-react';

export default function SVMSlider(props) {
    const {c, updateC} = props;

    return (
        <div className='svm__slider'>
            <Form>
                <Form.Input 
                    label={'Value of C: ' + c}
                    min={0.01}
                    max={1}
                    name='c'
                    onChange={e => {
                        updateC(e.target.value);
                    }}
                    value={c}
                    step={0.001}
                    type='range'
                />
            </Form>
        </div>
    );
};