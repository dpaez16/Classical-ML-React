import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LinRegress from './components/lin-regress/linRegress';
import {SVM} from './components/svm/svm';
import {KMeans} from './components/kmeans/kmeans';
import {KMedoids} from './components/kmedoids/kmedoids';
import {LDA} from './components/lda/lda';
import NavBar from './components/navbar/navbar';
import HomePage from './components/home/homePage';
import './App.css';


export default class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar />
                    <div className='main-content'>
                        <Routes>
                            <Route path='/linear-regression' element={<LinRegress />} />
                            <Route path='/svm' element={<SVM />} />
                            <Route path='/k-means' element={<KMeans />} />
                            <Route path='/k-medoids' element={<KMedoids />} />
                            <Route path='/lda' element={<LDA />} />
                            <Route path='/' element ={<HomePage />} />
                        </Routes>
                    </div>
                </React.Fragment>
            </Router>
        );
    }
};
