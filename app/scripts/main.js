$(function() {

  var cardTemplate = twig({
      id: 'card',
      href: "templates/card.html",
      async: false
  })

  for (var i = 0; i < 2; i++) {
    var cardHTML = twig({ ref: 'card' }).render();

    $('.isotope').append(cardHTML)
  }

  $('.morphTo').morphTo()

})
