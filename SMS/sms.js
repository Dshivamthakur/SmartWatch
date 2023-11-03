
$list = document.getElementsByClassName('list')[0];

var text = {
    java:'Java is a widely used object-oriented programming language and software platform that runs on billions of devices, including notebook computers, mobile devices, gaming consoles, medical devices and many others.',
    html: 'Hypertext Markup Language, a standardized system for tagging text files to achieve font, colour, graphic, and hyperlink effects on World Wide Web pages.',
    css:'CSS is the acronym of “Cascading Style Sheets”. CSS is a computer language for laying out and structuring web pages (HTML or XML).'
}

$list.onclick = (e) => {
    if(e.target.matches('[data-listItem]'))
    $list.innerHTML = text[e.target.classList.value];
}