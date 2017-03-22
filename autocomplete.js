(function() {

    'use strict';

    var input        = document.getElementById('search'),
        autoMenu     = document.getElementById('autocomplete-menu'),
        loader       = document.getElementById('loader'),
        defaultUsers = ['madhankumar028', 'arunkumar47', 'amkrish'];
    
    const baseUrl = 'https://api.github.com/users';
    
    /* EventListener for input element (onfocus event) */
    input.addEventListener('focus', onfocusHandler);
    
    /* EventListener for input element (focusout event) */
    input.addEventListener('focusout', function() {
        autoMenu.style.visibility = 'hidden';
    });
    
    /* EventListener for input element (keyup event) */
    input.addEventListener('keyup', keyupHandler);

    autoMenu.style.visibility = 'visible';
    
    /* loader.style.visibility = 'hidden'; */
    
    /**
     *
     * @public
     * @param  {Event} event
     *
     */
    function keyupHandler(event) {
        
        autoMenu.style.visibility = 'hidden';        
        
        /* showing the default users, when there is no keypress */
        if (input.value.length == 0)
            autoMenu.style.visibility = 'visible';        

        /* minimum length of github username is 4 */
        if (input.value.length > 4)
            keyupWorker(input.value);
    }

    /**
     *
     * @private
     * @param  {String} username
     * 
     */
    function keyupWorker(userName) {

        var xhr = new XMLHttpRequest(),
            url = `${baseUrl}/${userName}`;

        xhr.onreadystatechange = function() {            
            if (xhr.readyState == XMLHttpRequest.DONE) {
                // keyupConstructUser(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    /**
     *
     * Handler for onfocus event
     * @public
     * 
     */
    function onfocusHandler() {

        defaultUsers.forEach(function(user) {
            onfocusWorker(user);                                
        });
    }

    /**
     *
     * @private
     * @param  {String} username
     * 
     */
    function onfocusWorker(userName) {

        var xhr = new XMLHttpRequest(),
            url = `${baseUrl}/${userName}`;

        loader.style.visibility = 'visible';        

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {

                /* restricting the construction of defaultuser after we got them */
                if (autoMenu.childNodes.length < 3) {
                    onfocusConstructUser(JSON.parse(xhr.responseText));
                } else {
                    autoMenu.style.visibility = 'visible';                                                                
                }
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    /**
     *
     * Construction of default user in DOM
     * 
     * @pirvate
     * @param  {Object} user
     * @return {[type]}
     */
    function onfocusConstructUser(user) {

        var dataset         = document.createElement('div'),
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
            repoSpan        = document.createElement('span'),
            followersSpan   = document.createElement('span'),
            followingSpan   = document.createElement('span'),        
            repo            = document.createTextNode(`Repo: ${user.public_repos}`),
            following       = document.createTextNode(`Following: ${user.following}`),
            followers       = document.createTextNode(`Followers: ${user.followers}`),
            info, userName;

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

        if (user.bio == null) {
            info = document.createTextNode(`User has not descried anything about him.`);
        } else {
            info = document.createTextNode(`${user.bio}`);            
        }

        if (user.name == null) {
            userName = document.createTextNode(`${user.login}`);  
        } else {
            userName = document.createTextNode(`${user.name}`);            
        }
    
        img.setAttribute('src', user.avatar_url);
        
        img.style.width = '50px';
        img.style.position = 'relative';
        img.style.right = '200px';
        img.style.margin = '20px 0px 0px 0px';

        bio.style.padding = '10px';
        
        dataset.style.margin    = '0px';
        dataset.style.padding   = '0px 400px';

        repoSpan.style.marginRight  = '10px';
        repoSpan.style.color        = '#8899a6';
        repoSpan.style.fontWeight   = '500';        

        followingSpan.style.marginRight = '10px';
        followingSpan.style.color       = '#8899a6';        
        followingSpan.style.fontWeight  = '500';

        followersSpan.style.fontWeight   = '10px';        
        followersSpan.style.color        = '#8899a6';        
        followersSpan.style.fontWeight   = '500';            

        profileDetails.style.position = 'relative';
        profileDetails.style.margin = '-55px 0px 0px 0px';

        profileStatus.style.padding = '20px 0px 0px 0px';

        name.appendChild(userName);
        bio.appendChild(info);

        profileDetails.appendChild(name);
        profileDetails.appendChild(bio);

        repoSpan.appendChild(repo);
        followingSpan.appendChild(following);
        followersSpan.appendChild(followers);

        profileStatus.appendChild(repoSpan);
        profileStatus.appendChild(followingSpan);
        profileStatus.appendChild(followersSpan);        

        profileCard.appendChild(img);
        profileCard.appendChild(profileDetails);
        profileCard.appendChild(profileStatus);

        userMenu.appendChild(profileCard);
        dataset.appendChild(userMenu);
        autoMenu.appendChild(dataset);
        
        loader.style.visibility = 'hidden';        
    }    

    /*
    function keyupConstructUser(user) {

        var menu = document.getElementById('menu'),
            p = document.createElement('LI');
        
        if (user.login !== undefined) {     
            var text = document.createTextNode(user.login),
                para = menu.appendChild(text);
        } else {
            var text = document.createTextNode('user not found'),
                para = menu.appendChild(text);        
        }
    }*/
}());
