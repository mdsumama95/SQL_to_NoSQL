

const token = localStorage.getItem('token');
function addNewExpense(e){
    e.preventDefault();
    const form = new FormData(e.target);

    const expenseDetails = {
        amount: form.get("amount"),
        description: form.get("description"),
        category: form.get("category")

    }
    console.log(expenseDetails)
    const userEmail = localStorage.getItem('userEmail');
    axios.post('http://localhost:3000/user/addExpense',expenseDetails, 
    { headers: {"Authorization" : token, email:userEmail,} }).then((response) => {

    if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
        window.location.reload();
    } else {
        throw new Error('Failed To create new expense');
    }
    window.location.reload();
    }).catch(err => showError(err))

}
window.addEventListener('load', async () => {
    try {
      const check = localStorage.getItem('isPremiumUser');
      const userEmail = localStorage.getItem('userEmail');
      console.log(userEmail);
      const response = await axios.get('http://localhost:3000/user/getexpenses', 
      
       {
        headers: { "Authorization": token , email:userEmail,  isPremiumUser :  check}
      });
      if (response.status === 200) {
        response.data.expenses.forEach(expense => {
          addNewExpensetoUI(expense);
          
        }); 
        initializePagination(response.data.expenses)
      } 
      else if (response.status === 201) {
          response.data.expenses.forEach(expense => {
            addNewExpensetoUI(expense);
          });
         
         initializePagination(response.data.expenses)
         document.getElementById('rzp-button1').remove();

        //my

    const leaderReportParent = document.getElementById("leaderReport");
    const lbRprt = `<li>
                        <a href='../html/leaderboard.html' id="leader" class="btn btn-primary btn-sm float-right">Leaderboard</a>
                        <a href='../html/report.html' id="report" class="btn btn-outline-primary btn-sm float-left">Report</a>
                    </li>`;
    leaderReportParent.innerHTML = leaderReportParent.innerHTML + lbRprt;

    const leaderBoard = document.getElementById("leader");
    leaderBoard.addEventListener("click", () => {
      if (confirm("Are you sure")) {
        window.location = "leaderboard.html";
      }
    });

     }
    } catch (error) {
      console.log( error);
    }
  });
  

//
var isActive = true;
let cnt = 0;
function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `${expense.id}`;
    parentElement.innerHTML += ``
    
    const table = document.createElement('table');
     table.classList.add('table');

    // add style
    table.classList.add('custom-table');
    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');




// Append the header row to the table head
    tableHead.appendChild(headerRow);
  
    const tableBody = document.createElement('tbody');

// Sample data for the table
// col1:expenseElemId,
  cnt++;
  const rowData = [
    { col1:cnt, col2: expense.amount, col3: expense.description, col4:expense.category}
   ];
 
rowData.forEach(rowDataItem => {
    const row = document.createElement('tr');

    // Create data cells and populate with content
    for (const key in rowDataItem) {
        const cell = document.createElement('td');
        cell.textContent = rowDataItem[key];
        row.appendChild(cell);
    }
    // Append the row to the table body
    tableBody.appendChild(row);
    
});
// Append the table body to the table

table.appendChild(tableBody);
parentElement.appendChild(table);


parentElement.innerHTML += `
  <li id=${expenseElemId}>
            <button class="btn btn-primary btn-sm" onclick=deleteExpense(0,'${expense._id}')>
                Delete Expense
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick=EditUser('${expense.amount}','${expense.description}','${expense.category}','${expense._id}')>Edit</button> 
             </li> `
}
// my pagination start
  

function initializePagination(expenses) {
    const itemsPerPage = 5;
    let currentPage = 1;

    function renderPage(page) {
        const parentElement = document.getElementById('listOfExpenses');
        parentElement.innerHTML = ''; // Clear the parent element
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const expensesToRender = expenses.slice(startIndex, endIndex);
        
        expensesToRender.forEach(expense => {
            addNewExpensetoUI(expense);
        });
    }

    function navigateToPage(page) {
        currentPage = page;
        renderPage(currentPage);
    }
    let curPage = 1;
    // Example of adding event listeners to page navigation buttons
    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            navigateToPage(currentPage - 1);
            curPage--;
            document.getElementById("currentPage").textContent = curPage;
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(expenses.length / itemsPerPage);
        if (currentPage < totalPages) {
            navigateToPage(currentPage + 1);
            curPage++;
            document.getElementById("currentPage").textContent = curPage;
        }
    });

    renderPage(currentPage);
}


// my pagination end
async function deleteExpense(e,expenseid) {
    try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.delete(`http://localhost:3000/user/deleteExpense/${expenseid}`, { headers: { "Authorization": token, email:userEmail} });
        // window.location.reload();
        if (response.status === 200) {
            removeExpensefromUI(expenseid);
            // window.location.reload();
           // window.location.href = "../html/expesneHome.html";
           if(!e){
             window.location.reload();
           }
        } else {
            throw new Error('Failed to delete');
        }
    }catch (err) {

        console.log(err);
    } 
}


function EditUser(name, des, categ, id) {
    
    deleteExpense(1,id);
    document.getElementById("name").value = name;
    document.getElementById("des").value = des;
    document.getElementById("categ").value = categ;
  
 
  }
function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

// function removeExpensefromUI(expenseid){
//     const expenseElemId = document.getElementById(listOfExpenses);
//     console.log(expenseElemId);
//     // const expenseElemId = `${expenseid}`;
//     // document.getElementById(expenseElemId).remove();
// }

document.getElementById('rzp-button1').onclick = async function (e) {
    // console.log("hello")
    const userEmail = localStorage.getItem('userEmail');
    const response  = await axios.get('http://localhost:3000/purchase/premiumMemberShip', { headers: {"Authorization" : token,email:userEmail} });
    console.log(response,"hello");
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Sharpener Technology",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Somama",
       "email": "mdsumama9090@gmail.com",
       "contact": "8727089931"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment

     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updateTransactionStatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}