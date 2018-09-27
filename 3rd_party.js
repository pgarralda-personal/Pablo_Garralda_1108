/* Just add it as script element  to execute */
'use strict';

function insert_badge(badge_data, DOM_dest) {
    var feature_image = document.createElement('img'),
        header_div = document.createElement('div'),
        footer_div = document.createElement('div'),
        badge_div = document.createElement('div'),
        avatar_image = document.createElement('img'),
        username_span = document.createElement('span'),
        date_span = document.createElement('span'),
        str_font_family = '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
    feature_image.src = badge_data.image_url;
    header_div.appendChild(avatar_image);
    header_div.appendChild(username_span);
    badge_div.appendChild(header_div);
    badge_div.appendChild(feature_image);
    footer_div.appendChild(date_span);
    badge_div.appendChild(footer_div);
    DOM_dest.innerHTML = '';
    DOM_dest.appendChild(badge_div);
    username_span.innerHTML = badge_data.username_str;
    username_span.style['font-family'] = str_font_family;
    username_span.style['font-weight'] = 'bolder';
    username_span.style.color = 'black';
    username_span.style.padding = '4%';
    date_span.innerHTML = badge_data.date_str.split('T')[0];
    date_span.style['font-family'] = str_font_family;
    date_span.style.color = 'darkgrey';
    date_span.style.padding = '5%';
    avatar_image.src = badge_data.avatar_url;
    avatar_image.style['max-width'] = '48px';
    badge_div.style['max-width'] = '90%';
    avatar_image.style.width = '10%';
    badge_div.style.width = '70%';
    footer_div.style['align-items'] = 'center';
    footer_div.style['background-color'] = 'white';
    footer_div.style['padding-bottom'] = '5%';
    footer_div.style['padding-top'] = '5%';
    header_div.style.display = 'flex';
    header_div.style['padding-left'] = '3%';
    header_div.style['padding-bottom'] = '1%';
    header_div.style['align-items'] = 'center';
    header_div.style['background-color'] = 'white';
    badge_div.style.padding = '2%';
    badge_div.style['background-color'] = '#fafafa';

}

function switch_images(source_json_url, DOM_dest) {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', source_json_url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var source_json = JSON.parse(req.responseText),
                    badge_data = {};
                console.log('Got JSON file');
                console.log(source_json);
                badge_data.image_url = source_json.data.images.normal;
                badge_data.date_str = source_json.data.date_published;
                badge_data.username_str = source_json.data._embedded.uploader.username;
                badge_data.avatar_url = source_json.data._embedded.uploader.avatar_url;
                console.log(badge_data);
                insert_badge(badge_data, DOM_dest);
            } else {
                console.log('Error: could not load JSON file (status=' + req.status + ')');
            }
        }
    };
    req.send(null);
}

var JSON_URL = 'https://api.olapic.com/media/2899395330?auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2';
var DOM_element = document.getElementsByClassName('resources--featured-image')[0];
switch_images(JSON_URL, DOM_element);
