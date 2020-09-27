


//TODO: Настроить стили



$(function() {

  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "6735c5068617fdebda20568f60f08bc29ac75075";
  
  //Создаём и скрывает подсказку до первого запроса
  $('#address').after("<a href='#' id = tooltip-address><span id='tooltip-adresstext'>всплывающая подсказка</span></a>");
  $('#tooltip-address').css({
    'display': 'inline-block',
    'position': 'absolute',
    'margin-left': '5px',
    'width': 'auto',
    'color': 'white',
    'padding': '5px',
    'background-color': 'teal',
    'text-decoration': 'none',
  });
  $('#tooltip-address').hide();




  //Следит за событием 'input' в поле ввода
  $('#address').on("input",function(){

    let text = $(this).val();

    if (text === '') {
      $('#tooltip-address').hide();
    } else {
      askTooltip(text);
    }
  })

  //Следит за событием 'click' на всплывающей подсказке
  $('#tooltip-address').click(fillInput)

  //следит за событием 'blur' в поле ввода
  $('#address').blur(hideTooltip);




  //Запрос подсказки с сервера
  async function askTooltip(text) {
    let query = text;

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
      },
      body: JSON.stringify({query: query})  
    };

    let response = await fetch(url, options);
    response = await response.text();
    let address = (JSON.parse(response)).suggestions[0].unrestricted_value;


    showTooltip(address);
  }


  //Показ подсказки пользователю
  function showTooltip(address) {
    $('#tooltip-adresstext').text(address);
    $('#tooltip-address').show();
  }


  //Скрытие подсказки
  function hideTooltip(){
    setTimeout(() => $('#tooltip-address').hide(), 100);
  }


  //Автозаполнение поля ввода 
  function fillInput() {
    let text = $('#tooltip-adresstext').text();
    $('#address').val(text);
    $('#tooltip-address').hide();
  }
  
  
});