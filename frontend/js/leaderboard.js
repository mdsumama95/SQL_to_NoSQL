window.addEventListener('DOMContentLoaded',() =>{
    const token = localStorage.getItem('token')
    axios.get("http://localhost:3000/premium/getAllUsers",{ headers: {"Authorization" : token} })
    .then(result =>{
        console.log(result.data.data)
        const leaderboard = document.getElementById('lb');
        for(let i=0;i<result.data.data.length;i++)
        {
            let email = result.data.data[i].email;
            let id = result.data.data[i]._id;
            console.log(email, id, "=== 11");
           leaderboard.innerHTML+= `
           <div>
             <ul> 
              <li>
                 ${email} <button class="btn btn-outline-primary btn-sm"  onclick="getExpenses('${id}')">Details</button>
              </li>
             </ul>
           </div>`;
             
        }
    })
    .catch(err =>console.log(err))
})
async function getExpenses(id) {
    try {
        // console.log(id, " ==== 26");
        const response = await axios.get(`http://localhost:3000/premium/getAllExpenses/${id}`);
        console.log(response);
        let details = document.getElementById('details');
        let container = "";
        response.data.data.sort((a, b) => a.amount - b.amount);
         const tableHead = `
          <thead>
            <tr>
                <th>Num</th>
                <th>Expense</th>
                <th>Description</th>
                <th>Category</th>
            </tr>
          </thead>`;
        // Open the table tag
        container += `<table class='table custom-table'>${tableHead}<tbody>`;
        
        for (let i = 0; i < response.data.data.length; i++) {
            let num = i;
            let expense = response.data.data[i].amount;
            let description = response.data.data[i].description;
            let category = response.data.data[i].category;
        
            // Add a table row with cells for each data point
            container += `
                <tr>
                    <td>${num}</td>
                    <td>${expense}</td>
                    <td>${description}</td>
                    <td>${category}</td>
                </tr>`;
        }
        
        // Close the table tag
        container += "</tbody></table>";
        
        details.innerHTML = container;
        
       
    } catch (error) {
        console.log(error);
    }

    console.log(id);
}
