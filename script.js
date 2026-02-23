async function addLead() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    loadLeads();
}

async function loadLeads() {
    const res = await fetch("http://localhost:5000/leads");
    const leads = await res.json();

    const table = document.getElementById("leadTable");
    table.innerHTML = "";

    leads.forEach(lead => {
        table.innerHTML += `
            <tr>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.status}</td>
                <td>
                    <button onclick="updateStatus('${lead._id}')">
                        Mark Contacted
                    </button>
                </td>
            </tr>
        `;
    });
}

async function updateStatus(id) {
    await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Contacted" })
    });

    loadLeads();
}

loadLeads();