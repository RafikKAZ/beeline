fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxyJmS2E16oV2zvl_6aHIWFBxMyu1X6RLrpanNZu1IpmPu34WxinYAiKG8JApl7buNX/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(result => {
    console.log('Success:', result);
    alert('Заявка успешно отправлена!');
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке заявки.');
  });
