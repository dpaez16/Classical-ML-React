import {Form} from 'semantic-ui-react';

export default function KMeansSlider(props) {
    const {k, updateK, maxColors} = props;
    return (
        <div className='kmeans__slider'>
            <Form>
                <Form.Input 
                    label={'Number of Clusters: ' + k}
                    min={1}
                    max={maxColors}
                    name='k'
                    onChange={e => {
                        updateK(e.target.value);
                    }}
                    step={1}
                    type='range'
                    value={k}
                />
            </Form>
        </div>
    );
};