(function() {

    'use strict';

    var input = document.getElementById('search');
    //     users = [];        
    
    const baseUrl = 'https://api.github.com/users';
    
    input.addEventListener('keyup', function(event) {

        if (input.value.length > 4)
            getUser(input.value);
    });

    function getUser(userName) {
    
        var xhr = new XMLHttpRequest(),
            url = baseUrl + '/' + userName;

        xhr.onreadystatechange = function() {            
            if (xhr.readyState == XMLHttpRequest.DONE) {
                constructUserInfo(JSON.parse(xhr.responseText));
                // console.log(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    function constructUserInfo(user) {
        console.log(user.login);        
    }

}());
