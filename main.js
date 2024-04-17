$(function () {

    $(".prize .item").click(function () {
        $(".prize .item").removeClass("active");
        $(this).addClass("active");
    });

    $(".faq .item .head").click(function () {
        var item = $(this).parent();
        if (item.hasClass("move")) return;
        var drop = item.find(".drop");
        var head = item.find(".head");
        var plus = item.find(".head svg");
        if (item.hasClass("opened")) {
            item.addClass("move");

            drop.css("opacity", "0");
            item.css("height", head.outerHeight() + "px");
            plus.css("transform", "");

            setTimeout(function () {
                drop.css("display", "");
                item.css("height", "");
                item.removeClass("move");
                item.removeClass("opened");
            }, 200);
        } else {
            item.addClass("move");

            var itemHeight = item.outerHeight();
            drop.css("opacity", "0").css("display", "block");
            var dropHeight = drop.outerHeight();

            var h = dropHeight + itemHeight + 26;
            console.log(dropHeight);
            console.log(itemHeight);
            item.css("height", itemHeight + "px");
            setTimeout(function () {
                item.css("height", h + "px");
                plus.css("transform", "rotate(45deg)");
                setTimeout(function () {
                    drop.css("opacity", "1");
                    item.removeClass("move");
                    item.addClass("opened");
                }, 200);
            }, 1);
        }
    });

    $(".steps .item").click(function () {
        selectStep($(this).attr("data-step"));
    });

    $('.steps .skins .grid.available div').click(function () {
        $('.steps .skins .grid.available div').removeClass('selected');
        $(this).addClass('selected');
    });

    var selectedStep = localStorage.getItem("selected-step");
    if (selectedStep) {
        selectStep(selectedStep);
    } else {
        selectStep("get-skins");
    }

    $(document).on("click", 'a[href^="#"]', function (event) {
        event.preventDefault();

        scrollToElement($.attr(this, "href"));
    });

    var state = window.location.search;
    if (state == "?maintenance=403") {
        $('#maintenance').fadeIn();
    } else {
        if (state == "?email") {
            $('#email_maintenance').fadeIn();
        } else {
            return false;
        }
    }
});

function scrollToElement(selector) {
    var top = $(selector).offset().top;
    var headerHeight = $("header").outerHeight();
    top -= headerHeight;
    top -= 20;

    $("html, body").animate(
        {
            scrollTop: top,
        },
        500
    );
}

function selectStep(step) {
    $("[data-step]").removeClass("active");
    $(`[data-step="${step}"]`).addClass("active");
    localStorage.setItem("selected-step", step);
}