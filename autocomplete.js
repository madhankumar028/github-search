(function() {

    'use strict';

    var input = document.getElementById('search');
    
    const baseUrl = 'https://api.github.com/users';

    var defaultUsers = ['madhankumar028', 'arunkumar47', 'amkrish'];
    
    input.addEventListener('focus', getUsers);

    input.addEventListener('keyup', watchChanges);
    
    function watchChanges(event) {
        if (input.value.length > 4)
            getUserBasedOnKeypress(input.value);
    }

    function getUserBasedOnKeypress(userName) {

        var xhr = new XMLHttpRequest(),
            url = `${baseUrl}/${userName}`;

        xhr.onreadystatechange = function() {            
            if (xhr.readyState == XMLHttpRequest.DONE) {
                constructUserInfo(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    function getUsers() {

        defaultUsers.forEach(function(user) {
            getDefaultUser(user);
        });
    }

    function getDefaultUser(userName) {

        var xhr = new XMLHttpRequest(),
            url = `${baseUrl}/${userName}`;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                constructDefaultUser(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    function constructDefaultUser(user) {

        var userMenu = document.createElement('div'),
            img = document.createElement('img');

        img.setAttribute('img', user.avatar_url);

        img.style.width = '30px';

        userMenu.appendChild(img);

        // document.getElementById('Autocomplete-menu').appendChild(userMenu);

        console.log(userMenu);    
    }

    function constructUserInfo(user) {

        var menu = document.getElementById('menu'),
            p = document.createElement('LI');
        
        if (user.login !== undefined) {            
            var text = document.createTextNode(user.login),
                para = menu.appendChild(text);      
        } else {
            var text = document.createTextNode('user not found'),
                para = menu.appendChild(text);        
        }
    }

}());
