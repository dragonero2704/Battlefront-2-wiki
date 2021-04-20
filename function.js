function showhide() {
    let menu = document.getElementsByClassName("menu")[0];
    let hero_content = document.getElementsByClassName("hero__content")[0];

    menu.classList.toggle("menu-show");
    hero_content.classList.toggle("hide-hero__content")
}