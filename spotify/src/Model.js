class Model {
    constructor() {
        this.token = setToken();
    }

    setToken() {
        this.token = localStorage.getItem("accessToken");
    }
}