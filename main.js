/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const inicioSpanReceita = document.querySelector(\".inicio-spanreceita\");\nconst inicioSpanDespesa = document.querySelector(\".inicio-spandespesa\");\nconst inicioSpanSaldo = document.querySelector(\".inicio-spansaldo\");\nconst corInicioSaldo = document.querySelector(\".inicio-saldo\");\nconst urlInfo = \"https://9c521d330c36.ngrok.io/info\";\nconst urlTotal = \"https://9c521d330c36.ngrok.io/total/1\";\n\nasync function getUrl(url) {\n  const pegaUrl = await fetch(url);\n  return pegaUrl.json();\n}\n\nasync function mostrarInicial() {\n  const pegaSaldos = await getUrl(urlInfo);\n  let inicioReceita = 0;\n  let inicioDespesa = 0;\n\n  pegaSaldos.forEach((pega) => {\n    inicioReceita += +pega.receita;\n    inicioDespesa += +pega.despesa;\n  });\n  const inicioSaldo = inicioReceita - inicioDespesa;\n  inicioSpanReceita.innerText = inicioReceita.toFixed(2);\n  inicioSpanDespesa.innerText = inicioDespesa.toFixed(2);\n  inicioSpanSaldo.innerText = inicioSaldo.toFixed(2);\n\n  if (+inicioSpanSaldo.innerText < 0) {\n    corInicioSaldo.classList.add(\"negativo\");\n  } else {\n    corInicioSaldo.classList.remove(\"negativo\");\n  }\n}\nif (inicioSpanReceita && inicioSpanDespesa && inicioSpanSaldo) {\n  mostrarInicial();\n}\n\nasync function deleteData(id) {\n  // e.preventDefault();\n  // console.log(e);\n  const response = await fetch(`${urlInfo}/${id}`, {\n    method: \"DELETE\",\n  });\n}\n\nasync function financiaList() {\n  const urls = await getUrl(urlInfo);\n  const app = document.querySelector(\"#app-detalhar\");\n\n  app.innerHTML = `\n  ${urls.map(\n    (url) => `\n    <div class=\"detalhamento\">\n    <div class=\"button-fechar\"><button class='fechar' mudarTudo(${url.tid}) onclick=\" deleteData(${url.id})\">X</button></div>\n    <form>\n    \n      <div>  \n        <label>Data</label>\n        <input id=\"data\"  onchange=\"mudarTudo(${url.id})\" type=\"date\" data-id=\"${url.id}\"  value=\"${url.date}\" placeholder=\"01/01/2001\"/>\n      </div>\n      <div>\n        <label>Descrição</label>\n        <input class=\"descricao\" onchange=\"mudarTudo(${url.id})\" type=\"text\" data-id=\"${url.id}\" value=\"${url.descricao}\"  />\n      </div>\n      <div>\n        <label>Receita</label>\n        <input id=\"receita\" onchange=\"mudarTudo(${url.id})\" type=\"number\" \n        data-id=\"${url.id}\"value=\"${url.receita}\" placeholder=\" R$ \" />\n      </div>\n      <div>\n        <label>Despesa</label>\n        <input class=\"cor-despesa\" onchange=\"mudarTudo(${url.id})\" data-id=\"${url.id}\"type=\"number\"value=\"${url.despesa}\"placeholder=\" R$ \"/>\n      </div>\n    </form>\n\n  </div>\n\n \n\n\n    `\n  )}\n  \n  \n  `;\n}\n\nconst button = document.querySelector(\"#botao-iniciar\");\nif (button) {\n  financiaList();\n}\nasync function postData(url = \"\", data = {}) {\n  const response = await fetch(url, {\n    method: \"POST\",\n    mode: \"cors\",\n    cache: \"no-cache\",\n    credentials: \"same-origin\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n    },\n    redirect: \"follow\",\n    referrerPolicy: \"no-referrer\",\n    body: JSON.stringify(data),\n  });\n}\n\nfunction ativaButton() {\n  if (button) {\n    financiaList();\n\n    postData(urlInfo, {\n      date: \"\",\n      descricao: \"\",\n      receita: \"\",\n      despesa: \"\",\n      id: \"\",\n    });\n  }\n}\nif (button) {\n  button.addEventListener(\"click\", ativaButton);\n}\nasync function putData(id, data = {}) {\n  // e.preventDefault();\n  // console.log(e);\n  const response = await fetch(`${urlInfo}/${id}`, {\n    method: \"PUT\",\n    mode: \"cors\",\n    cache: \"no-cache\",\n    credentials: \"same-origin\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n    },\n    redirect: \"follow\",\n    referrerPolicy: \"no-referrer\",\n    body: JSON.stringify(data),\n  });\n}\n\nasync function putSaldo(id, data = {}) {\n  // e.preventDefault();\n  // console.log(e);\n  const response = await fetch(urlTotal, {\n    method: \"PUT\",\n    mode: \"cors\",\n    cache: \"no-cache\",\n    credentials: \"same-origin\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n    },\n    redirect: \"follow\",\n    referrerPolicy: \"no-referrer\",\n    body: JSON.stringify(data),\n  });\n}\n\nasync function mudarTudo(id) {\n  const date = document.querySelector(`#data[data-id=\"${id}\"]`).value;\n  const descricao = document.querySelector(`.descricao[data-id=\"${id}\"]`).value;\n  const receita = document.querySelector(`#receita[data-id=\"${id}\"]`).value;\n  const despesa = document.querySelector(`.cor-despesa[data-id=\"${id}\"]`).value;\n  const totalR = document.querySelectorAll(\"#receita\");\n  const totalD = document.querySelectorAll(\".cor-despesa\");\n\n  let totalReceita = 0;\n  let totalDespesa = 0;\n\n  totalR.forEach((r) => {\n    totalReceita += +r.value;\n  });\n  totalD.forEach((d) => {\n    totalDespesa += +d.value;\n  });\n  const totalT = totalReceita - totalDespesa;\n  const totalSaldo = totalT.toFixed(2);\n  async function ativarTudo() {\n    putData(id, {\n      date,\n      descricao,\n      receita,\n      despesa,\n    });\n    putSaldo(1, {\n      totalReceita,\n      totalDespesa,\n      totalSaldo,\n    });\n  }\n  const buttonMais = document.querySelector(\".button-aplicar\");\n  buttonMais.addEventListener(\"click\", ativarTudo);\n}\n\nasync function saldo() {\n  const pegaSaldos = await getUrl(urlInfo);\n\n  const mostrarSaldo = document.querySelector(\".saldo-h1\");\n\n  let receita = 0;\n  let despesa = 0;\n  pegaSaldos.forEach((pegarSaldo) => {\n    receita += +pegarSaldo.receita.replace(\",\", \".\");\n    despesa += +pegarSaldo.despesa.replace(\",\", \".\");\n  });\n\n  const total = receita - despesa;\n\n  mostrarSaldo.innerText = total.toFixed(2);\n\n  if (mostrarSaldo.innerText > 0) {\n    mostrarSaldo.classList.add(\"positivo\");\n    mostrarSaldo.classList.remove(\"negativo\");\n  }\n  if (mostrarSaldo.innerText < 0) {\n    mostrarSaldo.classList.add(\"negativo\");\n    mostrarSaldo.classList.remove(\"positivo\");\n  }\n}\nif (button) {\n  saldo();\n}\n\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ })

/******/ });