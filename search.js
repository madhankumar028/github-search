/**
* Author MadhankumarJ<madhankumar028@gmail.com>
*
* Github-search Tribute to Github
* Inspired by typeahead.js and developed
*/
(function() {

    'use strict';

    var input               = document.getElementById('search'),
        autoMenu            = document.getElementById('autocomplete-menu'),
        loader              = document.getElementsByClassName('loader'),
        doneTypingInterval  = 3000;  //time in ms, 3 seconds for example    

    const defaultUsers  = ['getify', 'vasanthk', 'toddmotto', 'deedy'],        
          client_id     = 'b7641fc061fbc7eba0ae',          
          client_secret = '582f452b977885775b36fd81d8bfe51a5d48e59d',
          apikey        = `client_id="${client_id}&client_secret="${client_secret}"`,
          baseUrl       = 'https://api.github.com/users';
    
    /* EventListener for input element (onfocus event) */
    input.addEventListener('focus', onfocusHandler);
    
    /* EventListener for input element (focusout event) */
    input.addEventListener('focusout', function() {
        autoMenu.style.visibility = 'hidden';
    });
    
    /* EventListener for input element (keyup event) */
    input.addEventListener('keyup', keyupHandler);
    
    /**
     * Handler for keyup event
     * 
     * @public
     * @param  {Event} event
     *
     */
    function keyupHandler(event) {
        
        var typingTimer = null;       
        
        autoMenu.style.visibility = 'hidden';

        if (event.which === 46) {
            autoMenu.style.visibility = 'visible';            
            return;            
        }
        
        /* showing the default users, when there is no keypress */
        if (input.value.length == 0) {
            autoMenu.style.visibility = 'visible';        
            return;            
        }

        /* minimum length of github username is 4 */
        if (input.value.length > 4) {
            
            clearTimeout(typingTimer);
            
            typingTimer = setTimeout(function() {
                
                while(autoMenu.firstChild) {
                    autoMenu.removeChild(autoMenu.firstChild);                        
                }
                
                input.style.background = "url('loader.gif') no-repeat right center";
                
                keyupService(input.value);
            }, doneTypingInterval);
        }
    }

    /**
     * Service for keyupHandler
     * 
     * @private
     * @param  {String} username
     * 
     */
    function keyupService(userName) {
        
        var xhr   = new XMLHttpRequest(),
            url   = `${baseUrl}/${userName}?${apikey}`;        

        xhr.onreadystatechange = function() {            
            if (xhr.readyState == XMLHttpRequest.DONE) {                
                var user = JSON.parse(xhr.responseText),
                    isUser = user.message || user;                    

                if (isUser !== 'Not Found')                   
                    constructUser(user, 'keyup');
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
        
        input.style.background = "url('loader.gif') no-repeat right center";
        
        defaultUsers.forEach(function(user) {
            /* restricting the construction of defaultuser after we got them */              
            if (autoMenu.childNodes.length < 3) {
                onfocusService(user);                
            } else {
                autoMenu.style.visibility = 'visible';
                input.style.backgroundImage = 'none';
            }
        });
    }

    /**
     *
     * Service for onfocus event
     * @private
     * @param  {String} username
     * 
     */
    function onfocusService(userName) {
        
        var xhr   = new XMLHttpRequest(),
            url   = `${baseUrl}/${userName}?${apikey}`;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var user = JSON.parse(xhr.responseText),
                    isUser = user.message || user;                

                if (isUser !== 'Not Found')                        
                    constructUser(user, 'onfocus');                
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    /**
     *
     * onfocus event user constructor
     * 
     * @pirvate
     * @param  {Object} user
     * @return {[type]}
     */
    function constructUser(user, eventName) {
        
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
        
        img.className = 'img-circle';
        
        if (user.bio == null) {
            info = document.createTextNode(`${user.login} has not descried anything about him.`);
        } else {
            info = document.createTextNode(`${user.bio}`);            
        }

        if (user.name == null) {
            userName = document.createTextNode(`${user.login}`);  
        } else {
            userName = document.createTextNode(`${user.name}`);            
        }
        
        img.setAttribute('src', user.avatar_url);

        autoMenu.style.boxSizing = 'border-box';
                
        img.style.width = '50px';
        img.style.position = 'relative';
        img.style.right = '200px';
        img.style.margin = '20px 0px 0px 0px';
        
        dataset.style.margin    = '0px';
        dataset.style.padding   = '0px 400px';

        userMenu.style.marginRight = '50px';

        name.style.fontWeight = 'bold';
        name.style.fontSize = '14px';

        bio.style.fontSize = '16px'

        repoSpan.style.marginRight  = '10px';
        repoSpan.style.color        = '#8899a6';
        repoSpan.style.fontWeight   = '500';        

        followingSpan.style.marginRight = '10px';
        followingSpan.style.color       = '#8899a6';        
        followingSpan.style.fontWeight  = '500';

        followersSpan.style.fontWeight   = '10px';        
        followersSpan.style.color        = '#8899a6';        
        followersSpan.style.fontWeight   = '500';

        profileCard.style.paddingLeft = '50px';
        profileCard.style.boxSizing = 'border-box';

        profileDetails.style.position = 'relative';
        profileDetails.style.margin = '-55px 0px 0px 0px';

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

        input.style.backgroundImage = 'none';

        autoMenu.style.visibility = 'visible';                
    }
}());
