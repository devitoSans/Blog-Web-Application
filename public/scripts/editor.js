// TODO
// Refactor this.

document.querySelectorAll("textarea").forEach(function(textarea) {
    let defaultHeight = 300;
    const getNewHeight = (curr) => {
        return (curr.scrollHeight > defaultHeight ? curr.scrollHeight : defaultHeight);
    }
    textarea.style.height = "auto";
    textarea.style.height = getNewHeight(textarea) + "px";
  
    textarea.addEventListener("input", function() {
        let scrollLeft = window.scrollX ||
        (document.documentElement || document.body.parentNode || document.body).scrollLeft;
     
        let scrollTop  = window.scrollY ||
        (document.documentElement || document.body.parentNode || document.body).scrollTop;

        this.style.height = "auto";
        this.style.height = getNewHeight(this) + "px";
        console.log(this.style.height);

        window.scrollTo(scrollLeft, scrollTop);
    });
});