import React from "react";

export default class DataHandler {
  getStoredData = () => {
    const storedData = localStorage.getItem("data");
    if (!storedData) return this.createNewStoredData();
    return JSON.parse(storedData);
  };

  setStoredData = (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
  };

  createNewStoredData() {
    const newData = [
      {
        title: "Personal Spending",
        remaining: 100,
        max: 100,
        id: 1,
      },
    ];
    this.setStoredData(newData);
    return newData;
  }

  downloadData() {
    const data = this.getStoredData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `BudgetData-${new Date().toLocaleDateString("en-CA")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
