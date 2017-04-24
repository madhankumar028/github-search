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
        doneTypingInterval  = 3000,  //time in ms, 3seconds for example    
        memoize             = {users: []};

    const defaultUsers  = ['getify', 'vasanthk', 'toddmotto', 'deedy'],        
          client_id     = 'b7641fc061fbc7eba0ae',          
          client_secret = '582f452b977885775b36fd81d8bfe51a5d48e59d',
          apikey        = `client_id="${client_id}&client_secret="${client_secret}"`,
          baseUrl       = 'https://api.github.com/users';
    
    /** EventListener for input element (onfocus event) */
    input.addEventListener('focus', onfocusHandler);
    
    /** EventListener for input element (focusout event) */
    input.addEventListener('focusout', function() {
        autoMenu.style.visibility = 'hidden';
        input.style.backgroundImage = 'none';        
    });
    
    /** EventListener for input element (keyup event) */
    input.addEventListener('keyup', keyupHandler);    

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

        if (event.which === 46) {
            autoMenu.style.visibility = 'visible';            
            return;            
        }        
        
        /** showing the default users, when there is no keypress */
        if (input.value.length == 0) {
            autoMenu.style.visibility = 'visible';        
            return;           
        }

        /** minimum length of github username is 3 */
        if (input.value.length >= 3) {
            
            clearTimeout(typingTimer);
            
            typingTimer = setTimeout(function() {                                
                while(autoMenu.firstChild) {
                    autoMenu.removeChild(autoMenu.firstChild);                        
                }                
                input.style.background = "url('assets/loader.gif') no-repeat right center";
                
                if (event.which === 13) {
                    window.open(`https://github.com/${input.value}`);
                }

                if (!autoMenu.firstChild) {
                    keyupService(input.value);
                }
            }, doneTypingInterval);
        }
    }

    /**
     * Service for keyupHandler
     * 
     * @private
     * 
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
                    constructUser(user);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
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
        
        /** Removes the first child, if it goes more than 4 default users */
        if (autoMenu.childNodes.length > 4) {
            autoMenu.removeChild(autoMenu.firstChild);
        }       

        input.style.background = "url('assets/loader.gif') no-repeat right center";
        
        defaultUsers.forEach(function(user) {
            /** restricting the construction of defaultuser after we got them */              
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
     * 
     * @private
     * 
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

                if (isUser !== 'Not Found') {
                    memoize.users.push(user);
                }

                if (memoize.users.length) {
                    constructUser(memoize);
                }
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    /**
     *
     * Construction of user in DOM
     * 
     * @pirvate
     * 
     * @param  {Object} memoize
     */
    function constructUser(memoize) {
        
        var template,
            templateScript;

        template = document.getElementById('template').innerHTML;
        
        templateScript = Handlebars.compile(template);
        
        autoMenu.innerHTML = templateScript(memoize);

        input.style.backgroundImage = 'none';

        autoMenu.style.visibility = 'visible';                
    }
}());
