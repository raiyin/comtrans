function init() {
    let map = new ymaps.Map('map-test', {
        center: [59.92975, 30.28962],
        zoom: 16
    });
}

ymaps.ready(init);
