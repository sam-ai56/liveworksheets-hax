// Sam Miller

// SETTINGS
const random_enabled = true;        // :D
const random_errors = 40;          // A number of random errors are possible
const random_max = 614;           // Max
const random_min = 207;          // Min
const white_spaces = false;     // Spaces instead of answers
const random_char = false;     // Replaces a single character in the text

// do not touch
const characters = 'abcdefghijklmnopqrstuvwxyz,./;';
var editable_ids = [];
var selectable_ids = [];
var tick_ids = [];
var selectbox_ids = [];
var errors_count = 0;     

document.querySelectorAll("div.editablediv").forEach(e => {
    editable_ids.push(e.id);
});

document.querySelectorAll("div.selectablediv").forEach(e => {
    selectable_ids.push(e.id);
});

document.querySelectorAll("div.tickbox").forEach(e => {
    tick_ids.push(e.id);
});

document.querySelectorAll("select.selectbox").forEach(e => {
    selectbox_ids.push(e.id);
});


function Random(max) {
    return Math.floor(Math.random() * max);
}

editable_ids.forEach(e => {
    const id = e.match(/\d+/g);
    const content_guard_text = contenidoaguardar[id][0].replaceAll("$", "'");
    const alternative_text = content_guard_text.split("/");

    // Random character in text
    if(Random(random_max) > random_min && errors_count < random_errors && random_enabled && random_char){
        errors_count++;
        document.getElementById(e).innerHTML = alternative_text[Random(alternative_text.length - 1)]
            .replace(characters.charAt(Random(characters.length - 1)), characters.charAt(Random(characters.length - 1)));
        savetextbox(id);
        return;
    }

    // White space
    if(Random(random_max) > random_min && errors_count < random_errors && white_spaces && random_enabled){
        errors_count++;
        return;
    }

    if (alternative_text.length >= 2) {
        // Random character in text
        if(Random(random_max) > random_min && errors_count < random_errors && random_enabled && random_char){
            errors_count++;
            document.getElementById(e).innerHTML = alternative_text[Random(alternative_text.length - 1)]
                .replace(characters.charAt(Random(characters.length - 1)), characters.charAt(Random(characters.length - 1)));
            savetextbox(id);
            return;
        }

        // White space
        if(Random(random_max) > random_min && errors_count < random_errors && white_spaces && random_enabled){
            errors_count++;
            return;
        }

        document.getElementById(e).innerHTML = alternative_text[Random(alternative_text.length - 1)];
        savetextbox(id);
        return;
    }

    document.getElementById(e).innerHTML = content_guard_text;
    savetextbox(id);
});

selectable_ids.forEach(e => {
    const id = e.match(/\d+/g);
    const content_guard_text = contenidoaguardar[id][0];
    const select = content_guard_text.split(":")[1];

    if (select != "yes") {
        return;
    }

    // Random answer
    if(Random(random_max) > random_min && errors_count < random_errors && random_enabled){
        errors_count++;
        selectanswer(selectable_ids[Random(selectable_ids.length-1)].match(/\d+/g));
        return;
    }

    // White space
    if(Random(random_max) > random_min && errors_count < random_errors && white_spaces && random_enabled){
        errors_count++;
        return;
    }

    selectanswer(id);
});

tick_ids.forEach(e => {
    const id = e.match(/\d+/g);
    const content_guard_text = contenidoaguardar[id][0];
    const tick = content_guard_text.split(":")[1];

    if (tick != "YES") {
        return;
    }

    // Random answer
    if(Random(random_max) > random_min && errors_count < random_errors && random_enabled){
        errors_count++;
        tickanswer(tick_ids[Random(tick_ids.length-1)].match(/\d+/g));
        return;
    }

    // White space
    if(Random(random_max) > random_min && errors_count < random_errors && white_spaces && random_enabled){
        errors_count++;
        return;
    }

    tickanswer(id);
});

selectbox_ids.forEach(e => {
    const id = e.match(/\d+/g);
    const content_guard_text = contenidoaguardar[id][0];
    const choose = content_guard_text.split(":")[1];
    const chooselist = choose.split("/");

    chooselist.forEach((t, i) => {
        if (t.substring(0, 1) != "*") {
            return;
        }

        // Random answer
        if(Random(random_max) > random_min && errors_count < random_errors && random_enabled){
            errors_count++;
            document.getElementById(e).options.selectedIndex = Random(chooselist.length);
            return;
        }

        // White space
        if(Random(random_max) > random_min && errors_count < random_errors && white_spaces && random_enabled){
            errors_count++;
            return;
        }

        document.getElementById(e).options.selectedIndex = i+1;
    });
});

console.clear();
random_enabled ? 
    console.log("Errors: ", errors_count) 
    : 
    console.log("Random errors are disabled.");
console.log("All done!");
console.log("Find the rabbit hole...");