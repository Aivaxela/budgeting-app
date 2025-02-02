  export default class DataHandler {

    getStoredData = () => {
        const storedData = localStorage.getItem("data");
        if (!storedData) return this.createNewStoredData();
        return JSON.parse(storedData);
    }

    setStoredData = (newData) => {
      localStorage.setItem("data", JSON.stringify(newData))
    }

    createNewStoredData() {
        const newData = [{
            title: "Personal Spending",
            remaining: 100,
            max: 100,
            id: 1
          }];
          this.setStoredData(newData);
          return newData;
    }
  }