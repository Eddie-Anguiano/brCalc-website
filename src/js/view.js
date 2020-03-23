import imgTriBtn from "../images/tri-btn-white.svg";
import imgTrash from "../images/trash-2.svg";

const DOMStrings = {
  inputSection: ".input",
  totalSales: "#input__total-sales",
  creditCardTips: "#input__credit-tips",
  mdrTips: "#input__mdr",
  cashTips: "#input__cash-tips",
  groupName: "#input__name",
  groupHours: "#input__time-hours",
  groupMinutes: "#input__time-minutes",
  groupSize: "#input__size",
  outputContainer: ".dynamic-wrapper",
  submitBtn: ".tri-btn__container"
};

function validateRequiredInputNumber(input) {
  let validInput = parseFloat(input);
  if (validInput) {
    return validInput;
  }
}

function validateOptionalNumber(input) {
  let validInput;
  if (input === "") {
    validInput = 0;
  } else {
    validInput = parseFloat(input);
  }
  return validInput;
}

export function getDOMstrings() {
  return DOMStrings;
}

export function getInputValues() {
  let inputs = {
    totalSales: validateRequiredInputNumber(
      document.querySelector(DOMStrings.totalSales).value.replace(/,/g, "")
    ),
    creditCardTips: validateRequiredInputNumber(
      document.querySelector(DOMStrings.creditCardTips).value.replace(/,/g, "")
    ),
    groupSize: validateRequiredInputNumber(
      document.querySelector(DOMStrings.groupSize).value
    ),
    groupHours: validateRequiredInputNumber(
      document.querySelector(DOMStrings.groupHours).value
    ),
    mdrTips: validateOptionalNumber(
      document.querySelector(DOMStrings.mdrTips).value.replace(/,/g, "")
    ),
    cashTips: validateOptionalNumber(
      document.querySelector(DOMStrings.cashTips).value.replace(/,/g, "")
    ),
    groupMinutes: validateOptionalNumber(
      document.querySelector(DOMStrings.groupMinutes).value
    ),
    groupName: document.querySelector(DOMStrings.groupName).value
  };

  //
  const entries = Object.entries(inputs);
  // console.log(entries);
  let test = entries.every(item => {
    item[1] = item[1] === 0 ? true : item[1];
    if (item[1]) {
      document
        .querySelector(DOMStrings[item[0]])
        .parentNode.classList.remove("--border-red");
      return true;
    } else {
      document
        .querySelector(DOMStrings[item[0]])
        .parentNode.classList.add("--border-red");
      return false;
    }
  });
  // console.log(test);
  if (test) {
    return inputs;
  } else {
    return false;
  }
}

export function displayGroups(groupsArray) {
  groupsArray.forEach(item => {
    const html = `<div class='dynamic'>
              <div class='dynamic__name-label'>
                <img
                  class='dynamic__triangle'
                  src='${imgTriBtn}'
                  alt='expand button'
                  data-init='false'
                />${item.name}
              </div>
              <div class='dynamic__time-label'>${item.hours}</div>
              <div class='dynamic__size-label'>
                ${item.size}<img
                  src='${imgTrash}'
                  class='icons-trash'
                  alt='trash icon'
                  id='${item.name}'
                />
              </div>
              <div class='dynamic__sales'>
                Sales: <span class='dynamic__results'>${item.sales}</span>
              </div>
              <div class='dynamic__cc-tips'>
                Credit Card Tips:
                <span class='dynamic__results'>${item.creditCardTips}</span>
              </div>
              <div class='dynamic__cash'>
                Cash Tips:
                <span class='dynamic__results'>${item.cashTips}</span>
              </div>
              <div class='dynamic__claimed'>
                Claimed Tips:
                <span class='dynamic__results'>${item.claimedTips}</span>
              </div>
              <div class='dynamic__busser'>
                Busser Tip Out:
                <span class='dynamic__results'>${item.busserTips}</span>
              </div>
              <div class='dynamic__bar'>
                Bar Tip Out:
                <span class='dynamic__results'>${item.barTips}</span>
              </div>
              <div class='dynamic__runner'>
                Runner Tip Out:
                <span class='dynamic__results'>${item.runnerTips}</span>
              </div>
              <div class='dynamic__total-tip'>
                Total Tip Out:
                <span class='dynamic__results'>${item.totalTipOut}</span>
              </div>
            </div>`;

    document
      .querySelector(DOMStrings.outputContainer)
      .insertAdjacentHTML("beforeend", html);
  });
}

export function expandContractGroup(e) {
  let triangle = e.target;

  triangle.classList.toggle("rotate");

  if (triangle.dataset.init === "false") {
    triangle.dataset.init = "true";
    triangle.parentNode.parentNode.classList.toggle("expand");
  } else {
    triangle.parentNode.parentNode.classList.toggle("expand");
    triangle.parentNode.parentNode.classList.toggle("contract");
  }
}

export function clearGroups() {
  document.querySelector(DOMStrings.outputContainer).innerHTML = "";
}

export function disableCheckoutInputs() {
  document.querySelector(DOMStrings.totalSales).disabled = true;
  document.querySelector(DOMStrings.creditCardTips).disabled = true;
  document.querySelector(DOMStrings.cashTips).disabled = true;
  document.querySelector(DOMStrings.mdrTips).disabled = true;
}

export function clearGroupsInput() {
  document.querySelector(DOMStrings.groupName).value = "";
  document.querySelector(DOMStrings.groupHours).value = "";
  document.querySelector(DOMStrings.groupMinutes).value = "";
  document.querySelector(DOMStrings.groupSize).value = "";
}

export function removeGroupView(e) {
  const trash = e.target;
  trash.parentNode.parentNode.style.display = "none";
}
