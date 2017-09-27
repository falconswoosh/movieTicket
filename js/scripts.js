// If not a valid ticket,
function Ticket(movie, quantity, date, time, age) {
  this.movie = movie;
  this.quantity = quantity;
  this.date = date;
  this.time = time;
  this.age = age;
}

Ticket.prototype.getPrice = function() {
  var price = 8;
  if (this.age <= 13 || this.age >= 65) {
    price = 4;
  }
  if (this.movie.isNew) {
    price += 4;
  }
  else if (this.movie.time <= 12 && this.movie.time >= 10) {
    price /= 2;
  }
  price *= this.quantity;
  return price;
}

function Movie(title, rating, isNew) {
  this.title = title;
  this.rating = rating;
  this.isNew = isNew;
}

var time12Hr = {
  10: "10:00am-12:00pm",
  12: "12:00pm-2:00pm",
  14: "2:00pm-4:00pm",
  16: "4:00pm-6:00pm",
  18: "6:00pm-8:00pm",
  20: "8:00pm-10:00pm",
  22: "10:00pm-12:00am"
}

function timeOutput12Hr(timeInput) {
  return time12Hr[timeInput];
}

$(function() {
  var today = new Date().toISOString().split('T')[0];
  $("#date input").attr("min", today);

  $("form").submit(function(event) {
    event.preventDefault();
    var movieInput = $("#movie select").val();
    var quantityInput = $("#quantity input").val();
    var dateInput = $("#date input").val();
    var timeInput = $("#time select").val();
    var ageInput = $("#age input").val();

    $("#ticket-confirmation").hide();
    if (movieInput === "" || /[^\d]/.test(quantityInput) ||  quantityInput > 300 || dateInput === "" || timeInput === "" || (timeInput < new Date().getHours() && dateInput === today) ||  /[^\d]/.test(ageInput) || ageInput >= 150) {
      $("form").addClass("has-error");
      $("#error-message").show();
    }
    else {
      $("form").removeClass("has-error");
      $("#error-message").hide();

      var ticket = new Ticket(movieInput, quantityInput, dateInput, timeInput, ageInput);
      var price = ticket.getPrice();

      $("#ticket-confirmation").show();
      $("#output-title").text(movieInput);
      $("#output-quantity").text(quantityInput);
      $("#output-date").text(dateInput);
      $("#output-time").text(timeOutput12Hr(timeInput));
      $("#output-cost").text("$" + price);
    }
  });
});
