(function() {

    'use strict';

    var input = document.getElementById('search');
    
    input.addEventListener('keyup', watchChanges);
    
    function watchChanges(event) {
        if (input.value.length > 4)
            getUser(input.value);
    };

    function getUser(userName) {
        
        const baseUrl = 'https://api.github.com/users';

        var xhr = new XMLHttpRequest(),
            url = baseUrl + '/' + userName;

        xhr.onreadystatechange = function() {            
            if (xhr.readyState == XMLHttpRequest.DONE) {
                constructUserInfo(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
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
