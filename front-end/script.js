document.addEventListener("DOMContentLoaded", function () {
  $("#guardarJuguete").on("click", function () {
    let datos = {
      nombre: $("#nombre").val(),
      precio: $("#precio").val(),
      stock: $("#stock").val(),
      descripcion: $("#descripcion").val(),
    };
    if ($("#id-juguete").val() === "") {
      crearJuguete(datos);
    } else {
      datos.id = $("#id-juguete").val();
      editarJuguete(datos);
    }
  });

  $("#agregarJuguete").on("click", function () {
    $("#id-juguete").val("");
  });
  $(".btn-warning").on("click", function () {
    let idJuguete = $(this).data("id");
    $("#id-juguete").val(idJuguete);
  });

  $(".btnEliminar").on("click", function () {
    let idJuguete = $(this).data("id");
    $("#id-juguete").val(idJuguete);
  });

  $("#btnEliminarJuguete").click(function () {
    let id = $("#id-juguete").val();
    eliminar(id);
  });
});
//al abrir el modalverifica si hay un id valido si lo hay lo rellena para un actualizar
$("#juguete").on("shown.bs.modal", function () {


  if ($("#id-juguete").val() !== "") {
    $.ajax({
      type: "GET",
      url: "http://localhost:81/apirestphpyesica/back-end/get_id_juguete.php",
      dataType: "JSON",
      data: { id: $("#id-juguete").val() },
      success: function (respuesta) {
        $("#nombre").val(respuesta[0].nombre);
        $("#precio").val(respuesta[0].precio);
        $("#stock").val(respuesta[0].stock);
        $("#descripcion").val(respuesta[0].descripcion);
      },
      error: function (error) {
        // Manejar errores
        console.error("Error en la solicitud AJAX:", error);
        Swal.fire({
          title: "Error",
          text: "error:" + error,
          icon: "error",
        });
      },
    });
  }else{
    $("#nombre").val("");
        $("#preio").val("");
        $("#stock").val("");
        $("#descripcion").val("");
  }
  
});

function crearJuguete(datos = {}) {
  let errores = false;

  for (let campo in datos) {
    if (datos[campo].trim() === "") {
      $("#" + campo)
        .removeClass("is-valid")
        .addClass("is-invalid");
      errores = true;
    } else {
      $("#" + campo)
        .removeClass("is-invalid")
        .addClass("is-valid");
    }
  }
  if (errores) {
    Swal.fire({
      title: "Error",
      text: "error: porfavor llene todos los campos",
      icon: "error",
    });
    return;
  }

  $.ajax({
    type: "POST",
    url: "http://localhost:81/apirestphpyesica/back-end/create_juguete.php",
    data: datos,
    dataType: "json",
    success: function (respuesta) {
      $("#juguete").modal("hide");

      $("#nombre").val(""),
        $("#precio").val(""),
        $("#stock").val(""),
        $("#descripcion").val(""),
        console.log(respuesta);
      Swal.fire({
        title: "Exito",
        text: respuesta.message,
        icon: "success",
        timer: 5000,
      }).then(() => {
        location.reload();
      });
    },
    error: function (error) {
      // Manejar errores
      console.error("Error en la solicitud AJAX:", error);
      Swal.fire({
        title: "Error",
        text: "error:" + error,
        icon: "error",
      });
    },
  });
}

function editarJuguete(datos = {}) {
  let errores = false;

  for (let campo in datos) {
    if (datos[campo].trim() === "") {
      $("#" + campo)
        .removeClass("is-valid")
        .addClass("is-invalid");
      errores = true;
    } else {
      $("#" + campo)
        .removeClass("is-invalid")
        .addClass("is-valid");
    }
  }
  if (errores) {
    Swal.fire({
      title: "Error",
      text: "error: porfavor llene todos los campos",
      icon: "error",
    });
    return;
  }

  $.ajax({
    type: "PUT",
    url: "http://localhost:81/apirestphpyesica/back-end/update_juguete.php",
    data: datos,
    dataType: "json",
    success: function (respuesta) {
      $("#juguete").modal("hide");

      $("#nombre").val(""),
        $("#precio").val(""),
        $("#stock").val(""),
        $("#descripcion").val(""),
        console.log(respuesta);
      Swal.fire({
        title: "Exito",
        text: respuesta.message,
        icon: "success",
        timer: 5000,
      }).then(() => {
        location.reload();
      });
    },
    error: function (error) {
      // Manejar errores
      console.error("Error en la solicitud AJAX:", error);
      Swal.fire({
        title: "Error",
        text: "error:" + error,
        icon: "error",
      });
    },
  });
}

function eliminar(id) {
  console.log(id);
  $.ajax({
    type: "DELETE",
    url: "http://localhost:81/apirestphpyesica/back-end/delete_juguete.php?id=" + id,
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      $('modalEliminar').modal('hide')
      Swal.fire({
        title: "Exito",
        text: respuesta.message,
        icon: "success",
        timer: 5000,
      }).then(() => {
        location.reload();
      });
    },
    error: function (error) {
      // Manejar errores
      console.error("Error en la solicitud AJAX:", error);
      Swal.fire({
        title: "Error",
        text: "error:" + error,
        icon: "error",
      });
    },
  });
}
