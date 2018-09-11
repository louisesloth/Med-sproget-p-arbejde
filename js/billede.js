window.onload = function () {

    const img = document.querySelector("#img");

    const lsImg = localStorage.getItem("userImg");

    img.setAttribute("src", lsImg);

};