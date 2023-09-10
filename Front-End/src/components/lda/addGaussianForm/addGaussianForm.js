import { useState } from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import {InlineMath} from 'react-katex';
import {validNumber, isNonNegativeNumber} from '../../../helpers/validators';
import './addGaussianForm.css';

export default function AddGaussianForm(props) {
    const [gaussian, setGaussian] = useState({
        muX: '',
        muY: '',
        varX: '',
        varY: '',
        covXY: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;

        setGaussian({
            ...gaussian,
            ...{[name]: value}
        });
    };

    const isValidInput = () => {
        const {muX, muY, varX, varY, covXY} = gaussian;
        return (
            validNumber(muX) &&
            validNumber(muY) && 
            isNonNegativeNumber(varX) &&
            isNonNegativeNumber(varY) &&
            validNumber(covXY)
        );
    };
    
    return (
        <div className='lda__form'>
            <h2><u>Input Gaussian Class</u>:</h2>
            <Form>
                <header className="lda-form__row">
                    <span class='lda-form__row__sym'>
                        <InlineMath math='\mu_X' />:
                    </span>
                    <Input  className="lda-form__row__input"
                            name='muX'
                            onChange={handleChange}
                    />
                </header>
                <header className="lda-form__row">
                    <span class='lda-form__row__sym'>
                        <InlineMath math='\mu_Y' />:
                    </span>
                    <Input  className="lda-form__row__input"
                            name='muY'
                            onChange={handleChange}
                    />
                </header>
                <header className="lda-form__row">
                    <span class='lda-form__row__sym'>
                        <InlineMath math='\sigma_X^2' />:
                    </span>
                    <Input  className="lda-form__row__input"
                            name='varX'
                            onChange={handleChange}
                    />
                </header>
                <header className="lda-form__row">
                    <span class='lda-form__row__sym'>
                        <InlineMath math='\sigma_Y^2' />:
                    </span>
                    <Input  className="lda-form__row__input"
                            name='varY'
                            onChange={handleChange}
                    />
                </header>
                <header className="lda-form__row">
                    <span class='lda-form__row__sym'>
                        <InlineMath math='\sigma_{XY}' />:
                    </span>
                    <Input  className="lda-form__row__input"
                            name='covXY'
                            onChange={handleChange}
                    />
                </header>
                <Button primary
                        className="add-point"
                        disabled={!isValidInput()}
                        onClick={() => {
                            const newMean = [
                                Number(gaussian.muX), 
                                Number(gaussian.muY)
                            ];

                            const newCovMat = [
                                [gaussian.varX, gaussian.covXY],
                                [gaussian.covXY, gaussian.varY]
                            ];

                            props.onNewInput(newMean, newCovMat);
                        }
                }>
                    Add Gaussian Class
                </Button>
            </Form>
        </div>
    );
};