const environment = process.env.NODE_ENV;
const productionUrl = "/";
const developmentUrl = "http://localhost:5000/";

const fetchToServer = async (url, query) => {
    return fetch(
        (environment === "development" ? developmentUrl : productionUrl) + url,
        query
    );
};
export { fetchToServer };
