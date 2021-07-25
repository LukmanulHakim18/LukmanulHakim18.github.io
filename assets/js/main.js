// -------------------- aboute section tab --------------------

(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item")
            && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            console.log(target);
            //deactive tab item
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active")
            //active tab item
            event.target.classList.add("active", "outer-shadow")

            //deactive existing tab content
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            //active existing tab content
            aboutSection.querySelector(target).classList.add("active")
        }
    })
})();


function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}
// -------------------- portfolio filter and popup --------------------
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let ItemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            //deactive existion active 'filter-item
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active")
            //active new filter'filter-item
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");

            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");

                }
            })
        }
    })
    portfolioItemsContainer.addEventListener("click", (event) => {
        const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;

        //get the portfolioItem index
        itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
        // console.log(portfolioItems[itemIndex].querySelector("img"));
        screenshots = portfolioItems[itemIndex].querySelector("img").getAttribute("data-screenshots");
        // convert scrinshoot into array
        screenshots = screenshots.split(",");
        if (screenshots.length === 1) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        } else {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        }
        slideIndex = 0;
        popupToggle();
        popupSlideShow();
        popupDetails();

    })
    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideShow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // activate loader animation
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate loader animation
            popup.querySelector(".pp-loader").classList.remove("active")
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;

    }
    // next slide

    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideShow();
    })

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideShow();
    })

    function popupDetails() {
        // if dont have details
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        // get the project details
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
        popup.querySelector(".pp-project-details").innerHTML = details;

    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();