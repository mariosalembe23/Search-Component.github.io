window.addEventListener("load", () => {
  const results = document.querySelectorAll(".result");
  const inputPesquisar = document.getElementById("pesquisar");
  const limparValue = document.getElementById("apagar");
  inputPesquisar.addEventListener("input", BuscarNomes);
  limparValue.addEventListener("click", () => {
    inputPesquisar.value = "";
    for (const result of results) {
      result.classList.add("hidden");
    }
  });

  function BuscarNomes() {
    const resultsDinamic = document.querySelectorAll(".result-dinamic");
    const valueInput = inputPesquisar.value;
    console.log(resultsDinamic);
    // PEGANDO AS PRIMEIRAS DUAS LETRAS INSERIDAS PELO USUÁRIO
    const valorInput = inputPesquisar.value
      .trim()
      .substring(0, 1)
      .toLowerCase();

    // console.log(valorInput);
    if (valueInput.trim() === "") {
      for (const result of results) {
        result.classList.remove("hidden");
      }
      for (const resultDinamic of resultsDinamic) {
        resultDinamic.classList.add("none");
      }
    } else {
      for (const result of results) {
        result.classList.add("hidden");
      }
      const resultsBlock = document.getElementById("results-block");
      fetch("/data.json")
        .then((response) => response.json())
        .then((json) => {
          const data = json.filter((nome) =>
            nome.name.toLowerCase().startsWith(valorInput)
          );

          if (data.length !== 0) {
            data.forEach((Element) => {
              const div = document.createElement("div");
              const p = document.createElement("p");
              const a = document.createElement("a");
              const i = document.createElement("i");

              // ATRIBUINDO ATRIBUTOS
              div.setAttribute(
                "class",
                "result-dinamic flex items-center justify-between"
              );
              p.setAttribute("class", "result-name font-semibold text-white");
              i.setAttribute(
                "class",
                "fa-solid fa-circle-info text-green-500 transition-all hover:text-white"
              );

              p.textContent = Element.name;
              div.appendChild(p);
              resultsBlock.appendChild(div);
              // console.log(p.textContent);
            });
          }else{
            
          }
        });
    }
  }

  BuscarNomes();
});
