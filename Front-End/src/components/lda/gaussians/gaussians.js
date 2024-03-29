import {List, Button, Icon} from 'semantic-ui-react';
import {InlineMath} from 'react-katex';
import './gaussians.css';

export default function Gaussians(props) {
    const {means, covMats, deletePair} = props;

    return (
        <div className="lda__points">
            <h2><u>Gaussian Classes</u>:</h2>
            <div className="lda__points-list">
                <List>
                {means.map((meanVec, i) => {
                    return (
                        <List.Item key={i}>
                            <header className='point-row'>
                                <span className='point-row__point'>
                                (   <InlineMath math='\mu_X = ' /> &nbsp; {meanVec[0]}, &nbsp;
                                    <InlineMath math='\mu_Y = ' /> &nbsp; {meanVec[1]},  &nbsp;
                                    <InlineMath math='\sigma_X^2 = ' /> &nbsp; {covMats[i][0][0]}, &nbsp;
                                    <InlineMath math='\sigma_Y^2 = ' /> &nbsp; {covMats[i][1][1]},  &nbsp;
                                    <InlineMath math='\sigma_{XY} = ' /> &nbsp; {covMats[i][0][1]}
                                )
                                </span>
                                <Button className='point-row__delete'
                                    onClick={_ => {
                                        deletePair(i);
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