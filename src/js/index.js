import "../styles/main.scss";

import * as view from "./view.js";
import * as model from "./model.js";

const DOMstrings = view.getDOMstrings();

document.querySelector(DOMstrings.submitBtn).addEventListener("click", () => {
  const allData = view.getInputValues();

  if (allData) {
    view.clearGroups();
    model.setCheckout(
      allData.totalSales,
      allData.creditCardTips,
      allData.mdrTips,
      allData.cashTips
    );
    model.setGroup(
      allData.groupName,
      allData.groupSize,
      allData.groupHours,
      allData.groupMinutes
    );
    model.setTotalHours();
    const groups = model.getGroups();
    view.displayGroups(groups);
    view.disableCheckoutInputs();
    view.clearGroupsInput();
  }
});

document
  .querySelector(DOMstrings.outputContainer)
  .addEventListener("click", e => {
    if (e.target.classList.contains("dynamic__triangle")) {
      view.expandContractGroup(e);
    } else if (e.target.classList.contains("icons-trash")) {
      // view.removeGroupView(e);
      view.clearGroups();
      model.removeGroupFromData(e);
      model.setTotalHours();
      const groups = model.getGroups();
      view.displayGroups(groups);
    }
  });

document.querySelector(DOMstrings.inputSection).addEventListener("keyup", e => {
  const inputObj = e.target;

  if (
    inputObj.tagName === "INPUT" &&
    inputObj.value.includes(".") !== true &&
    inputObj.value !== ""
  ) {
    const num = parseFloat(inputObj.value.replace(/,/g, ""));
    const commaNum = num.toLocaleString();
    inputObj.value = commaNum;
  }
});
