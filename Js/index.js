document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("profile-img");

  const img1 = "/logow.png";
  const img2 = "/doguinho.jpg";
  let showingFirst = true;

  img.addEventListener("click", () => {
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = showingFirst ? img2 : img1;
      img.style.opacity = 1;
      showingFirst = !showingFirst;
    }, 400);
  });
});

