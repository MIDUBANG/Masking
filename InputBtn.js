var fileTarget = document.getElementsByClassName("upload-hidden")[0];

fileTarget.addEventListener("change", function () {
  document.querySelector(".upload-name").classList.remove("hidden");

  if (window.FileReader) {
    var filename = fileTarget.files[0].name;
  } else {
    var filename = fileTarget.value.split("/").pop().split("\\").pop();
  }

  document.getElementsByClassName("upload-name")[0].value = filename;
});
