import {Form, Dropdown, Header} from 'semantic-ui-react';

export default function KMedoidsDropdown(props) {
    const {metric, metrics, updateMetric} = props;

    const options = metrics.map(m => {
        return {
            key: m,
            text: m[0].toUpperCase() + m.substr(1),
            value: m
        }
    });

    return (
        <div className='kmedoids__dropdown'>
            <Form>
                <Form.Field>
                    <Header size='small'>
                        Distance Metric:
                    </Header>
                    <Dropdown   className='kmedoids__dropdown-label'
                                label='Distance Metric'
                                fluid
                                selection
                                options={options}
                                onChange={(_, data) => {
                                    updateMetric(data.value);
                                }}
                                value={metric}
                    />
                </Form.Field>
            </Form>
        </div>
    );
};