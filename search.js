/**
* Author MadhankumarJ<madhankumar028@gmail.com>
*
* Github-search Tribute to Github
* Inspired by typeahead.js and developed
*/
(function() {

    'use strict';

    var input               = document.getElementById('search'),
        autoMenu            = document.getElementById('search-results'),
        loader              = document.getElementsByClassName('loader'),
        doneTypingInterval  = 3000,  //time in ms, 3seconds for example
        userList            = [];

    const defaultUsers  = ['getify', 'vasanthk', 'toddmotto', 'deedy'],
          client_id     = 'b7641fc061fbc7eba0ae',
          client_secret = '582f452b977885775b36fd81d8bfe51a5d48e59d',
          apikey        = `client_id="${client_id}&client_secret="${client_secret}"`,
          baseUrl       = 'https://api.github.com/users',
          githubUrl     = 'https://github.com';

    // Service worker registration
    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', () => {
    //         navigator.serviceWorker
    //             .register('/sw.js')
    //             .then( (reg) => {
    //                 console.log('Service worker is registered');
    //             }, (err) => {
    //                 console.log('Service worker is not registered');
    //             });
    //     });
    // }

    /**
     * Handler for keyup event
     *
     * @public
     *
     * @param  {Event} event
     *
     */
    function keyupHandler(event) {

        var typingTimer = null;

        autoMenu.style.visibility = 'hidden';

        validateKeyupEvent(event);        
        // minimum length of github username is 3
        if (input.value.length >= 3) {
            clearTimeout(typingTimer);

            typingTimer = setTimeout(() => {
                while(autoMenu.firstChild) {
                    autoMenu.removeChild(autoMenu.firstChild);
                }
                input.style.background = "url('assets/loader.gif') no-repeat right center";

                if (event.which === 13) {
                    window.open(`${githubUrl}/${input.value}`);
                }

                if (!autoMenu.firstChild) {
                    getUser(input.value);
                }
            }, doneTypingInterval);
        }
    }

    function validateKeyupEvent(event) {
        if (event.which === 46) {
            autoMenu.style.visibility = 'visible';
            return;
        }
        // showing the default users, when there is no keypresponses
        if (input.value.length === 0) {
            autoMenu.style.visibility = 'visible';
            return;
        }
    }

    /**
     *
     * Handler for onfocus event
     *
     * @public
     *
     */
    function onfocusHandler() {

        if (input.value.length) {
            autoMenu.style.visibility = 'visible';
            return;
        }

        // Removes the first child, if it goes more than 4 default users
        if (autoMenu.childNodes.length) {
            autoMenu.removeChild(autoMenu.firstChild);
        }

        input.style.background = "url('assets/loader.gif') no-repeat right center";

        defaultUsers.forEach(user => {
            // construction of default_user info
            if (autoMenu.childNodes.length < 3) {
                getUser(user);
            } else {
                autoMenu.style.visibility = 'visible';
                input.style.backgroundImage = 'none';
            }
        });
    }

    function getUser(userName) {
        let url   = `${baseUrl}/${userName}?${apikey}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            userList.push(data);
            userCard(data);                    
        })        
    }

    function userCard(user) {
        var userMarkup = `
            <div class="profile-card">
                <img class="img-circle" src=${user.avatar_url}>
                <div class=" details">
                    <h3 class="name">${user.name}</h3>
                    ${user.bio 
                        ? `<p class="bio">${user.bio}</p>`
                        : `<p class="bio">${user.name} has not described anything about him</p>`
                    }
                </div>
                <div class="details">
                    <span class="extra-info">Repo:${user.public_repos}</span>
                    <span class="extra-info">Following:${user.following}</span>
                    <span class="extra-info">Followers:${user.followers}</span>
                </div>
            </div>                
        `;
                
        autoMenu.innerHTML = userMarkup;
        
        input.style.backgroundImage = 'none';

        autoMenu.style.visibility = 'visible';
    }

    function init() {
        // EventListener for input element (onfocus event)
        input.addEventListener('focus', onfocusHandler);

        // EventListener for input element (focusout event)
        input.addEventListener('focusout', () => {
            autoMenu.style.visibility = 'hidden';
            input.style.backgroundImage = 'none';
        });

        // EventListener for input element (keyup event)
        input.addEventListener('keyup', keyupHandler);
    }

    init();
}());
