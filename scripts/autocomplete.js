(function() {

    'use strict';

    var input = document.getElementById('search');
    
    const baseUrl = 'https://api.github.com/users';
    
    input.addEventListener('keyup', watchChanges);
    
    function watchChanges(event) {
        if (input.value.length > 4)
            getUser(input.value);
    };

    function getUser(userName) {
    
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
        console.log(user.login);     
    }

}());
