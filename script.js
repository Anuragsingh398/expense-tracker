let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
$("#addBtn").click(function () {
    let desc = $("#desc").val();
    let amount = $("#amount").val();
    let category = $("#category").val();
    if (desc === "" || amount === "") {
        alert("Fill all fields");
        return;
    }
    let expense = {
        id: Date.now(),
        desc,
        amount: Number(amount),
        category
    };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    $("#desc").val("");
    $("#amount").val("");
    displayExpenses();
});
function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}
function displayExpenses() {
    let filter = $("#filter").val();
    let total = 0;
    let income = 0;
    let expenseTotal = 0;
    $("#list").html("");
    expenses.forEach(e => {
        if (filter !== "All" && e.category !== filter) return;
        total += e.amount;
        if (e.amount > 0) income += e.amount;
        else expenseTotal += Math.abs(e.amount);
        $("#list").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${e.desc}</strong><br>
                    ₹ ${e.amount} | <small>${e.category}</small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${e.id})">
                    <i class="fa fa-trash"></i>
                </button>
            </li>
        `);
    });
    $("#total").text(total);
    $("#income").text(income);
    $("#expense").text(expenseTotal);
}
$("#filter").change(function () {
    displayExpenses();
});
$(document).ready(function () {
    displayExpenses();
});