import {Header} from 'semantic-ui-react';

export default function LinRegressStats(props) {
    const {metadata} = props;

    return (
        <Header className='lin-regress__stats'
                size='small'
        >
            Slope of Line: {metadata.m}
            <br />
            Intercept: {metadata.b}
            <br />
            Total Residual: {metadata.residual}
        </Header>
    );
};