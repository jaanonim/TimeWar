const environment = process.env.NODE_ENV;
const productionUrl = "/api/";
const developmentUrl = "http://localhost:5000/api/";

const fetchToServer = async (url, query) => {
    if (query.headers == null) {
        query.headers = new Headers({});
    }
    query.headers.append(
        "Authorization",
        "Bearer " + (sessionStorage.getItem("authToken") || "")
    );

    return fetch(
        (environment === "development" ? developmentUrl : productionUrl) + url,
        query
    );
};
export { fetchToServer };
