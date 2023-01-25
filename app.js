
const track = document.getElementById("image-track");

// Get current mouse X position
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

// Reset mouse positions
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    // if mouse is not clicked or dragged at all do nothing
    if (track.dataset.mouseDownAt === "0") {
        return;
    }
    // Mouse delta is the intermediary result, from the point where the mouse was initially clicked to where it currently is
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;

    // maxDelta is the maximum scroll width. Since it takes half a screen scroll to move to the end,
    // it will be the width of the screen divide by 2
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    // Constantly sets the new old percentage as the ending point of the new percentage
    track.dataset.percentage = nextPercentage;


    track.animate({
        transform:`translate(${nextPercentage}%, -50%)`
    }, {duration:1200, fill:"forwards"});

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition:`${100 + nextPercentage}% 50%`
    }, {duration:1200, fill:"forwards"});
    }
}

