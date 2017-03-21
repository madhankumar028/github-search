(function() {

    'use strict';

    var input = document.getElementById('search'),
        defaultUsers = ['madhankumar028', 'arunkumar47', 'amkrish'];
    
    const baseUrl = 'https://api.github.com/users';
    
    input.addEventListener('focus', getUsers);
    input.addEventListener('focusout', removeDefaultUsers)
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

        // showLoading();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                // console.log(JSON.parse(xhr.responseText));
                constructDefaultUser(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    function constructDefaultUser(user) {

        var autoMenu        = document.getElementById('autocomplete-menu'),
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
            repoLabel       = document.createElement('label'),
            followersLabel  = document.createElement('label'),
            followingLabel  = document.createElement('label'),            
            userName        = document.createTextNode(`${user.name}`),
            info            = document.createTextNode(`${user.bio}`),
            repo            = document.createTextNode(`Repo: ${user.public_repos}`),
            following       = document.createTextNode(`Following: ${user.following}`),
            followers       = document.createTextNode(`Followers: ${user.followers}`);

        dataset.className           = 'data-set';
        userMenu.className          = 'user';
        profileDetails.className    = 'profile-details',
        profileCard.className       = 'profile-card';
        profileStatus.className     = 'profile-status';
        name.className              = 'user-name';
        mail.className              = 'mail';
        bio.className               = 'bio';
        repo.className              = 'repo';
        following.className         = 'following';
        followers.className         = 'followers';
        repoLabel.className         = 'label label-default';
        followersLabel.className    = 'label label-default';
        followingLabel.className    = 'label label-default';

        img.setAttribute('src', user.avatar_url);
        img.style.width = '50px';
        img.style.position = 'relative';
        img.style.right = '200px';
        img.style.margin = '20px 0px 0px 0px';

        bio.style.padding = '10px';
        
        dataset.style.margin = '0px';
        dataset.style.padding = '0px 400px';
        // dataset.style.border = '1px solid grey';

        repoLabel.style.marginRight = '10px';
        followersLabel.style.marginRight = '10px';
        followingLabel.style.marginRight = '10px';        

        profileDetails.style.position = 'relative';
        profileDetails.style.margin = '-55px 0px 0px 0px';

        profileStatus.style.padding = '20px 0px 0px 0px';

        profileDetails.appendChild(userName);
        profileDetails.appendChild(info);

        repoLabel.appendChild(repo);
        followingLabel.appendChild(following);
        followersLabel.appendChild(followers);

        profileStatus.appendChild(repoLabel);
        profileStatus.appendChild(followingLabel);
        profileStatus.appendChild(followersLabel);        

        profileCard.appendChild(img);
        profileCard.appendChild(profileDetails);
        profileCard.appendChild(profileStatus);

        userMenu.appendChild(profileCard);
        dataset.appendChild(userMenu);
        autoMenu.appendChild(dataset);
        // hideLoading();
    }

    function removeDefaultUsers() {
        
        var autoMenu = document.getElementById('autocomplete-menu');
        
        while (autoMenu.firstChild) {
            autoMenu.removeChild(autoMenu.firstChild);
        }
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
