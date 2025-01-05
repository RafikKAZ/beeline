let map, placemark;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');

  // Change map center on city selection
  document.getElementById('city').addEventListener('change', (e) => {
    const cities = {
      "Алматы": [43.222, 76.851],
      "Астана": [51.169, 71.449],
      "Костанай": [53.214, 63.624]
    };
    const selectedCity = e.target.value;
    if (selectedCity) {
      map.setCenter(cities[selectedCity], 12);
    }
  });

  // Initialize map
  ymaps.ready(() => {
    map = new ymaps.Map('map', {
      center: [43.222, 76.851],
      zoom: 12
    });

    map.events.add('click', (e) => {
      const coords = e.get('coords');
      if (placemark) {
        placemark.geometry.setCoordinates(coords);
      } else {
        placemark = new ymaps.Placemark(coords, {}, { draggable: true });
        map.geoObjects.add(placemark);
      }
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject ? firstGeoObject.getAddressLine() : 'Адрес не найден';
        document.getElementById('address').value = address;
      });
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch('https://script.google.com/macros/s/AKfycbxyJmS2E16oV2zvl_6aHIWFBxMyu1X6RLrpanNZu1IpmPu34WxinYAiKG8JApl7buNX/exec', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        alert('Заявка успешно отправлена!');
        form.reset();
      })
      .catch(error => {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка при отправке заявки.');
      });
  });
});
