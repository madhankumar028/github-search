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

        // showLoading();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                constructDefaultUser(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    function constructDefaultUser(user) {

        var autoMenu        = document.getElementById('Autocomplete-menu'),
            dataset         = document.createElement('div'),
            userMenu        = document.createElement('div'),
            profileCard     = document.createElement('div'),
            profileDetails  = document.createElement('div'),
            profileStatus   = document.createElement('div'),
            img             = document.createElement('img'),
            name            = document.createElement('div'),
            mail            = document.createElement('div'),
            bio             = document.createElement('div'),
            repo            = document.createElement('div'),
            followers       = document.createElement('div'),
            following       = document.createElement('div'),
            userName        = document.createTextNode(user.login),
            info            = document.createTextNode(user.bio),
            repo            = document.createTextNode(user.public_repos),
            following       = document.createTextNode(user.following),
            followers       = document.createTextNode(user.followers);

        memoize[user.login] = user;

        dataset.className       = 'data-set';
        userMenu.className      = 'user';
        profileCard.className   = 'profile-card';
        profileStatus.className = 'profile-status';
        name.className          = 'user-name';
        mail.className          = 'mail';
        bio.className           = 'bio';
        repo.className          = 'repo';
        following.className     = 'following';
        followers.className     = 'followers';

        img.setAttribute('src', user.avatar_url);
        img.style.width = '30px';

        profileDetails.appendChild(profileCard);
        profileDetails.appendChild(userName);
        profileDetails.appendChild(info);

        profileStatus.appendChild(repo);
        profileStatus.appendChild(following);
        profileStatus.appendChild(followers);        

        profileCard.appendChild(img);
        profileCard.appendChild(profileDetails);
        profileCard.appendChild(profileStatus);

        console.log(profileCard);

        // hideLoading();
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

    /*function showLoading() {
        var loader = document.getElementById('loader').show();
    }

    function hideLoading() {
        var loader = document.getElementById('loader').hide();
    }*/

}());
