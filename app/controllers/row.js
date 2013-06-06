var result = arguments[0];

$.image.image = result.profile_image_url;
$.name.text = result.from_user;
$.text.text = result.text;

$.row.result = result;