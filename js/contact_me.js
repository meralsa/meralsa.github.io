$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // zusätzliche Fehlermeldungen oder Ereignisse
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // Standard-Formularverhalten verhindern

            // Werte aus dem Formular abrufen
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // Für Erfolgs-/Fehlermeldung

            // Überprüfen auf Leerzeichen im Namen für Erfolgs-/Fehlermeldung
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            // AJAX-Anfrage an Formspree
            $.ajax({
                url: "https://formspree.io/f/mdkeoraw",  // Deine echte Formspree-ID
                method: "POST",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                },
                dataType: "json",
                success: function() {
                    // Erfolgsnachricht
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    // Alle Felder zurücksetzen
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fehlermeldung
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    // Alle Felder zurücksetzen
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/* Wenn auf den Namen geklickt wird, verstecke die Fehlermeldungen */
$('#name').focus(function() {
    $('#success').html('');
});