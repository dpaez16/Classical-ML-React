export default class MLAPIClient {
    static #createApiRequest(body, service) {
        const url = `${process.env.REACT_APP_BACKEND_API_ENDPOINT}/${service}`;
        console.log(url);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            throw err;
        });
    }

    static fetchLinearRegression(points) {
        const x = [];
        const y = [];

        points.forEach(point => {
            x.push(point.x);
            y.push(point.y);
        });

        const body = {
            x: x,
            y: y
        };

        return this.#createApiRequest(body, "lin_regress");
    }

    static fetchSVM(points, c) {
        const x = [];
        const y = [];
        const labels = [];

        points.forEach(point => {
            x.push(point.x);
            y.push(point.y);
            labels.push(point.label);
        });

        const body = {
            x: x,
            y: y,
            labels: labels,
            c: c
        };

        return this.#createApiRequest(body, 'svm');
    }

    static fetchKMeans(points, k) {
        const x = [];
        const y = [];

        points.forEach(point => {
            x.push(point.x);
            y.push(point.y);
        });

        const body = {
            x: x,
            y: y,
            k: k
        };

        return this.#createApiRequest(body, 'kmeans');
    }

    static fetchKMedoids(points, k, metric) {
        const x = [];
        const y = [];

        points.forEach(point => {
            x.push(point.x);
            y.push(point.y);
        });

        const body = {
            'x': x,
            'y': y,
            'k': k,
            'metric': metric
        };
    
        return this.#createApiRequest(body, 'kmedoids');
    }

    static fetchLDA(means, covarianceMatrices) {
        const body = {
            means: means,
            covarianceMatrices: covarianceMatrices
        };

        return this.#createApiRequest(body, 'lda');
    }
};