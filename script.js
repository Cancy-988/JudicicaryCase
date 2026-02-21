fetch("data.json")
  .then(response => response.json())
  .then(data => {

    // Case Info
    document.getElementById("case-name").textContent = data.case_info.name;
    document.getElementById("court-info").textContent = data.case_info.court;
    document.getElementById("case-number").textContent = data.case_info.case_number;
    document.getElementById("judgment-date").textContent = data.case_info.judgment_date;
    document.getElementById("decision").textContent = data.case_info.decision;
    document.getElementById("bench-strength").textContent = data.case_info.bench_strength;

    // Timeline
    const timelineList = document.getElementById("timeline-list");
    data.timeline.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.date + " - " + item.event;
        timelineList.appendChild(li);
    });

    // Bench Table
    const benchTable = document.getElementById("bench-table");
    data.bench.forEach(judge => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${judge.name}</td>
            <td>${judge.position}</td>
            <td>${judge.opinion}</td>
        `;
        benchTable.appendChild(row);
    });

    // Articles
    const articlesList = document.getElementById("articles-list");
    data.constitutional_articles.forEach(article => {
        const li = document.createElement("li");
        li.textContent = article.article + " - " + article.meaning;
        articlesList.appendChild(li);
    });

    // Impact
    const impactList = document.getElementById("impact-list");
    data.impact.forEach(point => {
        const li = document.createElement("li");
        li.textContent = point;
        impactList.appendChild(li);
    });

    // Chart
    const ctx = document.getElementById("judgeChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Majority", "Dissent"],
            datasets: [{
                data: [data.case_info.majority, data.case_info.dissent]
            }]
        }
    });

  });