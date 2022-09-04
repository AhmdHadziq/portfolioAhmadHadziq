function getPageList(totalPages, page, maxLength) {
  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }
  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

  if (totalPages <= maxLength) {
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
  }

  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
  }
  return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
  var numberOfItems = $(".row .col-md-4").length;
  var limitPerPage = 6; // How Many card items visible per a page
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  var paginationSize = 5; // How many page elements visible in the pagination
  var currentPage;

  function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;
    currentPage = whichPage;

    $(".row .col-md-4")
      .hide()
      .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
      .show();

    $(".pagination li").slice(1, -1).remove();

    getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
      $("<li>")
        .addClass("page-item")
        .addClass(item ? "current-page" : "dots")
        .toggleClass("active", item === currentPage)
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({ href: "javascript:void(0)" })
            .text(item || "...")
        )
        .insertBefore(".next-page");
    });

    $(".previous-page").toggleClass("disable", currentPage === 1);
    $(".next-page").toggleClass("disable", currentPage === totalPages);
    return true;
  }

  $(".pagination").append(
    $("<li>")
      .addClass("page-item")
      .addClass("previous-page")
      .append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
    $("<li>")
      .addClass("page-item")
      .addClass("next-page")
      .append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
  );

  $(".row").show();
  showPage(1);

  $(document).on("click", ".pagination li.current-page:not(.active)", function () {
    return showPage(+$(this).text());
  });

  $(".next-page").on("click", function () {
    return showPage(currentPage + 1);
  });
  $(".previous-page").on("click", function () {
    return showPage(currentPage - 1);
  });
});

// Contact
const scriptURL = "https://script.google.com/macros/s/AKfycbwO62cRBnebO_0H9S1zI9tqyGqOOVjHD7urYmNmjepTC-sNbohBhk6MhBPjYSkuzCXcJg/exec";
const form = document.forms["portfolio-contact-form"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ketika tombol submit diklik
  // tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // tampilkan tombol kirim, hilangkan tombol loading
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      // tampilkan alert
      myAlert.classList.toggle("d-none");
      // reset formnya
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
