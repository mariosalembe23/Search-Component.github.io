window.addEventListener("load", () => {
  const results = document.querySelectorAll(".result");
  const inputPesquisar = document.getElementById("pesquisar");
  const buscar = document.getElementById("buscar");
  const notFound = document.getElementById("notFound");

  function BuscarNomes() {
    const resultsDinamic = document.querySelectorAll(".result-dinamic");
    const valueInput = inputPesquisar.value;

    if (valueInput.trim() === "") {
      document.getElementById("text-recent").classList.remove("hidden");
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
          const data = json.filter((nome) => {
            return (
              nome.name.toLowerCase().includes(valueInput.toLowerCase()) ||
              nome.name.toLowerCase() === valueInput.toLowerCase()
            );
          });
          if (data.length !== 0) {
            document.getElementById("text-recent").classList.add("hidden");
            notFound.classList.add("hidden");
            resultsBlock.classList.remove("none");

            data.forEach((Element) => {
              let div = document.createElement("div");
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
              a.setAttribute("href", "https://github.com/mariosalembe23");
              a.appendChild(i);
              p.textContent = Element.name;
              div.appendChild(p);
              div.appendChild(a);
              resultsBlock.appendChild(div);
            });
          } else {
            notFound.classList.remove("hidden");
            resultsBlock.classList.add("none");
          }
        });
    }
  }
  buscar.addEventListener("click", () => {
    BuscarNomes();
    const resultsDinamic = document.querySelectorAll(".result-dinamic");
    for (const resultDinamic of resultsDinamic) {
      resultDinamic.classList.add("none");
    }
    document.getElementById("text-recent").classList.remove("hidden");
  });
});
