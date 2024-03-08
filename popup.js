chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  var currentTab = tabs[0];
  var pageIcon = document.getElementById("pageIcon");
  var pageName = document.getElementById("pageName");
  var message = document.getElementById("message");
  var doneButton = document.getElementById("doneButton");
  var editButton = document.getElementById("editButton");

  pageIcon.src = currentTab.favIconUrl;
  pageName.textContent = currentTab.title;

  message.textContent = "Page Bookmarked!";

  setTimeout(function () {
    message.textContent = "";
  }, 5000);

  doneButton.addEventListener("click", function () {
    window.close();
  });

  editButton.addEventListener("click", function () {
    window.open("http://localhost:3000/", "_blank").focus();
  });
});
