let scores = document.getElementById("result");
let tableBody = document.querySelector("tbody");
let dropdownList = document.querySelector("select");
let header = document.querySelector("h1");

window.addEventListener("load", () => {
  getListOfAverageStats();
});

const getListOfAverageStats = async () => {
  const url =
    "https://api.sportradar.us/nba/trial/v7/en/seasons/2021/REG/leaders.json?api_key=vr8u2qhmpyns5n66vasx6mb2";
  const response = await fetch(url);

  const data = await response.json();
  const { categories } = data;
  const averageStats = categories.filter(
    (category) => category.type == "average"
  );

  averageStats.forEach((statItem) => {
    dropdownList.innerHTML += `<option>${statItem.name}</option>`;
  });
  getSelectedStat(averageStats);
  console.log(averageStats);
};

const getSelectedStat = (all) => {
  dropdownList.addEventListener("change", (e) => {
    const selectedStat = e.target.options[e.target.selectedIndex].value;
    all.forEach((statItem) => {
      if (statItem.name == selectedStat) {
        tableBody.innerHTML = "";
        const scoreRanking = statItem.ranks;
        scoreRanking.forEach((player) => {
          tableBody.innerHTML += `<tr>
        <td>${player.rank}</td>
        <td>${player.player.full_name}</td>
        <td>${player.teams[0].name}</td>
        <td>${player.score}</td>
        </tr>`;
        });
        header.innerHTML = `${statItem["name"]
          .split("_")
          .join(" ")
          .toUpperCase()}`;
      }
    });
  });
};
