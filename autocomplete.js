(function() {

    'use strict';

    var input = document.getElementById('search'),
        defaultUsers = ['madhankumar028', 'arunkumar47', 'amkrish'],
        memoize = {};
    
    const baseUrl = 'https://api.github.com/users';
    
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
            if (Object.keys(memoize).length == 0) {
                getDefaultUser(user);                                
            }
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

        var autoMenu = document.getElementById('Autocomplete-menu'),
            userMenu = document.createElement('div'),
            img = document.createElement('img');

        memoize[user.login] = user;

        console.log(memoize);

        userMenu.className = 'pull-left';

        img.setAttribute('src', user.avatar_url);

        img.style.width = '30px';

        userMenu.appendChild(img);

        autoMenu.appendChild(userMenu);

        console.log(autoMenu);    
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
