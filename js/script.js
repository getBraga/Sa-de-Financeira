const inicioSpanReceita = document.querySelector(".inicio-spanreceita");
const inicioSpanDespesa = document.querySelector(".inicio-spandespesa");
const inicioSpanSaldo = document.querySelector(".inicio-spansaldo");
const corInicioSaldo = document.querySelector(".inicio-saldo");
const urlInfo = "https://9c521d330c36.ngrok.io/info";
const urlTotal = "https://9c521d330c36.ngrok.io/total/1";

async function getUrl(url) {
  const pegaUrl = await fetch(url);
  return pegaUrl.json();
}

async function mostrarInicial() {
  const pegaSaldos = await getUrl(urlInfo);
  let inicioReceita = 0;
  let inicioDespesa = 0;

  pegaSaldos.forEach((pega) => {
    inicioReceita += +pega.receita;
    inicioDespesa += +pega.despesa;
  });
  const inicioSaldo = inicioReceita - inicioDespesa;
  inicioSpanReceita.innerText = inicioReceita.toFixed(2);
  inicioSpanDespesa.innerText = inicioDespesa.toFixed(2);
  inicioSpanSaldo.innerText = inicioSaldo.toFixed(2);

  if (+inicioSpanSaldo.innerText < 0) {
    corInicioSaldo.classList.add("negativo");
  } else {
    corInicioSaldo.classList.remove("negativo");
  }
}
if (inicioSpanReceita && inicioSpanDespesa && inicioSpanSaldo) {
  mostrarInicial();
}

async function deleteData(id) {
  // e.preventDefault();
  // console.log(e);
  const response = await fetch(`${urlInfo}/${id}`, {
    method: "DELETE",
  });
}

async function financiaList() {
  const urls = await getUrl(urlInfo);
  const app = document.querySelector("#app-detalhar");

  app.innerHTML = `
  ${urls.map(
    (url) => `
    <div class="detalhamento">
    <div class="button-fechar"><button class='fechar' mudarTudo(${url.tid}) onclick=" deleteData(${url.id})">X</button></div>
    <form>
    
      <div>  
        <label>Data</label>
        <input id="data"  onchange="mudarTudo(${url.id})" type="date" data-id="${url.id}"  value="${url.date}" placeholder="01/01/2001"/>
      </div>
      <div>
        <label>Descrição</label>
        <input class="descricao" onchange="mudarTudo(${url.id})" type="text" data-id="${url.id}" value="${url.descricao}"  />
      </div>
      <div>
        <label>Receita</label>
        <input id="receita" onchange="mudarTudo(${url.id})" type="number" 
        data-id="${url.id}"value="${url.receita}" placeholder=" R$ " />
      </div>
      <div>
        <label>Despesa</label>
        <input class="cor-despesa" onchange="mudarTudo(${url.id})" data-id="${url.id}"type="number"value="${url.despesa}"placeholder=" R$ "/>
      </div>
    </form>

  </div>

 


    `
  )}
  
  
  `;
}

const button = document.querySelector("#botao-iniciar");
if (button) {
  financiaList();
}
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

function ativaButton() {
  if (button) {
    financiaList();

    postData(urlInfo, {
      date: "",
      descricao: "",
      receita: "",
      despesa: "",
      id: "",
    });
  }
}
if (button) {
  button.addEventListener("click", ativaButton);
}
async function putData(id, data = {}) {
  // e.preventDefault();
  // console.log(e);
  const response = await fetch(`${urlInfo}/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

async function putSaldo(id, data = {}) {
  // e.preventDefault();
  // console.log(e);
  const response = await fetch(urlTotal, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

async function mudarTudo(id) {
  const date = document.querySelector(`#data[data-id="${id}"]`).value;
  const descricao = document.querySelector(`.descricao[data-id="${id}"]`).value;
  const receita = document.querySelector(`#receita[data-id="${id}"]`).value;
  const despesa = document.querySelector(`.cor-despesa[data-id="${id}"]`).value;
  const totalR = document.querySelectorAll("#receita");
  const totalD = document.querySelectorAll(".cor-despesa");

  let totalReceita = 0;
  let totalDespesa = 0;

  totalR.forEach((r) => {
    totalReceita += +r.value;
  });
  totalD.forEach((d) => {
    totalDespesa += +d.value;
  });
  const totalT = totalReceita - totalDespesa;
  const totalSaldo = totalT.toFixed(2);
  async function ativarTudo() {
    putData(id, {
      date,
      descricao,
      receita,
      despesa,
    });
    putSaldo(1, {
      totalReceita,
      totalDespesa,
      totalSaldo,
    });
  }
  const buttonMais = document.querySelector(".button-aplicar");
  buttonMais.addEventListener("click", ativarTudo);
}

async function saldo() {
  const pegaSaldos = await getUrl(urlInfo);

  const mostrarSaldo = document.querySelector(".saldo-h1");

  let receita = 0;
  let despesa = 0;
  pegaSaldos.forEach((pegarSaldo) => {
    receita += +pegarSaldo.receita.replace(",", ".");
    despesa += +pegarSaldo.despesa.replace(",", ".");
  });

  const total = receita - despesa;

  mostrarSaldo.innerText = total.toFixed(2);

  if (mostrarSaldo.innerText > 0) {
    mostrarSaldo.classList.add("positivo");
    mostrarSaldo.classList.remove("negativo");
  }
  if (mostrarSaldo.innerText < 0) {
    mostrarSaldo.classList.add("negativo");
    mostrarSaldo.classList.remove("positivo");
  }
}
if (button) {
  saldo();
}
