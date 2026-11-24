console.log("Expense Tracker");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let amountInput = document.getElementById("amount");

let categorySelect = document.getElementById("category");

let addButton = document.getElementById("addBtn");

let expenseList = document.getElementById("expenseList");

let totalElement = document.getElementById("total");


// Display Expenses Function

function displayExpenses() {

    expenseList.innerHTML = "";

    let total = 0;

    for (let i = 0; i < expenses.length; i++) {

        let expense = expenses[i];

        total = total + expense.amount;

        let li = document.createElement("li");

        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";
        li.style.gap = "10px";

        let expenseText = document.createElement("span");

        expenseText.textContent = expense.amount + " - " + expense.category;

        li.appendChild(expenseText);

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.style.width = "100px";
        deleteButton.classList.add("delete-btn");

        li.appendChild(deleteButton);

        // Delete Expense

        deleteButton.addEventListener("click", function () {

            expenses.splice(i, 1);

            localStorage.setItem("expenses", JSON.stringify(expenses));

            displayExpenses();

        });

        expenseList.appendChild(li);
    }

    totalElement.textContent = total;
}


// Page Load

displayExpenses();


// Add Expense

addButton.addEventListener("click", function () {

    let amount = Number(amountInput.value);

    if (amount <= 0) {

        alert("Please enter a valid amount");

        return;
    }

    let category = categorySelect.value;

    let expense = {
        amount: amount,
        category: category
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    amountInput.value = "";

    categorySelect.value = "food";

});