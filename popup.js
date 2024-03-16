chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  var currentTab = tabs[0];

  var pageIcon = document.getElementById("pageIcon");
  var pageName = document.getElementById("pageName");
  var message = document.getElementById("message");
  var doneButton = document.getElementById("doneButton");
  var editButton = document.getElementById("editButton");

  if (currentTab.url == "chrome://newtab/") {
    message.textContent = "You can't bookmark this tab!";
    message.style.color = "red";
    pageIcon.setAttribute("hidden", true);
  } else {
    pageIcon.src = currentTab.favIconUrl;
    pageName.textContent = currentTab.title;
    message.textContent = "Page Bookmarked!";
  }

  setTimeout(function () {
    message.textContent = "";
  }, 5000);

  doneButton.addEventListener("click", function () {
    window.close();
  });

  editButton.addEventListener("click", function () {
    window.open("http://localhost:3000/", "_blank", "aaa=9").focus();
  });

  // Dados a serem enviados
  const data = {
    user_id: 1,
    folder_id: 1,
    url: currentTab.url,
    name: currentTab.title,
    color: "#FAFAFA",
    icon: currentTab.favIconUrl,
  };

  const endpointUrl = "http://localhost:5000/bookmark";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(endpointUrl, requestOptions);
});
