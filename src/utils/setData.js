  export const getStoredData = () => {
    const storedData = localStorage.getItem("data");

    if (storedData) {
      return JSON.parse(storedData);
    } else {
        const data = [{
            title: "Personal Spending",
            remaining: 100,
            max: 100,
            id: 0
          }];
          localStorage.setItem("data", JSON.stringify(data));
          return data;
    }
  }