chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  var currentTab = tabs[0];

  var pageIcon = document.getElementById("pageIcon");
  var pageName = document.getElementById("pageName");
  var message = document.getElementById("message");
  var doneButton = document.getElementById("doneButton");
  var editButton = document.getElementById("editButton");

  if (currentTab.url.includes("chrome://")) {
    message.textContent = "You can't bookmark this tab!";
    message.style.color = "red";
    pageIcon.setAttribute("hidden", true);
    doneButton.disabled = true;
    doneButton.style.cursor = "not-allowed";
  } else {
    pageIcon.src = currentTab.favIconUrl;
    pageName.textContent = currentTab.title;
  }

  doneButton.addEventListener("click", function () {
    const data = {
      userId: "1",
      folderId: 1,
      url: currentTab.url,
      name: currentTab.title,
      icon: currentTab.favIconUrl,
    };

    const endpointUrl = "http://localhost:5000/bookmarks";

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    };

    fetch(endpointUrl, options).then((response) => {
      if (response.ok) {
        message.textContent = "Page Bookmarked!";
      } else {
        message.textContent = "Error!";
        message.style.color = "red";
      }

      setTimeout(function () {
        message.textContent = "";
      }, 5000);
    });
  });

  editButton.addEventListener("click", function () {
    window.open("http://localhost:3000/", "_blank").focus();
  });
});
