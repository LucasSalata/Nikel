const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []

};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function() {
    window.location.href = "transaction.html"
})

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-imput").value);
    const description = document.getElementById("description-imput").value;
    const date = document.getElementById("date-imput").value;
    const type = document.querySelector('imput[name="type-imput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });
    saveData(data);
    e.target.reset();
    myModal.hide(); 

    getCashin();
    getCashout();
    getTotal();

    alert("Lançamento adicionado com sucesso.");

});

checkLogged();


function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        window.location.href = "index.html";
        return;
    }

    const datUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashin();
    getCashout();
    getTotal();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashin() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if(cashIn.length) {
        let cashInhtml = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        }  else {
            limit = cashIn.length;
        }
        
        for (let index = 0; index < limit; index++) {
            cashInhtml += `
            <div class="row mb-4">
                                        <div class="col-12">
                                            <h3>class="fs-2">R$ ${cashIn[index].value.tofixed(2)}</h3>
                                            <div> class="container p-0"</div>
                                            <div>class="<col-12 col-md-8>
                                                <p> ${cashIn[index].description}</p>
                                            </div>
                                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                                ${cashIn[index].date}
                                            </div>
                                        </div>
                                    </div>
                                    `  
                                 
            
        }

        document.getElementById("cash-in-list").innerHTML = cashInhtml;
    }   
}

function getCashout() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "2");

    if(cashIn.length) {
        let cashInhtml = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        }  else {
            limit = cashIn.length;
        }
        
        for (let index = 0; index < limit; index++) {
            cashInhtml += `
            <div class="row mb-4">
                                        <div class="col-12">
                                            <h3>class="fs-2">R$ ${cashIn[index].value.tofixed(2)}</h3>
                                            <div> class="container p-0"</div>
                                            <div>class="<col-12 col-md-8>
                                                <p> ${cashIn[index].description}</p>
                                            </div>
                                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                                ${cashIn[index].date}
                                            </div>
                                        </div>
                                    </div>
                                    `  
                                 
            
        }

        document.getElementById("cash-out-list").innerHTML = cashInhtml;
    }   
}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }

    });

    document.getElementById("total").innerHTML = `R$ ${total.tofixed(2)}`;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}